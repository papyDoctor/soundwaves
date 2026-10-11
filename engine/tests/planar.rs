//! Milestone 1 checks, planar: the assembled operator, the mesh quality, the
//! first axial mode of a rectangular room, energy conservation.

mod common;

use common::*;
use engine::mesh::EdgeKind;

const LX: f64 = 2.0;
const LY: f64 = 1.0;

#[test]
fn stiffness_is_symmetric_with_zero_row_sums() {
    let (_, _, sys) = build(&room_json(LX, LY, 1000.0, "", "planar"));
    let n = sys.n();
    let kmax = sys.k.iter().fold(0.0f64, |a, b| a.max(b.abs()));
    for i in 0..n {
        let (lo, hi) = (sys.pattern.indptr[i] as usize, sys.pattern.indptr[i + 1] as usize);
        let row_sum: f64 = sys.k[lo..hi].iter().sum();
        assert!(row_sum.abs() < 1e-10 * kmax, "row {i} sums to {row_sum}");
        for k in lo..hi {
            let j = sys.pattern.indices[k];
            let kji = sys.k[sys.pattern.index(j, i as u32)];
            assert!((sys.k[k] - kji).abs() < 1e-12 * kmax, "K not symmetric at ({i}, {j})");
        }
    }
    // All mass positive, total mass = area / (rho c^2).
    assert!(sys.m.iter().all(|&m| m > 0.0));
    let total: f64 = sys.m.iter().sum();
    let expected = LX * LY / (1.2 * 343.0 * 343.0);
    assert!((total - expected).abs() < 1e-9 * expected, "mass {total} vs {expected}");
    // Rigid walls: no damping anywhere.
    assert!(sys.c.iter().all(|&c| c == 0.0));
}

#[test]
fn mesh_quality_and_size() {
    let (scene, mesh, _) = build(&room_json(LX, LY, 1000.0, "", "planar"));
    let h = scene.mesh_size();
    assert!((h - 0.0343).abs() < 1e-6);
    assert!(mesh.stats.min_angle_deg >= 25.0, "min angle {}", mesh.stats.min_angle_deg);
    assert!(mesh.stats.refinement_complete);
    // Roughly one node per equilateral cell of side h (within a factor of two).
    let cells = LX * LY / (h * h * 3f64.sqrt() / 4.0) / 2.0;
    let ratio = mesh.xy.len() as f64 / cells;
    assert!(ratio > 0.5 && ratio < 2.5, "nodes {} vs estimate {cells}", mesh.xy.len());
    // The boundary is the whole perimeter, all rigid.
    let perimeter: f64 = mesh
        .edges
        .iter()
        .map(|e| {
            let (a, b) = (mesh.xy[e.nodes[0] as usize], mesh.xy[e.nodes[1] as usize]);
            ((b[0] - a[0]).powi(2) + (b[1] - a[1]).powi(2)).sqrt()
        })
        .sum();
    assert!((perimeter - 2.0 * (LX + LY)).abs() < 1e-9);
    assert!(mesh.edges.iter().all(|e| e.kind == EdgeKind::Rigid));
    assert!((mesh.total_area() - LX * LY).abs() < 1e-9);
}

#[test]
fn first_axial_mode_of_a_rectangular_room() {
    // A zero-mean pulse off-centre excites the (1,0) mode at c / (2 Lx) = 85.75 Hz.
    let extra = r#", "sources": [{"id":"s","x":0.3,"y":0.4,"signal":{"type":"ricker","f0":300,"amp":1}}],
                   "probes": [{"id":"p","x":1.7,"y":0.55}]"#;
    let (scene, mesh, sys) = build(&room_json(LX, LY, 800.0, extra, "planar"));
    let mut st = stepper(&scene, &sys);
    let node = mesh.probe_nodes[0] as usize;
    let mut signal = Vec::new();
    while !st.finished() {
        st.advance(&sys, 1).unwrap();
        signal.push(st.pressure()[node]);
    }
    let f = peak_frequency(&signal, st.dt, 60.0, 110.0, 0.05);
    let expected = 343.0 / (2.0 * LX);
    assert!((f - expected).abs() / expected < 0.01, "mode at {f} Hz, expected {expected}");
}

#[test]
fn energy_is_conserved_with_rigid_walls() {
    let extra = r#", "sources": [{"id":"s","x":0.3,"y":0.4,"signal":{"type":"ricker","f0":300,"amp":1}}]"#;
    let (scene, _, sys) = build(&room_json(LX, LY, 800.0, extra, "planar"));
    let mut st = stepper(&scene, &sys);
    // Let the source die out (t0 = 5 ms, width ~ 3 ms), then watch 100 ms.
    while st.time < 0.03 {
        st.advance(&sys, 1).unwrap();
    }
    let (mut lo, mut hi) = (f64::INFINITY, 0.0f64);
    let mut count = 0;
    while st.time < 0.13 {
        st.advance(&sys, 1).unwrap();
        count += 1;
        if count % 50 == 0 {
            let e = st.energy(&sys);
            lo = lo.min(e);
            hi = hi.max(e);
        }
    }
    assert!(hi > 0.0);
    let drift = (hi - lo) / hi;
    assert!(drift < 1e-6, "energy varies by {:.3}% over 100 ms", drift * 100.0);
}

#[test]
fn stable_dt_is_below_the_blow_up_limit() {
    let (scene, _, sys) = build(&room_json(LX, LY, 1000.0, "", "planar"));
    let (dt, lambda) = engine::time::Stepper::stable_dt(&sys, 1.0);
    assert!(lambda > 0.0);
    // Stepping at 1.3x the limit with a pulse must blow up; at the limit it must not.
    let extra = r#", "sources": [{"id":"s","x":0.3,"y":0.4,"signal":{"type":"gauss","f0":500,"amp":1}}]"#;
    let (scene2, _, sys2) = build(&room_json(LX, LY, 1000.0, extra, "planar"));
    let mut bad = engine::time::Stepper::new(&sys2, dt * 1.3, 0.2);
    let blew = (0..4000).any(|_| bad.advance(&sys2, 1).is_err());
    assert!(blew, "1.3x the stable step did not blow up");
    let mut good = engine::time::Stepper::new(&sys2, dt * 0.95, 0.2);
    for _ in 0..4000 {
        good.advance(&sys2, 1).expect("stable step blew up");
    }
    let _ = scene;
    let _ = scene2;
}

#[test]
fn a_thin_wall_separates_two_chambers_unless_it_has_a_gap() {
    // A rigid baffle across the room: sealed, nothing gets through. With a
    // gap at the top, the pulse leaks around the free tip.
    for (top, sealed) in [(LY, true), (0.7 * LY, false)] {
        let extra = format!(
            r#", "sources": [{{"id":"s","x":0.5,"y":0.5,"signal":{{"type":"ricker","f0":500,"amp":1}}}}],
               "probes": [{{"id":"left","x":0.5,"y":0.3}}, {{"id":"right","x":1.5,"y":0.5}}]"#
        );
        // Sealed: two enclosed areas, so two region seeds. With the gap, one area.
        let regions = if sealed {
            r#""regions": [{"id":"left","seed":[0.5,0.8],"medium":0}, {"id":"right","seed":[1.5,0.8],"medium":0}]"#.to_string()
        } else {
            r#""regions": [{"id":"air","seed":[0.5,0.8],"medium":0}]"#.to_string()
        };
        let json = room_json(LX, LY, 1500.0, &extra, "planar")
            .replace(
                r#""materials":[0,0,0,0]}"#,
                &format!(r#""materials":[0,0,0,0]}}, {{"kind":"polyline","id":"baffle","closed":false,"pts":[[1,0],[1,{top}]],"materials":[0]}}"#),
            )
            .replace(r#""regions": [{"id":"air","seed":[1,0.5],"medium":0}]"#, &regions);
        let (scene, mesh, sys) = build(&json);
        assert!(mesh.stats.warnings.iter().any(|w| w.contains("split")), "no node was split");
        // Mass is unchanged by the split; the baffle adds boundary edges on both sides.
        let total: f64 = sys.m.iter().sum();
        let expected = LX * LY / (1.2 * 343.0 * 343.0);
        assert!((total - expected).abs() < 1e-9 * expected);
        let baffle_edges = mesh.edges.iter().filter(|e| e.element == 1).count();
        assert!(baffle_edges >= 4 && baffle_edges % 2 == 0, "{baffle_edges} baffle edges");
        let mut st = stepper(&scene, &sys);
        st.duration = 0.012;
        let (nl, nr) = (mesh.probe_nodes[0] as usize, mesh.probe_nodes[1] as usize);
        let (mut left, mut right) = (0.0f64, 0.0f64);
        while !st.finished() {
            st.advance(&sys, 1).unwrap();
            left = left.max(st.pressure()[nl].abs());
            right = right.max(st.pressure()[nr].abs());
        }
        let ratio = right / left;
        if sealed {
            assert!(ratio < 1e-9, "sealed baffle leaks: ratio {ratio}");
        } else {
            assert!(ratio > 0.05, "open baffle blocks everything: ratio {ratio}");
        }
    }
}

#[test]
fn a_symmetry_line_halves_the_room() {
    // The full room with a source and its mirror image, against the half
    // room closed by a symmetry line: the same probe hears the same thing.
    let full = r#"{
      "mode": "planar",
      "media": [{"name":"air","c":343.0,"rho":1.2}],
      "materials": [{"name":"rigid","kind":"rigid"}],
      "elements": [{"kind":"polyline","id":"room","closed":true,"pts":[[0,0],[2,0],[2,1],[0,1]],"materials":[0,0,0,0]}],
      "regions": [{"id":"air","seed":[0.5,0.5],"medium":0}],
      "sources": [{"id":"s","x":0.7,"y":0.5,"signal":{"type":"ricker","f0":500,"amp":1}},
                  {"id":"m","x":1.3,"y":0.5,"signal":{"type":"ricker","f0":500,"amp":1}}],
      "probes": [{"id":"p","x":0.4,"y":0.3}],
      "sim": {"fmax":2000,"nodes_per_wavelength":10,"duration":0.012,"cfl":0.9,"angle":28}
    }"#;
    let half = r#"{
      "mode": "planar",
      "media": [{"name":"air","c":343.0,"rho":1.2}],
      "materials": [{"name":"rigid","kind":"rigid"}, {"name":"mirror","kind":"symmetry"}],
      "elements": [{"kind":"polyline","id":"room","closed":true,"pts":[[0,0],[1,0],[1,1],[0,1]],"materials":[0,1,0,0]}],
      "regions": [{"id":"air","seed":[0.5,0.5],"medium":0}],
      "sources": [{"id":"s","x":0.7,"y":0.5,"signal":{"type":"ricker","f0":500,"amp":1}}],
      "probes": [{"id":"p","x":0.4,"y":0.3}],
      "sim": {"fmax":2000,"nodes_per_wavelength":10,"duration":0.012,"cfl":0.9,"angle":28}
    }"#;
    let record = |json: &str| {
        let (scene, mesh, sys) = build(json);
        let mut st = stepper(&scene, &sys);
        let node = mesh.probe_nodes[0] as usize;
        let mut out = Vec::new();
        // Sample on a fixed clock, the two meshes having different dt.
        let mut next = 0.0;
        while !st.finished() {
            st.advance(&sys, 1).unwrap();
            if st.time >= next {
                out.push(st.pressure()[node]);
                next += 2e-5;
            }
        }
        (out, mesh.edges.iter().filter(|e| e.kind == EdgeKind::Symmetry).count())
    };
    let (a, _) = record(full);
    let (b, mirror_edges) = record(half);
    assert!(mirror_edges > 5, "no symmetry edge tagged");
    let n = a.len().min(b.len());
    let peak = a[..n].iter().fold(0.0f64, |m, v| m.max(v.abs()));
    let worst = (0..n).map(|i| (a[i] - b[i]).abs()).fold(0.0f64, f64::max);
    assert!(worst / peak < 0.05, "half and full rooms differ by {:.1}% of the peak", 100.0 * worst / peak);
}

#[test]
fn set_scene_keeps_the_mesh_for_physics_changes_and_retags_edges() {
    use engine::assembly::assemble;
    use engine::mesh::build;
    use engine::scene::{geometry_signature, Scene};
    let json = room_json(LX, LY, 1000.0, "", "planar");
    let scene = Scene::from_json(&json).unwrap();
    let mut mesh = build(&scene).unwrap();
    assert!(mesh.edges.iter().all(|e| e.kind == EdgeKind::Rigid));
    // The right wall becomes "soft" (impedance): same signature, edges retagged, damping appears.
    let soft = json.replace(r#""materials":[0,0,0,0]"#, r#""materials":[0,2,0,0]"#);
    assert_ne!(geometry_signature(&json).unwrap(), geometry_signature(&soft).unwrap(), "segment materials are geometry (indices)");
    let soft_kind = json.replace(r#"{"name":"rigid","kind":"rigid"}"#, r#"{"name":"rigid","kind":"impedance","zeta":3.0}"#);
    assert_eq!(geometry_signature(&json).unwrap(), geometry_signature(&soft_kind).unwrap());
    let scene2 = Scene::from_json(&soft_kind).unwrap();
    mesh.retag(&scene2);
    assert!(mesh.edges.iter().all(|e| e.kind == EdgeKind::Robin));
    let sys = assemble(&scene2, &mesh).unwrap();
    assert!(sys.c.iter().any(|&c| c > 0.0), "retagged edges must damp");
}

#[test]
fn an_interior_piston_pushes_on_the_sides_it_is_told_to() {
    // A duct 2 x 0.1 m, rigid, with a thin piston across it at x = 1, drawn
    // upward: the left face is x < 1. Probes on each side.
    let run = |sides: &str| {
        let json = format!(
            r#"{{
          "mode": "planar",
          "media": [{{"name":"air","c":343.0,"rho":1.2}}],
          "materials": [{{"name":"rigid","kind":"rigid"}}, {{"name":"drive","kind":"piston","sides":"{sides}","signal":{{"type":"burst","f0":1500,"amp":0.01,"cycles":2}}}}],
          "elements": [{{"kind":"polyline","id":"duct","closed":true,"pts":[[0,0],[2,0],[2,0.1],[0,0.1]],"materials":[0,0,0,0]}},
                       {{"kind":"polyline","id":"plate","closed":false,"pts":[[1,0],[1,0.1]],"materials":[1]}}],
          "regions": [{{"id":"l","seed":[0.5,0.05],"medium":0}}, {{"id":"r","seed":[1.5,0.05],"medium":0}}],
          "probes": [{{"id":"left","x":0.6,"y":0.05}}, {{"id":"right","x":1.4,"y":0.05}}],
          "sim": {{"fmax":4000,"nodes_per_wavelength":10,"duration":0.0015,"cfl":0.9,"angle":28}}
        }}"#
        );
        let (scene, mesh, sys) = build(&json);
        let mut st = stepper(&scene, &sys);
        let (nl, nr) = (mesh.probe_nodes[0] as usize, mesh.probe_nodes[1] as usize);
        let (mut l, mut r) = (Vec::new(), Vec::new());
        while !st.finished() {
            st.advance(&sys, 1).unwrap();
            l.push(st.pressure()[nl]);
            r.push(st.pressure()[nr]);
        }
        (l, r)
    };
    let peak = |v: &[f64]| v.iter().fold(0.0f64, |m, x| m.max(x.abs()));
    let corr = |a: &[f64], b: &[f64]| {
        let (aa, bb, ab) = a.iter().zip(b).fold((0.0, 0.0, 0.0), |(aa, bb, ab), (x, y)| (aa + x * x, bb + y * y, ab + x * y));
        ab / (aa * bb).sqrt()
    };
    let (l, r) = run("both");
    assert!(corr(&l, &r) > 0.5, "breathing: both sides in phase, corr {}", corr(&l, &r));
    let (l, r) = run("plate");
    assert!(corr(&l, &r) < -0.5, "plate: sides in opposite phase, corr {}", corr(&l, &r));
    let (l, r) = run("left");
    assert!(peak(&r) < 1e-6 * peak(&l), "left only: right side silent, {} vs {}", peak(&r), peak(&l));
    let (l, r) = run("right");
    assert!(peak(&l) < 1e-6 * peak(&r), "right only: left side silent");
}

#[test]
fn a_porous_screen_transmits_and_reflects_by_its_resistance() {
    // A duct with a screen across it: at normal incidence the pressure
    // transmission is 2 / (2 + r) and the reflection r / (2 + r), r = R / (rho c).
    for (r, label) in [(1.0, "matched"), (0.25, "light cloth"), (1e-4, "transparent"), (1e4, "wall")] {
        let big_r = r * 1.2 * 343.0;
        let json = format!(
            r#"{{
          "mode": "planar",
          "media": [{{"name":"air","c":343.0,"rho":1.2}}],
          "materials": [{{"name":"rigid","kind":"rigid"}}, {{"name":"open","kind":"open","zeta":1.0}},
                        {{"name":"cloth","kind":"screen","resistance":{big_r}}},
                        {{"name":"drive","kind":"piston","signal":{{"type":"gauss","f0":2000,"amp":0.01}}}}],
          "elements": [{{"kind":"polyline","id":"duct","closed":true,"pts":[[0,0],[2,0],[2,0.1],[0,0.1]],"materials":[0,1,0,3]}},
                       {{"kind":"polyline","id":"screen","closed":false,"pts":[[1,0],[1,0.1]],"materials":[2]}}],
          "regions": [{{"id":"l","seed":[0.5,0.05],"medium":0}}, {{"id":"r","seed":[1.5,0.05],"medium":0}}],
          "probes": [{{"id":"before","x":0.5,"y":0.05}}, {{"id":"after","x":1.5,"y":0.05}}],
          "sim": {{"fmax":4000,"nodes_per_wavelength":10,"duration":0.0075,"cfl":0.9,"angle":28}}
        }}"#
        );
        let (scene, mesh, sys) = build(&json);
        assert!(!mesh.twins.is_empty(), "the screen must split nodes into twins");
        assert!(!sys.couplings.is_empty(), "the screen must couple the twins");
        let mut st = stepper(&scene, &sys);
        let (nb, na) = (mesh.probe_nodes[0] as usize, mesh.probe_nodes[1] as usize);
        let (mut before, mut after) = (Vec::new(), Vec::new());
        while !st.finished() {
            st.advance(&sys, 1).unwrap();
            before.push(st.pressure()[nb]);
            after.push(st.pressure()[na]);
        }
        let peak = |v: &[f64]| v.iter().fold(0.0f64, |m, x| m.max(x.abs()));
        // The incident pulse passes x = 0.5 before 3 ms (t0 = 4 sigma = 0.64 ms, 1.46 ms of travel);
        // the reflection from the screen comes back around 4.4 ms, before the open-end echo.
        let split = (0.0032 / st.dt) as usize;
        let incident = peak(&before[..split]);
        let reflected = peak(&before[split..(0.0060 / st.dt) as usize]);
        let transmitted = peak(&after);
        let (t_th, r_th) = (2.0 / (2.0 + r), r / (2.0 + r));
        assert!((transmitted / incident - t_th).abs() < 0.04, "{label}: transmitted {} vs {t_th}", transmitted / incident);
        assert!((reflected / incident - r_th).abs() < 0.04, "{label}: reflected {} vs {r_th}", reflected / incident);
    }
}
