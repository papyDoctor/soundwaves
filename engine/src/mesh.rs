//! The mesher: constraint segments to a P1 triangle mesh of the regions the
//! user seeded. spade does the constrained Delaunay triangulation and the
//! refinement; we do what the physics needs around it — which faces are air,
//! which edges are walls and of what material, which edge lies on the axis,
//! where the sources and probes landed.

use crate::geometry::{self, Segment};
use crate::scene::{MaterialKind, Mode, Scene};
use spade::{
    handles::FixedVertexHandle, AngleLimit, ConstrainedDelaunayTriangulation, Point2, PositionInTriangulation,
    RefinementParameters, Triangulation,
};
use std::collections::HashMap;

/// What a boundary edge is, for the physics and for the drawing.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[repr(u16)]
pub enum EdgeKind {
    Rigid = 0,
    /// An impedance (absorbing) wall: a Robin term with the material's zeta.
    Robin = 1,
    /// Open to the outside: Robin with zeta = 1.
    Open = 2,
    /// On the axis of revolution: nothing to do, the integrand vanishes.
    Axis = 3,
    /// A moving wall: a Neumann load from the piston material's signal.
    Piston = 4,
    /// A mirror line: nothing to do (natural condition), drawn as a mirror.
    Symmetry = 5,
}

#[derive(Debug, Clone, Copy)]
pub struct BoundaryEdge {
    /// Node indices, in the counter-clockwise order of the triangle `tri`.
    pub nodes: [u32; 2],
    /// The triangle the edge belongs to (for its medium).
    pub tri: u32,
    pub kind: EdgeKind,
    /// Material index in the scene (meaningless for Axis).
    pub material: u16,
    /// Element index in the scene.
    pub element: u32,
    /// For a thin-wall edge: +1 if its triangle lies on the left of the
    /// wall's drawing direction, -1 on the right. 0 on the outer boundary.
    pub side: i8,
}

#[derive(Debug, Clone, Default)]
pub struct MeshStats {
    pub nodes: usize,
    pub triangles: usize,
    pub boundary_edges: usize,
    pub h: f64,
    pub h_min: f64,
    pub min_angle_deg: f64,
    pub refinement_complete: bool,
    pub warnings: Vec<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mesh {
    pub xy: Vec<[f64; 2]>,
    pub tri: Vec<[u32; 3]>,
    /// Region index per triangle.
    pub tri_region: Vec<u16>,
    pub edges: Vec<BoundaryEdge>,
    /// Node of each point source (same order as the scene's sources).
    pub source_nodes: Vec<u32>,
    /// Node of each probe.
    pub probe_nodes: Vec<u32>,
    pub stats: MeshStats,
}

/// Points equal to within `tol` collapse onto one key.
fn key(p: [f64; 2], tol: f64) -> (i64, i64) {
    ((p[0] / tol).round() as i64, (p[1] / tol).round() as i64)
}

pub fn build(scene: &Scene) -> Result<Mesh, String> {
    let h = scene.mesh_size();
    let mut segs = geometry::segments(scene, h);
    if segs.is_empty() {
        return Err("no wall at all: draw a closed shape and seed a region inside".into());
    }
    let bb = geometry::bbox(scene, &segs);
    let diag = ((bb[2] - bb[0]).powi(2) + (bb[3] - bb[1]).powi(2)).sqrt();
    if !(diag > 0.0) {
        return Err("the scene has no extent".into());
    }
    let tol = 1e-7 * diag;
    geometry::weld(&mut segs, tol);
    geometry::check_axis(scene, &segs, tol)?;

    for s in &segs {
        if s.length() < tol {
            return Err(format!("wall '{}' has a zero-length segment", scene.elements[s.element as usize].id()));
        }
    }

    // --- The constrained Delaunay triangulation.
    let mut cdt: ConstrainedDelaunayTriangulation<Point2<f64>> = ConstrainedDelaunayTriangulation::new();
    let mut vertices: HashMap<(i64, i64), FixedVertexHandle> = HashMap::new();
    let mut vertex_of = |cdt: &mut ConstrainedDelaunayTriangulation<Point2<f64>>, p: [f64; 2]| -> Result<FixedVertexHandle, String> {
        if let Some(v) = vertices.get(&key(p, tol)) {
            return Ok(*v);
        }
        let v = cdt.insert(Point2::new(p[0], p[1])).map_err(|e| format!("cannot insert point ({}, {}): {e:?}", p[0], p[1]))?;
        vertices.insert(key(p, tol), v);
        Ok(v)
    };

    // Sources and probes become vertices first, so that constraints passing
    // exactly through them are split there instead of leaving them off-mesh.
    let mut source_vertices = Vec::with_capacity(scene.sources.len());
    for s in &scene.sources {
        source_vertices.push(vertex_of(&mut cdt, [s.x, s.y])?);
    }
    let mut probe_vertices = Vec::with_capacity(scene.probes.len());
    for p in &scene.probes {
        probe_vertices.push(vertex_of(&mut cdt, [p.x, p.y])?);
    }
    for s in &segs {
        let a = vertex_of(&mut cdt, s.a)?;
        let b = vertex_of(&mut cdt, s.b)?;
        if a != b {
            // Crossing constraints are split at their intersection.
            cdt.add_constraint_and_split(a, b, |p| p);
        }
    }
    drop(vertex_of);

    // --- Refinement to the target size and angle.
    //
    // spade can skip the faces outside the constraint loops, but it tells
    // inside from outside by winding parity, and an open chain (a thin wall,
    // a piston line closing a loop) flips the parity of everything beyond it,
    // leaving half the domain unrefined. So the outside is skipped only when
    // every wall is a closed shape by itself; otherwise the whole convex hull
    // is refined and the unused part is discarded afterwards.
    let all_closed = scene.elements.iter().all(|e| match e {
        crate::scene::Element::Polyline { closed, .. } => *closed,
        crate::scene::Element::Arc { a0, a1, .. } => (a1 - a0).abs() >= 360.0 - 1e-9,
    });
    let max_area = h * h * 3f64.sqrt() / 4.0;
    let params = RefinementParameters::<f64>::new()
        .exclude_outer_faces(all_closed)
        .with_angle_limit(AngleLimit::from_deg(scene.sim.angle))
        .with_max_allowed_area(max_area)
        .with_max_additional_vertices(scene.sim.max_nodes);
    let result = cdt.refine(params);
    let mut warnings = Vec::new();
    if !result.refinement_complete {
        warnings.push(format!(
            "refinement stopped at the vertex budget ({}): the mesh is coarser than asked, or a sliver (two walls almost touching) could not be fixed; check the geometry, lower fmax, or raise sim max_nodes",
            scene.sim.max_nodes
        ));
    }

    // --- Which faces belong to which region: flood fill from each seed,
    // never crossing a constraint edge.
    let nfaces = cdt.num_all_faces();
    let mut face_region: Vec<u16> = vec![u16::MAX; nfaces];
    for (ri, region) in scene.regions.iter().enumerate() {
        let seed = Point2::new(region.seed[0], region.seed[1]);
        let start = match cdt.locate(seed) {
            PositionInTriangulation::OnFace(f) => f,
            PositionInTriangulation::OnEdge(e) => {
                let e = cdt.directed_edge(e);
                match e.face().as_inner().or_else(|| e.rev().face().as_inner()) {
                    Some(f) => f.fix(),
                    None => return Err(format!("region '{}': its seed point is outside every wall", region.id)),
                }
            }
            PositionInTriangulation::OnVertex(v) => {
                // Refinement may have put a vertex exactly there: any inner face around it will do.
                match cdt.vertex(v).out_edges().find_map(|e| e.face().as_inner()) {
                    Some(f) => f.fix(),
                    None => return Err(format!("region '{}': its seed point is outside every wall", region.id)),
                }
            }
            _ => return Err(format!("region '{}': its seed point is outside every wall", region.id)),
        };
        if face_region[start.index()] != u16::MAX {
            return Err(format!(
                "regions '{}' and '{}' share the same area: one seed per enclosed area",
                scene.regions[face_region[start.index()] as usize].id, region.id
            ));
        }
        let mut stack = vec![start];
        face_region[start.index()] = ri as u16;
        while let Some(f) = stack.pop() {
            let face = cdt.face(f);
            for e in face.adjacent_edges() {
                if e.is_constraint_edge() {
                    continue;
                }
                let g = e.rev().face();
                match g.as_inner() {
                    None => {
                        let [p, q] = e.positions();
                        return Err(format!(
                            "region '{}' leaks outside: the walls are not closed near ({:.4}, {:.4})",
                            region.id,
                            (p.x + q.x) / 2.0,
                            (p.y + q.y) / 2.0
                        ));
                    }
                    Some(g) => {
                        let gi = g.fix().index();
                        if face_region[gi] == u16::MAX {
                            face_region[gi] = ri as u16;
                            stack.push(g.fix());
                        }
                    }
                }
            }
        }
    }

    // --- Extraction: kept faces, compact node numbering, CCW triangles.
    let mut node_of: Vec<u32> = vec![u32::MAX; cdt.num_vertices()];
    let mut xy: Vec<[f64; 2]> = Vec::new();
    let mut tri: Vec<[u32; 3]> = Vec::new();
    let mut tri_region: Vec<u16> = Vec::new();
    let mut face_tri: Vec<u32> = vec![u32::MAX; nfaces];
    // Compact numbering: a vertex gets its node index the first time a kept face uses it.
    fn renumber(node_of: &mut [u32], xy: &mut Vec<[f64; 2]>, index: usize, p: Point2<f64>) -> u32 {
        if node_of[index] == u32::MAX {
            node_of[index] = xy.len() as u32;
            xy.push([p.x, p.y]);
        }
        node_of[index]
    }
    for face in cdt.inner_faces() {
        let fi = face.fix().index();
        let r = face_region[fi];
        if r == u16::MAX {
            continue;
        }
        let vs = face.vertices();
        let mut t = [0u32; 3];
        for i in 0..3 {
            t[i] = renumber(&mut node_of, &mut xy, vs[i].fix().index(), vs[i].position());
        }
        let [a, b, c] = [xy[t[0] as usize], xy[t[1] as usize], xy[t[2] as usize]];
        let area2 = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
        if area2 < 0.0 {
            t.swap(1, 2);
        }
        face_tri[fi] = tri.len() as u32;
        tri.push(t);
        tri_region.push(r);
    }
    if tri.is_empty() {
        return Err("the mesh is empty: no region seed landed inside closed walls".into());
    }

    // --- Boundary edges: a kept face next to a face that is not kept (or the outside).
    let mut edges = Vec::new();
    // Constraint edges with kept faces on both sides: thin walls (baffles)
    // inside a region. They get their nodes split below.
    let mut cracks: Vec<(u32, u32, u32)> = Vec::new();
    let axisym = scene.mode == Mode::Axisym;
    for face in cdt.inner_faces() {
        let fi = face.fix().index();
        if face_region[fi] == u16::MAX {
            continue;
        }
        for e in face.adjacent_edges() {
            let outside = match e.rev().face().as_inner() {
                None => true,
                Some(g) => face_region[g.fix().index()] == u16::MAX,
            };
            if !outside {
                if e.is_constraint_edge() {
                    cracks.push((node_of[e.from().fix().index()], node_of[e.to().fix().index()], face_tri[fi]));
                }
                continue;
            }
            let na = node_of[e.from().fix().index()];
            let nb = node_of[e.to().fix().index()];
            let (pa, pb) = (xy[na as usize], xy[nb as usize]);
            let mid = [(pa[0] + pb[0]) / 2.0, (pa[1] + pb[1]) / 2.0];
            // On the axis: both ends at y = 0.
            if axisym && pa[1].abs() <= tol && pb[1].abs() <= tol {
                edges.push(BoundaryEdge { nodes: [na, nb], tri: face_tri[fi], kind: EdgeKind::Axis, material: 0, element: u32::MAX, side: 0 });
                continue;
            }
            // Which wall segment is this? The closest one to the midpoint; when
            // two walls coincide (a piston drawn over a closed outline), the piston wins.
            let (si, d2) = closest_segment(&segs, mid, scene);
            if d2.sqrt() > 1e-4 * diag + tol {
                return Err(format!(
                    "internal mesher error: a boundary edge near ({:.4}, {:.4}) matches no wall",
                    mid[0], mid[1]
                ));
            }
            let s = segs[si];
            let kind = edge_kind(scene.materials[s.material as usize].kind);
            edges.push(BoundaryEdge { nodes: [na, nb], tri: face_tri[fi], kind, material: s.material, element: s.element, side: 0 });
        }
    }
    let split_nodes = split_baffles(scene, &segs, &mut xy, &mut tri, &mut edges, cracks, tol, diag)?;
    if axisym {
        // A piston edge lying on the axis has a zero radius, hence a zero
        // area: it moves nothing. Not an error, just a wall that does nothing.
        let mut idle: Vec<String> = Vec::new();
        for e in edges.iter_mut() {
            if e.kind == EdgeKind::Piston {
                let (pa, pb) = (xy[e.nodes[0] as usize], xy[e.nodes[1] as usize]);
                if pa[1].abs() <= tol && pb[1].abs() <= tol {
                    e.kind = EdgeKind::Axis;
                    let id = scene.elements[e.element as usize].id().to_string();
                    if !idle.contains(&id) {
                        idle.push(id);
                    }
                }
            }
        }
        for id in idle {
            warnings.push(format!("wall '{id}': its part on the axis of revolution has no area and moves nothing"));
        }
    }

    // --- Sources and probes: their nodes, which must be in the kept mesh.
    let mut source_nodes = Vec::with_capacity(scene.sources.len());
    for (i, v) in source_vertices.iter().enumerate() {
        let n = node_of[v.index()];
        if n == u32::MAX {
            return Err(format!("source '{}' is outside the simulated regions", scene.sources[i].id));
        }
        source_nodes.push(n);
    }
    let mut probe_nodes = Vec::with_capacity(scene.probes.len());
    for (i, v) in probe_vertices.iter().enumerate() {
        let n = node_of[v.index()];
        if n == u32::MAX {
            return Err(format!("probe '{}' is outside the simulated regions", scene.probes[i].id));
        }
        probe_nodes.push(n);
    }

    // --- Quality.
    let mut h_min = f64::INFINITY;
    let mut min_angle = f64::INFINITY;
    for t in &tri {
        let p = [xy[t[0] as usize], xy[t[1] as usize], xy[t[2] as usize]];
        let area2 = (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) - (p[2][0] - p[0][0]) * (p[1][1] - p[0][1]);
        if area2 <= 1e-14 * diag * diag {
            return Err(format!(
                "degenerate triangle near ({:.4}, {:.4}): two walls or points almost coincide",
                p[0][0], p[0][1]
            ));
        }
        for i in 0..3 {
            let (a, b, c) = (p[i], p[(i + 1) % 3], p[(i + 2) % 3]);
            let (ux, uy) = (b[0] - a[0], b[1] - a[1]);
            let (vx, vy) = (c[0] - a[0], c[1] - a[1]);
            let lu = (ux * ux + uy * uy).sqrt();
            let lv = (vx * vx + vy * vy).sqrt();
            h_min = h_min.min(lu);
            let cosang = ((ux * vx + uy * vy) / (lu * lv)).clamp(-1.0, 1.0);
            min_angle = min_angle.min(cosang.acos().to_degrees());
        }
    }

    if split_nodes > 0 {
        warnings.push(format!("{split_nodes} nodes split along thin walls"));
    }
    let stats = MeshStats {
        nodes: xy.len(),
        triangles: tri.len(),
        boundary_edges: edges.len(),
        h,
        h_min,
        min_angle_deg: min_angle,
        refinement_complete: result.refinement_complete,
        warnings,
    };
    Ok(Mesh { xy, tri, tri_region, edges, source_nodes, probe_nodes, stats })
}

/// Thin walls inside a region: a constraint edge with kept triangles on both
/// sides lets the pressure through as if it were not there. Each node along
/// such an edge is duplicated, one copy per fan of triangles separated by
/// crack edges (or by the outside), and both sides become boundary edges with
/// the wall's material. Nodes at the free tip of a baffle are not split.
/// Returns the number of nodes added.
#[allow(clippy::too_many_arguments)]
fn split_baffles(
    scene: &Scene,
    segs: &[Segment],
    xy: &mut Vec<[f64; 2]>,
    tri: &mut Vec<[u32; 3]>,
    edges: &mut Vec<BoundaryEdge>,
    cracks: Vec<(u32, u32, u32)>,
    tol: f64,
    diag: f64,
) -> Result<usize, String> {
    if cracks.is_empty() {
        return Ok(0);
    }
    let key = |a: u32, b: u32| if a < b { (a, b) } else { (b, a) };
    // Each crack edge, with the two triangles that share it.
    let mut crack_tris: HashMap<(u32, u32), Vec<u32>> = HashMap::new();
    for (a, b, t) in &cracks {
        crack_tris.entry(key(*a, *b)).or_default().push(*t);
    }
    let mut crack_nodes: Vec<u32> = crack_tris.keys().flat_map(|k| [k.0, k.1]).collect();
    crack_nodes.sort_unstable();
    crack_nodes.dedup();
    let is_crack_node: std::collections::HashSet<u32> = crack_nodes.iter().copied().collect();
    // Triangles around each crack node.
    let mut incident: HashMap<u32, Vec<u32>> = HashMap::new();
    for (t, nodes) in tri.iter().enumerate() {
        for &n in nodes {
            if is_crack_node.contains(&n) {
                incident.entry(n).or_default().push(t as u32);
            }
        }
    }
    let original = tri.clone();
    let mut added = 0;
    for &v in &crack_nodes {
        let mut fan = incident[&v].clone();
        let p = xy[v as usize];
        let angle = |t: u32| {
            let [a, b, c] = original[t as usize].map(|i| xy[i as usize]);
            let (cx, cy) = ((a[0] + b[0] + c[0]) / 3.0 - p[0], (a[1] + b[1] + c[1]) / 3.0 - p[1]);
            cy.atan2(cx)
        };
        fan.sort_by(|&s, &t| angle(s).partial_cmp(&angle(t)).unwrap());
        let n = fan.len();
        // A cut between consecutive triangles: no shared edge (the outside), or a crack edge.
        let others = |t: u32| -> Vec<u32> { original[t as usize].iter().copied().filter(|&i| i != v).collect() };
        let mut cut = vec![false; n];
        for i in 0..n {
            let (s, t) = (fan[i], fan[(i + 1) % n]);
            let shared = others(s).into_iter().find(|w| others(t).contains(w));
            cut[i] = match shared {
                None => true,
                Some(w) => crack_tris.contains_key(&key(v, w)),
            };
        }
        let cuts = cut.iter().filter(|&&c| c).count();
        if cuts < 2 {
            continue; // a free tip inside the region, or no crack at all here
        }
        // Groups start after each cut; the first group keeps the node.
        let start = cut.iter().position(|&c| c).unwrap() + 1;
        let mut group = 0usize;
        let mut node_for_group: Vec<u32> = vec![v];
        for k in 0..n {
            let i = (start + k) % n;
            let t = fan[i] as usize;
            if group > 0 {
                let nn = node_for_group[group];
                for slot in tri[t].iter_mut() {
                    if *slot == v {
                        *slot = nn;
                    }
                }
            }
            if cut[i] && k + 1 < n {
                group += 1;
                node_for_group.push(xy.len() as u32);
                xy.push(p);
                added += 1;
            }
        }
    }
    // Both sides of every crack edge are now boundary edges.
    for (k, tris) in &crack_tris {
        let mid = [(xy[k.0 as usize][0] + xy[k.1 as usize][0]) / 2.0, (xy[k.0 as usize][1] + xy[k.1 as usize][1]) / 2.0];
        let (si, d2) = closest_segment(segs, mid, scene);
        if d2.sqrt() > 1e-4 * diag + tol {
            return Err(format!("internal mesher error: a thin wall near ({:.4}, {:.4}) matches no wall", mid[0], mid[1]));
        }
        let s = segs[si];
        let kind = edge_kind(scene.materials[s.material as usize].kind);
        for &t in tris {
            let o = original[t as usize];
            let ia = o.iter().position(|&i| i == k.0).unwrap();
            let ib = o.iter().position(|&i| i == k.1).unwrap();
            // In the triangle's counter-clockwise order: the triangle is on the
            // left of this directed edge. Compare with the wall's own direction.
            let (ia, ib) = if (ia + 1) % 3 == ib { (ia, ib) } else { (ib, ia) };
            let (pa, pb) = (xy[o[ia] as usize], xy[o[ib] as usize]);
            let along = (pb[0] - pa[0]) * (s.b[0] - s.a[0]) + (pb[1] - pa[1]) * (s.b[1] - s.a[1]);
            let side: i8 = if along >= 0.0 { 1 } else { -1 };
            edges.push(BoundaryEdge { nodes: [tri[t as usize][ia], tri[t as usize][ib]], tri: t, kind, material: s.material, element: s.element, side });
        }
    }
    Ok(added)
}

/// The boundary condition a material kind gives its edges.
fn edge_kind(kind: MaterialKind) -> EdgeKind {
    match kind {
        MaterialKind::Rigid => EdgeKind::Rigid,
        MaterialKind::Absorb | MaterialKind::Impedance => EdgeKind::Robin,
        MaterialKind::Open => EdgeKind::Open,
        MaterialKind::Symmetry => EdgeKind::Symmetry,
        MaterialKind::Piston => EdgeKind::Piston,
    }
}

fn closest_segment(segs: &[Segment], p: [f64; 2], scene: &Scene) -> (usize, f64) {
    let is_piston = |s: &Segment| scene.materials[s.material as usize].kind == MaterialKind::Piston;
    let mut best = (0, f64::INFINITY);
    for (i, s) in segs.iter().enumerate() {
        let d = s.distance_2(p);
        let tie = best.1.is_finite() && (d - best.1).abs() <= 1e-24 + 1e-12 * best.1;
        if d < best.1 && !tie || (tie && is_piston(s) && !is_piston(&segs[best.0])) {
            best = (i, d);
        }
    }
    best
}

impl Mesh {
    /// Recompute the kind of every boundary edge from the scene's materials:
    /// a material changed from rigid to absorbing or to piston does not need
    /// a new mesh.
    pub fn retag(&mut self, scene: &Scene) {
        for e in self.edges.iter_mut() {
            if e.kind == EdgeKind::Axis {
                continue;
            }
            e.kind = scene.materials.get(e.material as usize).map_or(EdgeKind::Rigid, |m| edge_kind(m.kind));
        }
    }

    pub fn stats_json(&self) -> String {
        let s = &self.stats;
        let warnings: Vec<String> = s.warnings.iter().map(|w| serde_json::to_string(w).unwrap()).collect();
        format!(
            "{{\"nodes\":{},\"triangles\":{},\"boundaryEdges\":{},\"h\":{},\"hMin\":{},\"minAngle\":{},\"refinementComplete\":{},\"warnings\":[{}]}}",
            s.nodes, s.triangles, s.boundary_edges, s.h, s.h_min, s.min_angle_deg, s.refinement_complete, warnings.join(",")
        )
    }

    /// Signed area of triangle t (positive: counter-clockwise).
    pub fn area(&self, t: usize) -> f64 {
        let [a, b, c] = self.tri[t].map(|i| self.xy[i as usize]);
        0.5 * ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]))
    }

    pub fn total_area(&self) -> f64 {
        (0..self.tri.len()).map(|t| self.area(t)).sum()
    }
}
