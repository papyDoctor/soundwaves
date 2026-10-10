//! Scenes for the physics tests, built as the web app would send them.

#![allow(dead_code)]

use engine::assembly::{self, System};
use engine::mesh::{self, Mesh};
use engine::scene::Scene;
use engine::time::Stepper;

/// A rigid rectangular room [0,lx] x [0,ly] in air, meshed for `fmax`.
pub fn room_json(lx: f64, ly: f64, fmax: f64, extra: &str, mode: &str) -> String {
    format!(
        r#"{{
  "mode": "{mode}",
  "media": [{{"name":"air","c":343.0,"rho":1.2}}],
  "materials": [{{"name":"rigid","kind":"rigid"}}, {{"name":"open","kind":"open","zeta":1.0}}, {{"name":"soft","kind":"impedance","zeta":3.0}}],
  "elements": [{{"kind":"polyline","id":"room","closed":true,"pts":[[0,0],[{lx},0],[{lx},{ly}],[0,{ly}]],"materials":[0,0,0,0]}}],
  "regions": [{{"id":"air","seed":[{sx},{sy}],"medium":0}}],
  "sim": {{"fmax":{fmax},"nodes_per_wavelength":10,"duration":0.5,"cfl":0.9,"angle":28}}
  {extra}
}}"#,
        sx = lx / 2.0,
        sy = ly / 2.0
    )
}

pub fn build(json: &str) -> (Scene, Mesh, System) {
    let scene = Scene::from_json(json).expect("scene");
    let mesh = mesh::build(&scene).expect("mesh");
    let system = assembly::assemble(&scene, &mesh).expect("assemble");
    (scene, mesh, system)
}

pub fn stepper(scene: &Scene, system: &System) -> Stepper {
    let (dt, _) = Stepper::stable_dt(system, scene.sim.cfl);
    Stepper::new(system, dt, scene.sim.duration)
}

/// |X(f)| of a real signal sampled at dt, by direct summation.
pub fn dft_magnitude(x: &[f64], dt: f64, f: f64) -> f64 {
    let w = 2.0 * std::f64::consts::PI * f * dt;
    let (mut re, mut im) = (0.0, 0.0);
    for (n, v) in x.iter().enumerate() {
        let a = w * n as f64;
        re += v * a.cos();
        im -= v * a.sin();
    }
    (re * re + im * im).sqrt()
}

/// The frequency of the largest |X(f)| on a grid.
pub fn peak_frequency(x: &[f64], dt: f64, f_lo: f64, f_hi: f64, df: f64) -> f64 {
    let mut best = (f_lo, 0.0);
    let mut f = f_lo;
    while f <= f_hi {
        let m = dft_magnitude(x, dt, f);
        if m > best.1 {
            best = (f, m);
        }
        f += df;
    }
    best.0
}
