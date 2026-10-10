//! Milestone 2 checks: the axisymmetric operator and the boundary conditions.
//! A plane wave in a tube driven by a piston, the reflection coefficient of
//! an impedance wall, the 1/r decay of a point source in free field.

mod common;

use common::*;
use engine::mesh::EdgeKind;
use engine::scene::Scene;

/// A straight tube of radius `a` and length `l` on a horizontal axis: a piston
/// at x = 0, the end at x = l with the material `end` (open or rigid).
fn tube_json(a: f64, l: f64, fmax: f64, end: usize, signal: &str) -> String {
    format!(
        r#"{{
  "mode": "axisym",
  "media": [{{"name":"air","c":343.0,"rho":1.2}}],
  "materials": [{{"name":"rigid","kind":"rigid"}}, {{"name":"open","kind":"open","zeta":1.0}}, {{"name":"soft","kind":"impedance","zeta":3.0}},
                {{"name":"drive","kind":"piston","signal":{signal}}}],
  "elements": [
    {{"kind":"polyline","id":"wall","closed":false,"pts":[[0,{a}],[{l},{a}],[{l},0],[0,0]],"materials":[0,{end},0]}},
    {{"kind":"polyline","id":"piston","closed":false,"pts":[[0,0],[0,{a}]],"materials":[3]}}
  ],
  "regions": [{{"id":"air","seed":[{sx},{sy}],"medium":0}}],
  "probes": [{{"id":"near","x":{x1},"y":{y}}}, {{"id":"far","x":{x2},"y":{y}}}],
  "sim": {{"fmax":{fmax},"nodes_per_wavelength":10,"duration":0.012,"cfl":0.9,"angle":28}}
}}"#,
        sx = l / 2.0,
        sy = a / 2.0,
        x1 = 0.25 * l,
        x2 = 0.75 * l,
        y = a * 0.4,
    )
}

/// Run to the end, returning the two probe signals.
fn run(json: &str) -> (Scene, f64, Vec<f64>, Vec<f64>) {
    let (scene, mesh, sys) = build(json);
    let mut st = stepper(&scene, &sys);
    let (n0, n1) = (mesh.probe_nodes[0] as usize, mesh.probe_nodes[1] as usize);
    let (mut a, mut b) = (Vec::new(), Vec::new());
    while !st.finished() {
        st.advance(&sys, 1).unwrap();
        a.push(st.pressure()[n0]);
        b.push(st.pressure()[n1]);
    }
    (scene, st.dt, a, b)
}

fn peak(x: &[f64]) -> f64 {
    x.iter().fold(0.0f64, |m, v| m.max(v.abs()))
}

/// Lag (in samples) maximizing the cross-correlation of a and b.
fn lag_of_max_correlation(a: &[f64], b: &[f64], max_lag: usize) -> usize {
    let mut best = (0, f64::NEG_INFINITY);
    for lag in 0..max_lag.min(a.len()) {
        let c: f64 = (0..a.len() - lag).map(|i| a[i] * b[i + lag]).sum();
        if c > best.1 {
            best = (lag, c);
        }
    }
    best.0
}

#[test]
fn axisym_mesh_tags_the_axis_and_the_piston() {
    let (scene, mesh, sys) = build(&tube_json(0.05, 1.0, 3000.0, 1, r#"{"type":"burst","f0":1500,"amp":0.01,"cycles":3}"#));
    let kinds = |k: EdgeKind| mesh.edges.iter().filter(|e| e.kind == k).count();
    assert!(kinds(EdgeKind::Axis) > 0, "no axis edge");
    assert!(kinds(EdgeKind::Piston) > 0, "no piston edge");
    assert!(kinds(EdgeKind::Open) > 0, "no open edge");
    // Axis edges lie on y = 0, nothing else does.
    for e in &mesh.edges {
        let on_axis = mesh.xy[e.nodes[0] as usize][1].abs() < 1e-9 && mesh.xy[e.nodes[1] as usize][1].abs() < 1e-9;
        assert_eq!(on_axis, e.kind == EdgeKind::Axis);
    }
    // Total mass = volume / (2 pi rho c^2) (the 2 pi is dropped in the operator).
    let volume_over_2pi = 0.5 * 0.05 * 0.05 * 1.0;
    let total: f64 = sys.m.iter().sum();
    let expected = volume_over_2pi / (1.2 * 343.0 * 343.0);
    assert!((total - expected).abs() < 1e-6 * expected, "mass {total} vs {expected}");
    assert!(sys.m.iter().all(|&m| m > 0.0), "a lumped mass is not positive");
    let _ = scene;
}

#[test]
fn plane_wave_in_a_tube_has_the_right_speed_and_amplitude() {
    // 1500 Hz is well below the first higher mode of a 5 cm tube (~2 kHz).
    let (_, dt, near, far) = run(&tube_json(0.05, 1.0, 3000.0, 1, r#"{"type":"burst","f0":1500,"amp":0.01,"cycles":3}"#));
    // Time of flight between the probes, 0.5 m apart.
    let lag = lag_of_max_correlation(&near, &far, (0.003 / dt) as usize);
    let c = 0.5 / (lag as f64 * dt);
    assert!((c - 343.0).abs() / 343.0 < 0.01, "c = {c} m/s from lag {lag}");
    // p = rho c u for a plane wave. The peak of a Hann-windowed 3-cycle burst
    // is below its nominal amplitude (the window centre falls on a zero of the sine).
    let sig = engine::scene::Signal::Burst { f0: 1500.0, amp: 0.01, cycles: 3.0, t0: None };
    let u_peak = (0..2000).map(|i| sig.value(i as f64 * 0.002 / 2000.0).abs()).fold(0.0, f64::max);
    let expected = 1.2 * 343.0 * u_peak;
    let p = peak(&near);
    assert!((p - expected).abs() / expected < 0.05, "peak {p} Pa, expected {expected}");
}

#[test]
fn open_end_reflects_little_and_rigid_end_reflects_all() {
    // A short pulse down the tube: the near probe sees it going out, then
    // whatever comes back from the end at x = 1 (0.75 m away -> 4.4 ms later).
    let sig = r#"{"type":"gauss","f0":2000,"amp":0.01}"#;
    for (end, expected_r) in [(1usize, 0.0), (0usize, 1.0), (2usize, 0.5)] {
        let (_, dt, near, _) = run(&tube_json(0.05, 1.0, 4000.0, end, sig));
        let split = (0.0035 / dt) as usize; // outgoing pulse passes x = 0.25 at ~0.73 ms, echo returns at ~5.1 ms
        let outgoing = peak(&near[..split]);
        let echo = peak(&near[split..(0.0075 / dt) as usize]);
        let r = echo / outgoing;
        assert!((r - expected_r).abs() < 0.04, "end material {end}: R = {r}, expected {expected_r}");
    }
}

#[test]
fn point_source_decays_as_one_over_r() {
    // A hemisphere of free field: the axis as one side, an open arc around.
    let json = r#"{
      "mode": "axisym",
      "media": [{"name":"air","c":343.0,"rho":1.2}],
      "materials": [{"name":"rigid","kind":"rigid"}, {"name":"open","kind":"open","zeta":1.0}],
      "elements": [
        {"kind":"polyline","id":"axis","closed":false,"pts":[[-1,0],[1,0]],"materials":[0]},
        {"kind":"arc","id":"sky","cx":0,"cy":0,"r":1,"a0":0,"a1":180,"material":1}
      ],
      "regions": [{"id":"air","seed":[0,0.5],"medium":0}],
      "sources": [{"id":"s","x":0,"y":0,"signal":{"type":"gauss","f0":1500,"amp":1},"radius":0}],
      "probes": [{"id":"a","x":0.25,"y":0.0}, {"id":"b","x":0.5,"y":0.0}],
      "sim": {"fmax":4000,"nodes_per_wavelength":10,"duration":0.004,"cfl":0.9,"angle":28}
    }"#;
    let (_, _, a, b) = run(json);
    let ratio = peak(&a) / peak(&b);
    assert!((ratio - 2.0).abs() < 0.12, "amplitude ratio {ratio}, expected 2 for 1/r");
}
