//! Explicit time stepping: central differences (leapfrog) with lumped mass and
//! lumped boundary damping, so each step is one sparse product and one pass
//! over the nodes:
//!
//!   (M + dt/2 C) p+ = dt^2 (f - K p) + 2 M p - (M - dt/2 C) p-

use crate::assembly::System;

pub struct Stepper {
    pub dt: f64,
    pub time: f64,
    pub step: u64,
    pub duration: f64,
    p_prev: Vec<f64>,
    p: Vec<f64>,
    p_next: Vec<f64>,
    f: Vec<f64>,
    kp: Vec<f64>,
    /// 1 / (m_i + dt c_i / 2)
    inv_a: Vec<f64>,
    /// m_i - dt c_i / 2
    b: Vec<f64>,
    /// Largest |p| seen in the last step, to catch a blow-up.
    pub peak: f64,
    /// Screen couplings (i, j, g) and the blocks that solve them implicitly.
    couplings: Vec<(u32, u32, f64)>,
    blocks: Vec<Block>,
}

/// A connected set of coupled nodes with the inverse of its small matrix
/// (M + dt/2 C) restricted to it, dense: pairs mostly, a few more at junctions.
struct Block {
    nodes: Vec<u32>,
    inverse: Vec<f64>, // n x n, row-major
}

impl Stepper {
    pub fn new(system: &System, dt: f64, duration: f64) -> Stepper {
        let n = system.n();
        let inv_a = (0..n).map(|i| 1.0 / (system.m[i] + 0.5 * dt * system.c[i])).collect();
        let b = (0..n).map(|i| system.m[i] - 0.5 * dt * system.c[i]).collect();
        let blocks = build_blocks(system, dt);
        Stepper {
            couplings: system.couplings.clone(),
            blocks,
            dt,
            time: 0.0,
            step: 0,
            duration,
            p_prev: vec![0.0; n],
            p: vec![0.0; n],
            p_next: vec![0.0; n],
            f: vec![0.0; n],
            kp: vec![0.0; n],
            inv_a,
            b,
            peak: 0.0,
        }
    }

    /// The stable step: cfl * 2 / sqrt(lambda_max), computed from the
    /// assembled system (30 power iterations are plenty for the top of the spectrum).
    pub fn stable_dt(system: &System, cfl: f64) -> (f64, f64) {
        let lambda = system.lambda_max(30);
        // The iteration converges from below; 2 % of margin covers what it missed.
        (cfl * 2.0 / (lambda * 1.02).sqrt(), lambda)
    }

    pub fn reset(&mut self) {
        self.time = 0.0;
        self.step = 0;
        self.peak = 0.0;
        self.p_prev.fill(0.0);
        self.p.fill(0.0);
        self.p_next.fill(0.0);
    }

    pub fn pressure(&self) -> &[f64] {
        &self.p
    }

    pub fn finished(&self) -> bool {
        self.time >= self.duration - 0.5 * self.dt
    }

    /// Advance n steps (fewer if the duration is reached). Returns the number
    /// of steps done, or an error when the field blows up.
    pub fn advance(&mut self, system: &System, n: u32) -> Result<u32, String> {
        let mut done = 0;
        let dt = self.dt;
        let dt2 = dt * dt;
        let nn = self.p.len();
        while done < n && !self.finished() {
            system.load_at(self.time, &mut self.f);
            system.pattern.spmv(&system.k, &self.p, &mut self.kp);
            let mut peak = 0.0f64;
            for i in 0..nn {
                let v = (dt2 * (self.f[i] - self.kp[i]) + 2.0 * system.m[i] * self.p[i] - self.b[i] * self.p_prev[i]) * self.inv_a[i];
                self.p_next[i] = v;
                peak = peak.max(v.abs());
            }
            // Screens: the coupled nodes are redone implicitly. Their raw
            // right-hand side gains + dt/2 (C_screen p_prev), and the block's
            // inverse of (M + dt/2 C) replaces the diagonal division.
            if !self.blocks.is_empty() {
                for blk in &self.blocks {
                    let n = blk.nodes.len();
                    let mut rhs: Vec<f64> = blk.nodes.iter().map(|&i| self.p_next[i as usize] / self.inv_a[i as usize]).collect();
                    for &(i, j, g) in &self.couplings {
                        let d = 0.5 * dt * g * (self.p_prev[i as usize] - self.p_prev[j as usize]);
                        if let Some(pi) = blk.nodes.iter().position(|&x| x == i) {
                            rhs[pi] += d;
                        }
                        if let Some(pj) = blk.nodes.iter().position(|&x| x == j) {
                            rhs[pj] -= d;
                        }
                    }
                    for (r, &i) in blk.nodes.iter().enumerate() {
                        let mut v = 0.0;
                        for (cidx, &x) in rhs.iter().enumerate() {
                            v += blk.inverse[r * n + cidx] * x;
                        }
                        self.p_next[i as usize] = v;
                        peak = peak.max(v.abs());
                    }
                }
            }
            self.peak = peak;
            if !peak.is_finite() || peak > 1e30 {
                return Err(format!(
                    "the field blew up at t = {:.3} ms (step {}): the time step is unstable, lower sim cfl",
                    self.time * 1e3, self.step
                ));
            }
            // Rotate: prev <- p <- next, and reuse the old prev as next.
            std::mem::swap(&mut self.p_prev, &mut self.p);
            std::mem::swap(&mut self.p, &mut self.p_next);
            self.time += dt;
            self.step += 1;
            done += 1;
        }
        Ok(done)
    }

    /// The energy the leapfrog conserves exactly (no source, no damping):
    /// 1/2 v' M v + 1/2 p_prev' K p, with v = (p - p_prev) / dt the half-step
    /// velocity. The continuous form 1/2 p' K p would oscillate by O(omega dt).
    pub fn energy(&mut self, system: &System) -> f64 {
        let n = self.p.len();
        let mut kinetic = 0.0;
        for i in 0..n {
            let v = (self.p[i] - self.p_prev[i]) / self.dt;
            kinetic += system.m[i] * v * v;
        }
        system.pattern.spmv(&system.k, &self.p, &mut self.kp);
        let potential: f64 = self.p_prev.iter().zip(&self.kp).map(|(a, b)| a * b).sum();
        0.5 * (kinetic + potential)
    }
}

/// Group the coupled nodes into connected blocks and invert (M + dt/2 C) on each.
fn build_blocks(system: &System, dt: f64) -> Vec<Block> {
    if system.couplings.is_empty() {
        return Vec::new();
    }
    // Union-find over the coupled nodes.
    let mut parent: std::collections::HashMap<u32, u32> = std::collections::HashMap::new();
    fn find(parent: &mut std::collections::HashMap<u32, u32>, x: u32) -> u32 {
        let p = *parent.get(&x).unwrap_or(&x);
        if p == x {
            return x;
        }
        let r = find(parent, p);
        parent.insert(x, r);
        r
    }
    for &(i, j, _) in &system.couplings {
        let (ri, rj) = (find(&mut parent, i), find(&mut parent, j));
        if ri != rj {
            parent.insert(ri, rj);
        }
    }
    let mut groups: std::collections::HashMap<u32, Vec<u32>> = std::collections::HashMap::new();
    let mut members: Vec<u32> = system.couplings.iter().flat_map(|&(i, j, _)| [i, j]).collect();
    members.sort_unstable();
    members.dedup();
    for &n in &members {
        let r = find(&mut parent, n);
        groups.entry(r).or_default().push(n);
    }
    let mut blocks = Vec::new();
    for (_, nodes) in groups {
        let n = nodes.len();
        // A = diag(m + dt/2 c) + dt/2 * (g on the diagonal, -g across).
        let mut a = vec![0.0; n * n];
        for (r, &i) in nodes.iter().enumerate() {
            a[r * n + r] = system.m[i as usize] + 0.5 * dt * system.c[i as usize];
        }
        for &(i, j, g) in &system.couplings {
            let (pi, pj) = (nodes.iter().position(|&x| x == i), nodes.iter().position(|&x| x == j));
            if let (Some(pi), Some(pj)) = (pi, pj) {
                a[pi * n + pi] += 0.5 * dt * g;
                a[pj * n + pj] += 0.5 * dt * g;
                a[pi * n + pj] -= 0.5 * dt * g;
                a[pj * n + pi] -= 0.5 * dt * g;
            }
        }
        blocks.push(Block { nodes, inverse: invert(&a, n) });
    }
    blocks
}

/// Gauss-Jordan inverse of a small dense matrix (symmetric positive definite here).
fn invert(a: &[f64], n: usize) -> Vec<f64> {
    let mut m = a.to_vec();
    let mut inv = vec![0.0; n * n];
    for i in 0..n {
        inv[i * n + i] = 1.0;
    }
    for col in 0..n {
        let mut piv = col;
        for r in col + 1..n {
            if m[r * n + col].abs() > m[piv * n + col].abs() {
                piv = r;
            }
        }
        if piv != col {
            for c in 0..n {
                m.swap(col * n + c, piv * n + c);
                inv.swap(col * n + c, piv * n + c);
            }
        }
        let d = m[col * n + col];
        for c in 0..n {
            m[col * n + c] /= d;
            inv[col * n + c] /= d;
        }
        for r in 0..n {
            if r != col {
                let f = m[r * n + col];
                if f != 0.0 {
                    for c in 0..n {
                        m[r * n + c] -= f * m[col * n + c];
                        inv[r * n + c] -= f * inv[col * n + c];
                    }
                }
            }
        }
    }
    inv
}
