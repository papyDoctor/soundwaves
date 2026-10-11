//! P1 finite elements for (1/(rho c^2)) p_tt - div((1/rho) grad p) = s.
//!
//! Planar and axisymmetric share the code: the axisymmetric integrands carry
//! a factor r = y, which is linear on a triangle, so every integral stays
//! exact without quadrature. The common 2*pi is dropped everywhere (K, M, C,
//! loads), so it cancels.
//!
//! Mass and damping are lumped (diagonal): that is what makes the leapfrog
//! fully explicit. The consistent versions can be added on the same pattern
//! when the Helmholtz solver comes.

use crate::csr::Pattern;
use crate::mesh::{EdgeKind, Mesh};
use crate::scene::{MaterialKind, Mode, PistonSides, Scene, Signal};

#[derive(Debug, Clone)]
pub enum Load {
    /// f_i(t) = w_i * q(t): a monopole spread over a few nodes (weights sum to 1).
    Point { weights: Vec<(u32, f64)>, signal: Signal },
    /// f_i(t) = w_i * du/dt: a wall moving inward with velocity u(t).
    Piston { weights: Vec<(u32, f64)>, signal: Signal },
}

#[derive(Debug, Clone)]
pub struct System {
    pub pattern: Pattern,
    /// Stiffness on `pattern`.
    pub k: Vec<f64>,
    /// Lumped mass.
    pub m: Vec<f64>,
    /// Lumped boundary damping (Robin / open edges).
    pub c: Vec<f64>,
    pub loads: Vec<Load>,
    /// Porous screens: twin nodes (i, j) across a thin wall, coupled by a
    /// damping g = (edge weight) / R: the pressure drop across the screen
    /// is R times the velocity through it.
    pub couplings: Vec<(u32, u32, f64)>,
    /// Largest sound speed, for the geometric time-step estimate.
    pub c_max: f64,
}

pub fn assemble(scene: &Scene, mesh: &Mesh) -> Result<System, String> {
    let n = mesh.xy.len();
    let pattern = Pattern::from_triangles(n, &mesh.tri);
    let mut k = vec![0.0; pattern.nnz()];
    let mut m = vec![0.0; n];
    let mut c = vec![0.0; n];
    let axisym = scene.mode == Mode::Axisym;

    for (t, tri) in mesh.tri.iter().enumerate() {
        let medium = &scene.media[scene.regions[mesh.tri_region[t] as usize].medium];
        let (rho, cs) = (medium.rho, medium.c);
        let p = tri.map(|i| mesh.xy[i as usize]);
        let area = mesh.area(t);
        // Gradients of the barycentric functions: grad phi_i = (b_i, c_i) / (2A).
        let b = [p[1][1] - p[2][1], p[2][1] - p[0][1], p[0][1] - p[1][1]];
        let cc = [p[2][0] - p[1][0], p[0][0] - p[2][0], p[1][0] - p[0][0]];
        let r_mean = (p[0][1] + p[1][1] + p[2][1]) / 3.0;
        let weight = if axisym { r_mean } else { 1.0 };
        for i in 0..3 {
            for j in 0..3 {
                let kij = weight * (b[i] * b[j] + cc[i] * cc[j]) / (4.0 * area * rho);
                k[pattern.index(tri[i], tri[j])] += kij;
            }
            let mi = if axisym {
                // Row sum of the consistent axisymmetric mass: (A/12)(r_i + 3 r_mean).
                area / 12.0 * (p[i][1] + 3.0 * r_mean)
            } else {
                area / 3.0
            };
            m[tri[i] as usize] += mi / (rho * cs * cs);
        }
    }

    // Boundary damping: (1/(zeta rho c)) * integral of phi_i phi_j over the edge, lumped.
    // A screen on a thin wall is handled below as a coupling; on an outer
    // wall it is an impedance 1 + R/(rho c): resistance in series with radiation.
    let twin_of = |n: u32| mesh.twins.iter().any(|t| t.a == n || t.b == n);
    for e in &mesh.edges {
        let zeta = match e.kind {
            EdgeKind::Robin => scene.materials[e.material as usize].zeta,
            EdgeKind::Open => 1.0,
            EdgeKind::Screen => {
                if twin_of(e.nodes[0]) || twin_of(e.nodes[1]) {
                    continue; // a thin-wall screen: coupled below
                }
                let medium = &scene.media[scene.regions[mesh.tri_region[e.tri as usize] as usize].medium];
                1.0 + scene.materials[e.material as usize].resistance / (medium.rho * medium.c)
            }
            _ => continue,
        };
        let medium = &scene.media[scene.regions[mesh.tri_region[e.tri as usize] as usize].medium];
        let (wa, wb) = edge_weights(mesh, e.nodes, axisym);
        let coef = 1.0 / (zeta * medium.rho * medium.c);
        c[e.nodes[0] as usize] += coef * wa;
        c[e.nodes[1] as usize] += coef * wb;
    }

    // Loads: the point sources, then one piston load per piston material.
    let mut loads = Vec::new();
    for (si, s) in scene.sources.iter().enumerate() {
        let node = mesh.source_nodes[si];
        let mut weights = Vec::new();
        let r0 = s.radius.max(if axisym && mesh.xy[node as usize][1].abs() < 1e-12 { mesh.stats.h } else { 0.0 });
        if r0 > 0.0 {
            let mut sum = 0.0;
            for (i, q) in mesh.xy.iter().enumerate() {
                let d2 = (q[0] - s.x).powi(2) + (q[1] - s.y).powi(2);
                if d2 <= 4.0 * r0 * r0 {
                    let w = (-d2 / (r0 * r0)).exp();
                    weights.push((i as u32, w));
                    sum += w;
                }
            }
            for w in weights.iter_mut() {
                w.1 /= sum;
            }
        } else {
            weights.push((node, 1.0));
        }
        loads.push(Load::Point { weights, signal: s.signal });
    }
    for (mi, m) in scene.materials.iter().enumerate() {
        if m.kind != MaterialKind::Piston {
            continue;
        }
        let signal = m.signal.ok_or_else(|| format!("material '{}': a piston needs a signal", m.name))?;
        let mut acc: std::collections::HashMap<u32, f64> = std::collections::HashMap::new();
        for e in mesh.edges.iter().filter(|e| e.kind == EdgeKind::Piston && e.material == mi as u16) {
            // Which faces move, and in which direction (a plate pulls on its back).
            let factor = match (m.sides, e.side) {
                (_, 0) | (PistonSides::Both, _) => 1.0,
                (PistonSides::Plate, s) => s as f64,
                (PistonSides::Left, 1) | (PistonSides::Right, -1) => 1.0,
                _ => continue,
            };
            let (wa, wb) = edge_weights(mesh, e.nodes, axisym);
            *acc.entry(e.nodes[0]).or_insert(0.0) += factor * wa;
            *acc.entry(e.nodes[1]).or_insert(0.0) += factor * wb;
        }
        if acc.is_empty() {
            continue; // a piston material no wall uses
        }
        let mut weights: Vec<(u32, f64)> = acc.into_iter().collect();
        weights.sort_by_key(|w| w.0);
        loads.push(Load::Piston { weights, signal });
    }

    // Screens inside the air: for every screen edge, its two faces' twin
    // nodes get g = w / R, with w the edge's weight at that node. The faces'
    // boundary term is -(1/R) d(delta p)/dt, a damping between twins.
    let mut couplings: Vec<(u32, u32, f64)> = Vec::new();
    let mut twin_map: std::collections::HashMap<u32, u32> = std::collections::HashMap::new();
    for t in &mesh.twins {
        twin_map.insert(t.a, t.b);
        twin_map.insert(t.b, t.a);
    }
    // Each physical screen edge appears once per face (side +1 and -1 of the
    // drawing direction): the left face alone counts it, both faces share the weight.
    for e in mesh.edges.iter().filter(|e| e.kind == EdgeKind::Screen && e.side == 1) {
        let (wa, wb) = edge_weights(mesh, e.nodes, axisym);
        let r = scene.materials[e.material as usize].resistance;
        for (node, w) in [(e.nodes[0], wa), (e.nodes[1], wb)] {
            if let Some(&other) = twin_map.get(&node) {
                couplings.push((node, other, w / r));
            }
        }
    }
    let c_max = scene.media.iter().map(|m| m.c).fold(0.0, f64::max);
    Ok(System { pattern, k, m, c, loads, couplings, c_max })
}

/// Integral of phi_a and phi_b over an edge: L/2 each in the plane; with the
/// radial weight, (L/6)(2 r_a + r_b) and (L/6)(r_a + 2 r_b).
fn edge_weights(mesh: &Mesh, nodes: [u32; 2], axisym: bool) -> (f64, f64) {
    let (a, b) = (mesh.xy[nodes[0] as usize], mesh.xy[nodes[1] as usize]);
    let len = ((b[0] - a[0]).powi(2) + (b[1] - a[1]).powi(2)).sqrt();
    if axisym {
        (len / 6.0 * (2.0 * a[1] + b[1]), len / 6.0 * (a[1] + 2.0 * b[1]))
    } else {
        (len / 2.0, len / 2.0)
    }
}

impl System {
    pub fn n(&self) -> usize {
        self.pattern.n
    }

    /// The load vector at time t, written into f (zeroed first).
    pub fn load_at(&self, t: f64, f: &mut [f64]) {
        f.fill(0.0);
        for l in &self.loads {
            match l {
                Load::Point { weights, signal } => {
                    let q = signal.value(t);
                    if q != 0.0 {
                        for &(i, w) in weights {
                            f[i as usize] += w * q;
                        }
                    }
                }
                Load::Piston { weights, signal } => {
                    let a = signal.derivative(t);
                    if a != 0.0 {
                        for &(i, w) in weights {
                            f[i as usize] += w * a;
                        }
                    }
                }
            }
        }
    }

    /// Largest eigenvalue of M^-1 K by power iteration: the stability limit
    /// of the leapfrog is dt < 2 / sqrt(lambda_max).
    pub fn lambda_max(&self, iterations: usize) -> f64 {
        let n = self.n();
        // A deterministic pseudo-random start, so results are reproducible.
        let mut x: Vec<f64> = (0..n).map(|i| ((i as f64 * 12.9898).sin() * 43758.5453).fract() - 0.5).collect();
        let mut y = vec![0.0; n];
        let mut lambda = 0.0;
        for _ in 0..iterations {
            let norm = x.iter().map(|v| v * v).sum::<f64>().sqrt();
            if norm == 0.0 {
                break;
            }
            for v in x.iter_mut() {
                *v /= norm;
            }
            self.pattern.spmv(&self.k, &x, &mut y);
            for i in 0..n {
                y[i] /= self.m[i];
            }
            lambda = x.iter().zip(&y).map(|(a, b)| a * b).sum::<f64>();
            std::mem::swap(&mut x, &mut y);
        }
        lambda
    }
}
