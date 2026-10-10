//! Compressed sparse rows, the little we need: one symmetric pattern shared by
//! the stiffness, mass and damping matrices, scatter-add of element matrices,
//! and the matrix-vector product the time stepper spends its life in.

#[derive(Debug, Clone)]
pub struct Pattern {
    pub n: usize,
    pub indptr: Vec<u32>,
    pub indices: Vec<u32>,
}

impl Pattern {
    /// The node-to-node adjacency of a triangle mesh, diagonal included,
    /// columns sorted within each row.
    pub fn from_triangles(n: usize, tri: &[[u32; 3]]) -> Pattern {
        let mut rows: Vec<Vec<u32>> = vec![Vec::new(); n];
        for i in 0..n {
            rows[i].push(i as u32);
        }
        for t in tri {
            for a in 0..3 {
                for b in 0..3 {
                    if a != b {
                        rows[t[a] as usize].push(t[b]);
                    }
                }
            }
        }
        let mut indptr = Vec::with_capacity(n + 1);
        let mut indices = Vec::new();
        indptr.push(0);
        for r in rows.iter_mut() {
            r.sort_unstable();
            r.dedup();
            indices.extend_from_slice(r);
            indptr.push(indices.len() as u32);
        }
        Pattern { n, indptr, indices }
    }

    pub fn nnz(&self) -> usize {
        self.indices.len()
    }

    /// Position of (i, j) in the values array. Panics if absent: the pattern
    /// comes from the same triangles as the assembly.
    #[inline]
    pub fn index(&self, i: u32, j: u32) -> usize {
        let (lo, hi) = (self.indptr[i as usize] as usize, self.indptr[i as usize + 1] as usize);
        let row = &self.indices[lo..hi];
        lo + row.binary_search(&j).expect("entry outside the sparsity pattern")
    }

    /// y = A x for values laid out on this pattern.
    pub fn spmv(&self, values: &[f64], x: &[f64], y: &mut [f64]) {
        for i in 0..self.n {
            let (lo, hi) = (self.indptr[i] as usize, self.indptr[i + 1] as usize);
            let mut s = 0.0;
            for k in lo..hi {
                s += values[k] * x[self.indices[k] as usize];
            }
            y[i] = s;
        }
    }
}
