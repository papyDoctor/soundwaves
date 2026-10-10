//! Primitives to segments. The mesher wants straight constraint segments
//! tagged with their material and the wall they came from; arcs are
//! discretized here, with a chord close to the mesh size, because only the
//! mesher knows that size.

use crate::scene::{Element, Mode, Scene};

#[derive(Debug, Clone, Copy)]
pub struct Segment {
    pub a: [f64; 2],
    pub b: [f64; 2],
    pub material: u16,
    /// Index of the element in the scene.
    pub element: u32,
}

impl Segment {
    pub fn length(&self) -> f64 {
        ((self.b[0] - self.a[0]).powi(2) + (self.b[1] - self.a[1]).powi(2)).sqrt()
    }
    pub fn midpoint(&self) -> [f64; 2] {
        [(self.a[0] + self.b[0]) / 2.0, (self.a[1] + self.b[1]) / 2.0]
    }
    /// Squared distance from a point to the segment.
    pub fn distance_2(&self, p: [f64; 2]) -> f64 {
        let (dx, dy) = (self.b[0] - self.a[0], self.b[1] - self.a[1]);
        let l2 = dx * dx + dy * dy;
        let t = if l2 > 0.0 { (((p[0] - self.a[0]) * dx + (p[1] - self.a[1]) * dy) / l2).clamp(0.0, 1.0) } else { 0.0 };
        let (qx, qy) = (self.a[0] + t * dx, self.a[1] + t * dy);
        (p[0] - qx).powi(2) + (p[1] - qy).powi(2)
    }
}

/// sin and cos of an angle in degrees, exact at the quadrants: sin(180°)
/// must be 0, not 1e-16, or an arc ending on another wall misses it by a
/// hair and the mesher chokes on a sliver.
pub fn exact_sin_cos(deg: f64) -> (f64, f64) {
    let m = deg.rem_euclid(360.0);
    if m == 0.0 {
        (0.0, 1.0)
    } else if m == 90.0 {
        (1.0, 0.0)
    } else if m == 180.0 {
        (0.0, -1.0)
    } else if m == 270.0 {
        (-1.0, 0.0)
    } else {
        deg.to_radians().sin_cos()
    }
}

/// Number of chords for an arc of `span` radians and radius `r`, so that a
/// chord is about `h` long and never spans more than 15 degrees.
pub fn arc_chords(span: f64, r: f64, h: f64) -> usize {
    let by_length = (span.abs() * r / (0.9 * h)).ceil();
    let by_angle = (span.abs() / 15f64.to_radians()).ceil();
    (by_length.max(by_angle).max(1.0)) as usize
}

/// All constraint segments of the scene, in order of elements.
pub fn segments(scene: &Scene, h: f64) -> Vec<Segment> {
    let mut out = Vec::new();
    for (ei, e) in scene.elements.iter().enumerate() {
        match e {
            Element::Polyline { pts, closed, materials, .. } => {
                let n = pts.len();
                let nseg = if *closed { n } else { n - 1 };
                for i in 0..nseg {
                    out.push(Segment { a: pts[i], b: pts[(i + 1) % n], material: materials[i] as u16, element: ei as u32 });
                }
            }
            Element::Arc { cx, cy, r, a0, a1, material, .. } => {
                let full = (a1 - a0).abs() >= 360.0 - 1e-9;
                let (a0r, a1r) = if full { (0.0, std::f64::consts::TAU) } else { (a0.to_radians(), a1.to_radians()) };
                let span = a1r - a0r;
                let n = arc_chords(span, *r, h).max(if full { 8 } else { 1 });
                let pt = |k: usize| {
                    let deg = a0 + (a1 - a0) * (k as f64) / (n as f64);
                    let (s, c) = exact_sin_cos(if full { 360.0 * (k as f64) / (n as f64) } else { deg });
                    [cx + r * c, cy + r * s]
                };
                for k in 0..n {
                    let a = pt(k);
                    // The last chord of a full circle closes on the first point exactly.
                    let b = if full && k + 1 == n { pt(0) } else { pt(k + 1) };
                    out.push(Segment { a, b, material: *material as u16, element: ei as u32 });
                }
            }
        }
    }
    out
}

/// An endpoint within `tol` of another wall (not its own neighbours) is moved
/// onto that wall: a point meant to touch a wall but off by rounding would
/// otherwise leave a sliver the refinement cannot fix.
pub fn weld(segs: &mut [Segment], tol: f64) {
    let snapshot: Vec<Segment> = segs.to_vec();
    for i in 0..segs.len() {
        for end in 0..2 {
            let p = if end == 0 { segs[i].a } else { segs[i].b };
            let mut best: Option<([f64; 2], f64)> = None;
            for (j, s) in snapshot.iter().enumerate() {
                if j == i {
                    continue;
                }
                // Not a shared endpoint: those coincide already.
                let same = |q: [f64; 2]| (q[0] - p[0]).abs() <= tol && (q[1] - p[1]).abs() <= tol;
                if same(s.a) || same(s.b) {
                    continue;
                }
                let d2 = s.distance_2(p);
                if d2 <= tol * tol && best.is_none_or(|b| d2 < b.1) {
                    // Project onto the segment.
                    let (dx, dy) = (s.b[0] - s.a[0], s.b[1] - s.a[1]);
                    let l2 = dx * dx + dy * dy;
                    let t = (((p[0] - s.a[0]) * dx + (p[1] - s.a[1]) * dy) / l2).clamp(0.0, 1.0);
                    best = Some(([s.a[0] + t * dx, s.a[1] + t * dy], d2));
                }
            }
            if let Some((q, _)) = best {
                if end == 0 {
                    segs[i].a = q;
                } else {
                    segs[i].b = q;
                }
            }
        }
    }
}

/// Bounding box of all segments and points of interest: [xmin, ymin, xmax, ymax].
pub fn bbox(scene: &Scene, segs: &[Segment]) -> [f64; 4] {
    let mut b = [f64::INFINITY, f64::INFINITY, f64::NEG_INFINITY, f64::NEG_INFINITY];
    let mut add = |p: [f64; 2]| {
        b[0] = b[0].min(p[0]);
        b[1] = b[1].min(p[1]);
        b[2] = b[2].max(p[0]);
        b[3] = b[3].max(p[1]);
    };
    for s in segs {
        add(s.a);
        add(s.b);
    }
    for r in &scene.regions {
        add(r.seed);
    }
    b
}

/// In axisymmetric mode the axis is y = 0 and nothing may lie below it.
pub fn check_axis(scene: &Scene, segs: &[Segment], tol: f64) -> Result<(), String> {
    if scene.mode != Mode::Axisym {
        return Ok(());
    }
    for s in segs {
        if s.a[1] < -tol || s.b[1] < -tol {
            return Err(format!(
                "wall '{}' goes below the axis (y < 0): in axisym mode, y is the radius",
                scene.elements[s.element as usize].id()
            ));
        }
    }
    Ok(())
}
