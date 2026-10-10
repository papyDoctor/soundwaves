//! The source signals in closed form, with their time derivatives: a piston
//! load wants the acceleration of a velocity signal, and finite differences
//! of a sampled signal would add noise for nothing.

use crate::scene::Signal;
use std::f64::consts::PI;

impl Signal {
    /// The signal at time t.
    pub fn value(&self, t: f64) -> f64 {
        match *self {
            Signal::Gauss { f0, amp, t0 } => {
                let s = 1.0 / (PI * f0);
                let tau = t - t0.unwrap_or(4.0 * s);
                amp * (-(tau / s).powi(2)).exp()
            }
            Signal::Ricker { f0, amp, t0 } => {
                let tau = t - t0.unwrap_or(1.5 / f0);
                let a = (PI * f0 * tau).powi(2);
                amp * (1.0 - 2.0 * a) * (-a).exp()
            }
            Signal::Burst { f0, amp, cycles, t0 } => {
                let tau = t - t0.unwrap_or(0.0);
                let len = cycles / f0;
                if tau < 0.0 || tau >= len {
                    0.0
                } else {
                    amp * (2.0 * PI * f0 * tau).sin() * 0.5 * (1.0 - (2.0 * PI * tau / len).cos())
                }
            }
            Signal::Sine { f0, amp, t0 } => {
                let tau = t - t0.unwrap_or(0.0);
                if tau < 0.0 {
                    return 0.0;
                }
                amp * (2.0 * PI * f0 * tau).sin() * ramp(tau, 2.0 / f0)
            }
        }
    }

    /// d/dt of the signal at time t.
    pub fn derivative(&self, t: f64) -> f64 {
        match *self {
            Signal::Gauss { f0, amp, t0 } => {
                let s = 1.0 / (PI * f0);
                let tau = t - t0.unwrap_or(4.0 * s);
                amp * (-(tau / s).powi(2)).exp() * (-2.0 * tau / (s * s))
            }
            Signal::Ricker { f0, amp, t0 } => {
                let tau = t - t0.unwrap_or(1.5 / f0);
                let k = (PI * f0).powi(2);
                let a = k * tau * tau;
                let da = 2.0 * k * tau;
                amp * (-da) * (3.0 - 2.0 * a) * (-a).exp()
            }
            Signal::Burst { f0, amp, cycles, t0 } => {
                let tau = t - t0.unwrap_or(0.0);
                let len = cycles / f0;
                if tau < 0.0 || tau >= len {
                    0.0
                } else {
                    let w = 2.0 * PI * f0;
                    let ww = 2.0 * PI / len;
                    let window = 0.5 * (1.0 - (ww * tau).cos());
                    let dwindow = 0.5 * ww * (ww * tau).sin();
                    amp * (w * (w * tau).cos() * window + (w * tau).sin() * dwindow)
                }
            }
            Signal::Sine { f0, amp, t0 } => {
                let tau = t - t0.unwrap_or(0.0);
                if tau < 0.0 {
                    return 0.0;
                }
                let w = 2.0 * PI * f0;
                let len = 2.0 / f0;
                amp * (w * (w * tau).cos() * ramp(tau, len) + (w * tau).sin() * dramp(tau, len))
            }
        }
    }

    pub fn f0(&self) -> f64 {
        match *self {
            Signal::Gauss { f0, .. } | Signal::Ricker { f0, .. } | Signal::Burst { f0, .. } | Signal::Sine { f0, .. } => f0,
        }
    }
}

/// A cosine ramp from 0 to 1 over `len`, then 1.
fn ramp(tau: f64, len: f64) -> f64 {
    if tau >= len {
        1.0
    } else {
        0.5 * (1.0 - (PI * tau / len).cos())
    }
}

fn dramp(tau: f64, len: f64) -> f64 {
    if tau >= len {
        0.0
    } else {
        0.5 * (PI / len) * (PI * tau / len).sin()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn check_derivative(sig: Signal, t: f64) {
        let h = 1e-7;
        let num = (sig.value(t + h) - sig.value(t - h)) / (2.0 * h);
        let ana = sig.derivative(t);
        let scale = 1.0 + ana.abs();
        assert!((num - ana).abs() / scale < 1e-4, "{sig:?} at t={t}: numeric {num}, analytic {ana}");
    }

    #[test]
    fn derivatives_match_finite_differences() {
        for t in [0.0003, 0.001, 0.0021, 0.0037, 0.0062] {
            check_derivative(Signal::Gauss { f0: 800.0, amp: 1.0, t0: None }, t);
            check_derivative(Signal::Ricker { f0: 500.0, amp: 2.0, t0: None }, t);
            check_derivative(Signal::Burst { f0: 1000.0, amp: 1.0, cycles: 3.0, t0: Some(0.0005) }, t);
            check_derivative(Signal::Sine { f0: 300.0, amp: 0.5, t0: None }, t);
        }
    }

    #[test]
    fn signals_start_quiet() {
        assert!(Signal::Gauss { f0: 800.0, amp: 1.0, t0: None }.value(0.0).abs() < 1e-6);
        assert!(Signal::Ricker { f0: 800.0, amp: 1.0, t0: None }.value(0.0).abs() < 1e-3);
        assert_eq!(Signal::Sine { f0: 800.0, amp: 1.0, t0: None }.value(0.0), 0.0);
    }
}
