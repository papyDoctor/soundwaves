//! The scene as the engine receives it: a JSON of primitives, already in SI
//! units, with materials and media resolved to indices by the web app. The
//! parser of the `.sw` text lives in JavaScript (the editor needs the syntax
//! tree anyway); this is its typed mirror, re-validated by serde.

use serde::Deserialize;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Mode {
    /// x, y in the plane; walls extruded out of the screen.
    Planar,
    /// A horizontal axis of revolution: x along the axis, y is the radius.
    Axisym,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Medium {
    pub name: String,
    /// Speed of sound, m/s.
    pub c: f64,
    /// Density, kg/m^3.
    pub rho: f64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum MaterialKind {
    Rigid,
    Absorb,
    Impedance,
    Open,
    /// A mirror line: the natural (Neumann) condition, like a rigid wall,
    /// but drawn as such and mirrored by the viewport.
    Symmetry,
    /// A moving wall: every segment of this material pushes the fluid with
    /// the material's signal as inward normal velocity (m/s).
    Piston,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Material {
    pub name: String,
    pub kind: MaterialKind,
    /// Normalized specific impedance Z/(rho c). Only meaningful for Absorb,
    /// Impedance (user value) and Open (1). The web app computes it from
    /// alpha for Absorb.
    #[serde(default = "one")]
    pub zeta: f64,
    /// The velocity signal of a Piston material.
    #[serde(default)]
    pub signal: Option<Signal>,
    /// Which faces of an interior piston (a baffle) move. Irrelevant on an
    /// outer wall, which has one face.
    #[serde(default)]
    pub sides: PistonSides,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum PistonSides {
    /// Both faces push into their fluid: a breathing membrane (monopole).
    #[default]
    Both,
    /// A rigid plate: the left face pushes while the right face pulls (dipole).
    Plate,
    /// Only the face on the left of the drawing direction moves; the other is rigid.
    Left,
    /// Only the face on the right of the drawing direction moves.
    Right,
}

fn one() -> f64 {
    1.0
}

/// A wall. The web app expands rectangles into closed polylines and circles
/// into full arcs, so the engine knows two shapes.
#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "kind", rename_all = "lowercase")]
pub enum Element {
    Polyline {
        id: String,
        pts: Vec<[f64; 2]>,
        #[serde(default)]
        closed: bool,
        /// One material index per segment (pts.len() - 1, or pts.len() if closed).
        materials: Vec<usize>,
    },
    Arc {
        id: String,
        cx: f64,
        cy: f64,
        r: f64,
        /// Start and end angles in degrees, counter-clockwise from +x.
        a0: f64,
        a1: f64,
        material: usize,
    },
}

impl Element {
    pub fn id(&self) -> &str {
        match self {
            Element::Polyline { id, .. } | Element::Arc { id, .. } => id,
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct Region {
    pub id: String,
    /// A point inside the region: the flood fill starts there.
    pub seed: [f64; 2],
    pub medium: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Deserialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum Signal {
    /// A Gaussian pulse of width sigma = 1/(pi f0), centred at t0 (default 4 sigma).
    Gauss { f0: f64, amp: f64, t0: Option<f64> },
    /// A Ricker wavelet (second derivative of a Gaussian), peak frequency f0.
    Ricker { f0: f64, amp: f64, t0: Option<f64> },
    /// A sine of `cycles` periods under a Hann window.
    Burst { f0: f64, amp: f64, cycles: f64, t0: Option<f64> },
    /// A continuous sine with a two-period cosine ramp-in.
    Sine { f0: f64, amp: f64, t0: Option<f64> },
}

/// A monopole at a point: the signal is the volume injection rate.
/// `radius` spreads it over nearby nodes (default 0: one node).
#[derive(Debug, Clone, Deserialize)]
pub struct Source {
    pub id: String,
    pub x: f64,
    pub y: f64,
    pub signal: Signal,
    #[serde(default)]
    pub radius: f64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Probe {
    pub id: String,
    pub x: f64,
    pub y: f64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SimParams {
    /// Highest frequency to resolve, Hz. Sets the mesh size with nodes_per_wavelength.
    pub fmax: f64,
    #[serde(default = "default_npl")]
    pub nodes_per_wavelength: f64,
    /// Explicit mesh size, m; overrides fmax when set.
    #[serde(default)]
    pub h: Option<f64>,
    /// Simulated duration, s.
    pub duration: f64,
    #[serde(default = "default_cfl")]
    pub cfl: f64,
    /// Minimum triangle angle asked of the refinement, degrees.
    #[serde(default = "default_angle")]
    pub angle: f64,
    /// Budget of vertices the refinement may add.
    #[serde(default = "default_max_nodes")]
    pub max_nodes: usize,
}

fn default_npl() -> f64 {
    10.0
}
fn default_cfl() -> f64 {
    0.9
}
fn default_angle() -> f64 {
    28.0
}
fn default_max_nodes() -> usize {
    500_000
}

#[derive(Debug, Clone, Deserialize)]
pub struct Scene {
    pub mode: Mode,
    pub media: Vec<Medium>,
    pub materials: Vec<Material>,
    pub elements: Vec<Element>,
    pub regions: Vec<Region>,
    #[serde(default)]
    pub sources: Vec<Source>,
    #[serde(default)]
    pub probes: Vec<Probe>,
    pub sim: SimParams,
}

impl Scene {
    pub fn from_json(json: &str) -> Result<Scene, String> {
        let scene: Scene = serde_json::from_str(json).map_err(|e| format!("scene JSON: {e}"))?;
        scene.validate()?;
        Ok(scene)
    }

    /// The checks serde cannot do: indices in range, positive physics.
    pub fn validate(&self) -> Result<(), String> {
        if self.media.is_empty() {
            return Err("the scene needs at least one medium".into());
        }
        for m in &self.media {
            if !(m.c > 0.0) || !(m.rho > 0.0) {
                return Err(format!("medium '{}': c and rho must be positive", m.name));
            }
        }
        for m in &self.materials {
            if !matches!(m.kind, MaterialKind::Rigid | MaterialKind::Symmetry | MaterialKind::Piston) && !(m.zeta > 0.0) {
                return Err(format!("material '{}': zeta must be positive", m.name));
            }
            if m.kind == MaterialKind::Piston {
                match m.signal {
                    None => return Err(format!("material '{}': a piston needs a signal", m.name)),
                    Some(sig) if !(sig.f0() > 0.0) => return Err(format!("material '{}': f0 must be positive", m.name)),
                    _ => {}
                }
            }
        }
        for e in &self.elements {
            match e {
                Element::Polyline { id, pts, closed, materials } => {
                    if pts.len() < 2 {
                        return Err(format!("wall '{id}': a polyline needs two points at least"));
                    }
                    let nseg = if *closed { pts.len() } else { pts.len() - 1 };
                    if materials.len() != nseg {
                        return Err(format!("wall '{id}': {} materials for {nseg} segments", materials.len()));
                    }
                    if let Some(bad) = materials.iter().find(|&&m| m >= self.materials.len()) {
                        return Err(format!("wall '{id}': material index {bad} out of range"));
                    }
                }
                Element::Arc { id, r, material, .. } => {
                    if !(*r > 0.0) {
                        return Err(format!("wall '{id}': radius must be positive"));
                    }
                    if *material >= self.materials.len() {
                        return Err(format!("wall '{id}': material index {material} out of range"));
                    }
                }
            }
        }
        if self.regions.is_empty() {
            return Err("the scene needs a region: `region air at=x y medium=air`".into());
        }
        for r in &self.regions {
            if r.medium >= self.media.len() {
                return Err(format!("region '{}': medium index {} out of range", r.id, r.medium));
            }
        }
        for s in &self.sources {
            if !(s.signal.f0() > 0.0) {
                return Err(format!("source '{}': f0 must be positive", s.id));
            }
        }
        let p = &self.sim;
        if !(p.fmax > 0.0) || !(p.nodes_per_wavelength >= 2.0) || !(p.duration > 0.0) || !(p.cfl > 0.0 && p.cfl <= 1.0) {
            return Err("sim: fmax > 0, nodes_per_wavelength >= 2, duration > 0, 0 < cfl <= 1".into());
        }
        if !(p.angle >= 0.0 && p.angle <= 33.0) {
            return Err("sim: angle must be between 0 and 33 degrees".into());
        }
        Ok(())
    }

    pub fn c_min(&self) -> f64 {
        self.media.iter().map(|m| m.c).fold(f64::INFINITY, f64::min)
    }

    /// The target element size: an explicit h, or c_min / (fmax * nodes per wavelength).
    pub fn mesh_size(&self) -> f64 {
        self.sim.h.filter(|h| *h > 0.0).unwrap_or(self.c_min() / (self.sim.fmax * self.sim.nodes_per_wavelength))
    }
}

/// What the mesh depends on, as a canonical string: everything in the JSON
/// except what only the assembly reads (signals, impedances, density,
/// duration, cfl). Two scenes with the same signature share a mesh.
pub fn geometry_signature(json: &str) -> Result<String, String> {
    use serde_json::Value;
    let mut v: Value = serde_json::from_str(json).map_err(|e| format!("scene JSON: {e}"))?;
    let strip = |arr: Option<&mut Value>, keys: &[&str]| {
        if let Some(Value::Array(items)) = arr {
            for it in items.iter_mut() {
                if let Value::Object(o) = it {
                    for k in keys {
                        o.remove(*k);
                    }
                }
            }
        }
    };
    strip(v.get_mut("materials"), &["kind", "zeta", "signal", "sides"]);
    strip(v.get_mut("media"), &["rho"]);
    strip(v.get_mut("sources"), &["signal"]);
    if let Some(Value::Object(sim)) = v.get_mut("sim") {
        sim.remove("duration");
        sim.remove("cfl");
    }
    // serde_json's map is ordered by key: the string is canonical.
    Ok(v.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn signature_ignores_physics_only_fields() {
        let a = r#"{"mode":"planar","media":[{"name":"air","c":343,"rho":1.2}],"materials":[{"name":"m","kind":"rigid","zeta":1}],
                    "elements":[],"regions":[],"sources":[{"kind":"point","id":"s","x":1,"y":2,"signal":{"type":"gauss","f0":500,"amp":1}}],
                    "sim":{"fmax":1000,"duration":0.1,"cfl":0.9}}"#;
        let b = a.replace("\"f0\":500", "\"f0\":900").replace("\"rigid\"", "\"absorb\"").replace("\"duration\":0.1", "\"duration\":0.3");
        assert_eq!(geometry_signature(a).unwrap(), geometry_signature(&b).unwrap());
        let c = a.replace("\"x\":1", "\"x\":1.5");
        assert_ne!(geometry_signature(a).unwrap(), geometry_signature(&c).unwrap());
        let d = a.replace("\"fmax\":1000", "\"fmax\":2000");
        assert_ne!(geometry_signature(a).unwrap(), geometry_signature(&d).unwrap());
    }
}
