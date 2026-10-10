//! Reproduces the mesher hang on an arc whose ends land on another wall.
use engine::mesh;
use engine::scene::Scene;

fn main() {
    let which: usize = std::env::args().nth(1).and_then(|a| a.parse().ok()).unwrap_or(0);
    let arc = r#"{"kind":"arc","id":"w3","cx":0.5,"cy":0,"r":0.02,"a0":0,"a1":180,"material":2}"#;
    let line_on_wall = r#"{"kind":"polyline","id":"w3","closed":false,"pts":[[0.48,0],[0.5,0.02],[0.52,0]],"materials":[2,2]}"#;
    let extra = [arc, line_on_wall][which];
    let json = format!(
        r#"{{"mode":"axisym","media":[{{"name":"air","c":343,"rho":1.2}}],
        "materials":[{{"name":"rigid","kind":"rigid"}},{{"name":"open","kind":"open","zeta":1}},{{"name":"drive","kind":"piston","signal":{{"type":"burst","f0":1500,"amp":0.01,"cycles":3}}}}],
        "elements":[{{"kind":"polyline","id":"tube","closed":false,"pts":[[0,0.05],[1,0.05],[1,0],[0,0],[0,0.05]],"materials":[0,1,0,0]}}, {extra}],
        "regions":[{{"id":"air","seed":[0.5,0.025],"medium":0}}],
        "sim":{{"fmax":4000,"nodes_per_wavelength":10,"duration":0.004,"cfl":0.9,"angle":28}}}}"#
    );
    let scene = Scene::from_json(&json).expect("scene");
    eprintln!("meshing case {which}...");
    match mesh::build(&scene) {
        Ok(m) => eprintln!("ok: {} nodes, warnings {:?}", m.xy.len(), m.stats.warnings),
        Err(e) => eprintln!("error: {e}"),
    }
}
