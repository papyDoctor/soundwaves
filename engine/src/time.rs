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
}

impl Stepper {
    pub fn new(system: &System, dt: f64, duration: f64) -> Stepper {
        let n = system.n();
        let inv_a = (0..n).map(|i| 1.0 / (system.m[i] + 0.5 * dt * system.c[i])).collect();
        let b = (0..n).map(|i| system.m[i] - 0.5 * dt * system.c[i]).collect();
        Stepper {
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
