//! SoundWaves engine: the numerics behind the web app, compiled to WebAssembly.
//!
//! `Simulation` is the wasm-bindgen surface; the physics lives in the modules,
//! which are plain Rust and tested natively with `cargo test`. Big arrays are
//! exposed as pointers into wasm memory: the worker wraps them in typed-array
//! views and copies or transfers from there, never through JSON.

pub mod assembly;
pub mod csr;
pub mod geometry;
pub mod mesh;
pub mod scene;
pub mod sources;
pub mod time;

use wasm_bindgen::prelude::*;

/// The engine's version, for the Output panel to prove the wasm loaded.
#[wasm_bindgen]
pub fn version() -> String {
    format!("engine {}", env!("CARGO_PKG_VERSION"))
}

use std::cell::RefCell;

thread_local! {
    static LAST_PANIC: RefCell<String> = const { RefCell::new(String::new()) };
}

/// A panic in wasm surfaces in JavaScript as a bare "unreachable". The hook
/// keeps the message so the worker can report what actually happened.
#[wasm_bindgen(start)]
pub fn start() {
    std::panic::set_hook(Box::new(|info| {
        let msg = info.to_string();
        LAST_PANIC.with(|p| *p.borrow_mut() = msg.clone());
        web_sys_log(&msg);
    }));
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = error)]
    fn console_error(s: &str);
}

fn web_sys_log(msg: &str) {
    console_error(msg);
}

/// The message of the last panic, for the worker to attach to an "unreachable" error.
#[wasm_bindgen]
pub fn last_panic() -> String {
    LAST_PANIC.with(|p| p.borrow().clone())
}

#[wasm_bindgen]
pub struct Simulation {
    scene: scene::Scene,
    mesh: Option<mesh::Mesh>,
    system: Option<assembly::System>,
    stepper: Option<time::Stepper>,
    // Render copies, in the layout the viewport wants.
    coords: Vec<f32>,
    triangles: Vec<u32>,
    edges: Vec<u32>,
    edge_kinds: Vec<u16>,
    field: Vec<f32>,
    field_range: [f32; 2],
    // Probe samples, interleaved by step, drained by read_probes().
    probe_samples: Vec<f32>,
    // What the current mesh was built from (see scene::geometry_signature).
    signature: String,
}

fn js(e: String) -> JsError {
    JsError::new(&e)
}

#[wasm_bindgen]
impl Simulation {
    #[wasm_bindgen(constructor)]
    pub fn new(scene_json: &str) -> Result<Simulation, JsError> {
        let scene = scene::Scene::from_json(scene_json).map_err(js)?;
        let signature = scene::geometry_signature(scene_json).map_err(js)?;
        Ok(Simulation {
            scene,
            signature,
            mesh: None,
            system: None,
            stepper: None,
            coords: Vec::new(),
            triangles: Vec::new(),
            edges: Vec::new(),
            edge_kinds: Vec::new(),
            field: Vec::new(),
            field_range: [0.0, 0.0],
            probe_samples: Vec::new(),
        })
    }

    /// Replace the scene. The mesh is kept when nothing it depends on
    /// changed (a signal, a material's impedance, the duration): the edges
    /// are retagged and only the assembly is redone. Returns whether the
    /// mesh was kept.
    pub fn set_scene(&mut self, scene_json: &str) -> Result<bool, JsError> {
        let scene = scene::Scene::from_json(scene_json).map_err(js)?;
        let signature = scene::geometry_signature(scene_json).map_err(js)?;
        let keep = self.mesh.is_some() && signature == self.signature;
        self.scene = scene;
        self.signature = signature;
        self.system = None;
        self.stepper = None;
        self.probe_samples.clear();
        if keep {
            let m = self.mesh.as_mut().unwrap();
            m.retag(&self.scene);
            self.edge_kinds = m.edges.iter().map(|e| e.kind as u16).collect();
        } else {
            self.mesh = None;
            self.coords.clear();
            self.triangles.clear();
            self.edges.clear();
            self.edge_kinds.clear();
            self.field.clear();
        }
        Ok(keep)
    }

    /// Triangulate. Returns the statistics as JSON.
    pub fn mesh(&mut self) -> Result<String, JsError> {
        self.system = None;
        self.stepper = None;
        let m = mesh::build(&self.scene).map_err(js)?;
        self.coords = m.xy.iter().flat_map(|p| [p[0] as f32, p[1] as f32]).collect();
        self.triangles = m.tri.iter().flatten().copied().collect();
        self.edges = m.edges.iter().flat_map(|e| e.nodes).collect();
        self.edge_kinds = m.edges.iter().map(|e| e.kind as u16).collect();
        self.field = vec![0.0; m.xy.len()];
        self.field_range = [0.0, 0.0];
        let stats = m.stats_json();
        self.mesh = Some(m);
        Ok(stats)
    }

    /// Assemble the matrices, pick the time step, rewind to t = 0. JSON stats.
    pub fn prepare(&mut self) -> Result<String, JsError> {
        let mesh = self.mesh.as_ref().ok_or_else(|| js("mesh first".into()))?;
        let system = assembly::assemble(&self.scene, mesh).map_err(js)?;
        let (dt, lambda) = time::Stepper::stable_dt(&system, self.scene.sim.cfl);
        let dt_geo = mesh.stats.h_min / system.c_max;
        let steps = (self.scene.sim.duration / dt).ceil() as u64;
        let stepper = time::Stepper::new(&system, dt, self.scene.sim.duration);
        self.system = Some(system);
        self.stepper = Some(stepper);
        self.probe_samples.clear();
        Ok(format!(
            "{{\"dt\":{dt},\"dtGeometric\":{dt_geo},\"lambdaMax\":{lambda},\"steps\":{steps},\"nnz\":{}}}",
            self.system.as_ref().unwrap().pattern.nnz()
        ))
    }

    pub fn node_count(&self) -> u32 {
        self.mesh.as_ref().map_or(0, |m| m.xy.len() as u32)
    }
    pub fn triangle_count(&self) -> u32 {
        self.mesh.as_ref().map_or(0, |m| m.tri.len() as u32)
    }
    pub fn edge_count(&self) -> u32 {
        self.mesh.as_ref().map_or(0, |m| m.edges.len() as u32)
    }
    pub fn probe_count(&self) -> u32 {
        self.scene.probes.len() as u32
    }
    pub fn coords_ptr(&self) -> *const f32 {
        self.coords.as_ptr()
    }
    pub fn triangles_ptr(&self) -> *const u32 {
        self.triangles.as_ptr()
    }
    pub fn edges_ptr(&self) -> *const u32 {
        self.edges.as_ptr()
    }
    pub fn edge_kinds_ptr(&self) -> *const u16 {
        self.edge_kinds.as_ptr()
    }

    pub fn dt(&self) -> f64 {
        self.stepper.as_ref().map_or(0.0, |s| s.dt)
    }
    pub fn time(&self) -> f64 {
        self.stepper.as_ref().map_or(0.0, |s| s.time)
    }
    pub fn steps_done(&self) -> u32 {
        self.stepper.as_ref().map_or(0, |s| s.step as u32)
    }
    pub fn finished(&self) -> bool {
        self.stepper.as_ref().is_none_or(|s| s.finished())
    }

    /// Advance n steps; returns how many were done (0 at the end of the duration).
    pub fn step(&mut self, n: u32) -> Result<u32, JsError> {
        let (system, stepper, mesh) = match (&self.system, &mut self.stepper, &self.mesh) {
            (Some(s), Some(t), Some(m)) => (s, t, m),
            _ => return Err(js("prepare first".into())),
        };
        let mut done = 0;
        // Sample the probes after every step: one advance of 1 at a time.
        while done < n && !stepper.finished() {
            stepper.advance(system, 1).map_err(js)?;
            let p = stepper.pressure();
            for &node in &mesh.probe_nodes {
                self.probe_samples.push(p[node as usize] as f32);
            }
            done += 1;
        }
        Ok(done)
    }

    pub fn reset(&mut self) {
        if let Some(s) = &mut self.stepper {
            s.reset();
        }
        self.probe_samples.clear();
    }

    /// Convert the pressure to f32 for rendering and return its pointer (node_count values).
    pub fn field_ptr(&mut self) -> *const f32 {
        if let Some(s) = &self.stepper {
            let (mut lo, mut hi) = (f32::INFINITY, f32::NEG_INFINITY);
            for (dst, &v) in self.field.iter_mut().zip(s.pressure()) {
                let v = v as f32;
                *dst = v;
                lo = lo.min(v);
                hi = hi.max(v);
            }
            self.field_range = if lo <= hi { [lo, hi] } else { [0.0, 0.0] };
        }
        self.field.as_ptr()
    }

    pub fn field_range(&self) -> Vec<f32> {
        self.field_range.to_vec()
    }

    /// Drain the probe samples recorded since the last call: probe_count values per step.
    pub fn read_probes(&mut self) -> Vec<f32> {
        std::mem::take(&mut self.probe_samples)
    }

    pub fn energy(&mut self) -> f64 {
        match (&self.system, &mut self.stepper) {
            (Some(s), Some(t)) => t.energy(s),
            _ => 0.0,
        }
    }
}
