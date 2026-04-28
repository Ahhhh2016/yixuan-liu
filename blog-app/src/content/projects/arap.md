# Interactive As-Rigid-As-Possible (ARAP) Mesh Deformation

---
## Tech Stack
C++17 · Eigen · Qt 6 · OpenGL · SimplicialLLT · SVD

## Context
Course project for Brown University CSCI 2240 Interactive Computer Graphics. Built from scratch in C++ with Eigen and Qt, the project implements **As-Rigid-As-Possible surface modeling** (Sorkine & Alexa, 2007), letting users grab and drag mesh vertices in real time while the surrounding geometry deforms in a physically-plausible, locally-rigid manner — as if the mesh had an underlying skeletal rig.

## Summary

For every user interaction, the system formulates the deformation as an **alternating optimization**: it iteratively (1) finds the best-fit rigid rotation $R_i$ for each vertex's one-ring via **SVD on a covariance matrix**, then (2) solves a **sparse linear system** $L_{ff}\,p' = b$ for the new vertex positions while pinning anchored vertices as hard constraints. The Laplacian $L$ uses **cotangent weights** for discretization-aware stiffness, and its Cholesky factorization is **cached and reused** across iterations and drag events, giving an interactive frame rate even on meshes with thousands of vertices.

## Features

### ARAP Algorithm
- **Cotangent-weighted Laplacian** — weights computed as $w_{ij} = \tfrac{1}{2}(\cot\alpha_{ij} + \cot\beta_{ij})$ from one-ring opposites; absolute value used to keep the system positive semi-definite even on obtuse triangles
- **Local step (best-fit rotation)** — for each vertex $i$, build the covariance $S_i = \sum_{j \in N(i)} w_{ij}\,(p'_i - p'_j)(p_i - p_j)^\top$, take its SVD, and set $R_i = U V^\top$; flip the last column of $U$ when $\det(R_i) < 0$ to avoid reflections
- **Global step (position solve)** — assemble the right-hand side $b_i = \sum_j \tfrac{1}{2} w_{ij} (R_i + R_j)(p_i - p_j)$ and solve $L_{ff} p' = b$ for the free vertices, moving constrained-vertex contributions to the RHS
- **5 alternating iterations** per drag event give a good convergence / latency trade-off for interactive editing

### Constraint Handling
- Anchored vertices are baked into the system by **deleting their rows/columns from $L$** and folding their known positions into the RHS
- A dedicated `oldToFree` index map keeps the reduced system compact and the sparse solve fast

### Caching & Performance
- **Sparse Cholesky factorization** (`SimplicialLLT`) of the reduced Laplacian $L_{ff}$ is computed **once per anchor configuration** and reused across all 5 iterations and all subsequent drags of the same anchor — the only step that re-runs is back-substitution
- The system is **invalidated lazily**: anchor add/remove triggers a single rebuild + refactorization; pure dragging never touches it
- Three independent linear solves for $x$, $y$, $z$ share the same factorization

### Interactive Viewer (Qt + OpenGL)
- First-person and orbit camera modes (`WASD`, `R`/`F`, `C`)
- `Right-click` to anchor / un-anchor a vertex; `Left-click + drag` on an anchor to deform the mesh
- Deformations are **persistent**: un-anchoring a moved vertex leaves the mesh in its deformed state, allowing further edits to compose on top

## Implementation Map

| Step | Where |
| --- | --- |
| Build the cotangent-weighted L matrix | [`src/arap.cpp` L170](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L170) |
| Apply user constraints (delete rows/cols) | [`src/arap.cpp` L264](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L264) |
| Pre-factorize $L_{ff}$ via SimplicialLLT | [`src/arap.cpp` L193](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L193) |
| Best-fit rotations via SVD | [`src/arap.cpp` L224](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L224) |
| Optimize positions (global solve) | [`src/arap.cpp` L276](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L276) |

## Results

The deformer was validated against the full set of course specification tests, from rigid-translation sanity checks all the way up to high-resolution meshes such as `peter.obj`.

| Behavior | Demo |
| --- | --- |
| Anchoring **one** point and translating it produces (near-)rigid motion | ![sphere](/images/projects/arap/sphere.gif) |
| Anchoring **two** points and rotating one around the other produces perfectly rigid rotation | ![teapot](/images/projects/arap/teapot.gif) |
| Deformations are **persistent** — un-anchoring leaves the mesh in its new shape, ready for further edits | ![bean](/images/projects/arap/bean.gif) |
| Articulated posing — the armadillo can be made to wave | ![armadillo](/images/projects/arap/armadillo.gif) |
| Degenerate / minimal meshes don't collapse | ![tetrahedron](/images/projects/arap/tetrahedron.gif) |
| Scales to large meshes (`peter.obj`, `bunny.obj`) without crashing | ![peter](/images/projects/arap/peter.gif) |
