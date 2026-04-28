# Half-Edge Mesh Geometry Processing Toolkit

---
## Tech Stack
C++17 · Eigen · Qt 6 · Half-edge data structure · tinyobjloader

## Context
Course project for Brown University CSCI 2240 Interactive Computer Graphics. Built from scratch in C++ on top of a custom **half-edge mesh** data structure, the project implements a suite of classical geometry processing algorithms — atomic edge operations, **Loop subdivision**, **Quadric Error Metric (QEM) simplification**, **isotropic remeshing**, and **bilateral mesh denoising** — all running in (asymptotically) optimal time on triangle meshes.

## Summary

A unified pipeline reads `.obj` files into a half-edge representation, runs a configurable geometry processing method specified by an `.ini` config file, and writes the result back to `.obj`. The half-edge structure is augmented with hashed maps over directed halfedges and undirected edges so that **edge flip, split, and collapse all run in $O(1)$ amortized time**. A thorough validator with 11 invariant checks (twin/next consistency, disk-topology, edge–halfedge consistency, etc.) is run after every global operation to catch corruption early.

## Features

### Half-Edge Data Structure
- `Vertex` (id, degree, 3D position, outgoing halfedge), `Face` (id, halfedge), `Edge` (halfedge, isNew flag), `Halfedge` (from, to, next, twin, face, edge)
- Hash-indexed storage for $O(1)$ average lookups:
  - `HE : unordered_map<(from,to), Halfedge*>` — directed halfedge between two vertices
  - `E  : unordered_map<(min,max), Edge*>` — undirected edge keyed canonically
- Validator with **11 assertions**: every vertex has a halfedge, no isolated vertices, disk-like one-rings, twin/next consistency, two faces per edge, edge–halfedge bijection, etc.

### Atomic Edge Operations
| Operation | Complexity | Notes |
| --- | --- | --- |
| Edge Flip | $O(1)$ | Rejects flips that would degenerate a degree-3 vertex or create a duplicate edge |
| Edge Split | $O(1)$ | Inserts midpoint, builds 4 new faces, reuses 4 of 6 surrounding halfedges |
| Edge Collapse | $O(1)^{*}$ | Full **link-condition + boundary check + halfedge-collision check** to preserve manifold topology; redirects the removed vertex's one-ring outgoing halfedges to the survivor |

<sub>*assumes bounded vertex degree</sub>

### Loop Subdivision
- $\beta$-rule for old vertex repositioning: $\beta = 3/16$ for degree 3, $\beta = \tfrac{1}{n}\!\left(\tfrac{5}{8} - \left(\tfrac{3}{8} + \tfrac{1}{4}\cos\tfrac{2\pi}{n}\right)^{\!2}\right)$ otherwise
- New edge-point rule: $\tfrac{3}{8}(a+b) + \tfrac{1}{8}(c+d)$
- Snapshots old edges before splitting, then flips only **new edges connecting one old and one new vertex** — overall $O(n+m)$ time

### Quadric Error Metric Simplification
- Per-vertex $4\times 4$ quadric matrices accumulated from incident face planes $\mathbf{p} = (n_x, n_y, n_z, d)$, $K_p = \mathbf{p}\mathbf{p}^{\!\top}$
- Optimal contraction position via $A\mathbf{x} = \mathbf{b}$ from the upper-left $3\times 3$ block of $Q$, with midpoint/endpoint fallback when singular
- **Priority structure**: `std::set<Candidate>` ordered by cost (effectively a balanced BST min-queue) paired with an `unordered_map<EKey, set::iterator>` for $O(\log m)$ updates
- After each collapse: recompute candidate costs only for the survivor's incident edges
- Build $O(|F| + |E|\log|E|)$, each collapse $O(\log|E|)$

### Isotropic Remeshing
Section 4 of *A Remeshing Approach to Multiresolution Modeling* (Botsch & Kobbelt, 2004):
1. Compute mean edge length $L$
2. **Split** edges longer than $\tfrac{4L}{3}$
3. **Collapse** edges shorter than $\tfrac{4L}{5}$
4. **Flip** edges only when it reduces the total deviation $\sum |\deg(v) - 6|$
5. **Tangential relaxation**: move each vertex toward its 1-ring centroid, projected onto the tangent plane via $v \leftarrow v + w\,(I - n n^{\!\top})(c - v)$

### Bilateral Mesh Denoising
Implements *Bilateral Mesh Denoising* (Fleishman, Drori, Cohen-Or, 2003):
- For each vertex $v$ with normal $n$, weight neighbors $q_i$ by both spatial distance $t = \|q_i - v\|$ and signed normal offset $h = n \cdot (q_i - v)$:
$$
v' = v + n \cdot \frac{\sum_i w_c(t)\,w_s(h)\,h}{\sum_i w_c(t)\,w_s(h)}, \quad w_c(t) = e^{-t^2 / 2\sigma_c^2}, \quad w_s(h) = e^{-h^2 / 2\sigma_s^2}
$$
- Two neighborhood modes: **1-ring** when $\rho \le 0$, otherwise **BFS over connectivity** bounded by Euclidean radius $\rho$ — preserving sharp features without leaking through topological holes

## Results

### QEM Simplification

| Shape | Result |
| --- | --- |
| Sphere (full simplification run) | ![QEM simplification — sphere](/images/projects/mesh/sphere.png?w=380) |
| Utah teapot / cow mesh | ![QEM simplification — cow](/images/projects/mesh/simplify-cow.png?w=380) |

### Isotropic Remeshing

Two meshes: input (left column of each pair) → remeshed output (more uniform edges, degrees pulled toward 6).

| Input | Remeshed |
| :---: | :---: |
| ![Remesh input — mesh A](/images/projects/mesh/remesh-input.png?w=360) | ![Remesh output — mesh A](/images/projects/mesh/remesh-output.png?w=360) |
| ![Remesh input — mesh B](/images/projects/mesh/remesh-input2.png?w=360) | ![Remesh output — mesh B](/images/projects/mesh/remesh-output2.png?w=360) |

### Bilateral Mesh Denoising

Sphere mesh: Gaussian noise along normals → bilateral filter preserves overall shape while smoothing high-frequency noise.

| Noisy | Denoised |
| :---: | :---: |
| ![Noisy sphere](/images/projects/mesh/noisy-sphere.png?w=380) | ![Denoised sphere](/images/projects/mesh/denoised-sphere.png?w=380) |
