# Real-Time FEM Soft-Body Simulation

---
## Tech Stack
C++17 · Eigen · Qt 6 · OpenMP · Tetrahedral FEM · Explicit Integration

## Context
Course project for Brown University CSCI 2240 Interactive Computer Graphics. Built from scratch in C++ with Eigen and Qt, the project simulates **deformable solids** on a tetrahedral mesh using the Finite Element Method, supporting elasticity, viscous damping, gravity, ground / sphere collisions, and interactive mouse-driven manipulation in real time.

## Summary

Each frame, the simulator advances the deformable mesh by computing per-tetrahedron deformation gradients, evaluating **St. Venant–Kirchhoff** elastic stresses and viscous damping stresses, scattering the resulting forces onto vertices, and integrating the dynamics with an **explicit midpoint method**. A two-phase contact pipeline combines penalty forces during force accumulation with iterative position projection afterward, preserving stability inside thin contact regions. The boundary mesh is extracted on initialization for rendering, picking, and collision queries, and the inner loops are parallelized with OpenMP.

## Features

### Continuum Mechanics
- **St. Venant–Kirchhoff elasticity** — deformation gradient $F = D_s D_m^{-1}$, Green strain $E = \tfrac{1}{2}(F^T F - I)$, second Piola–Kirchhoff stress $S = \lambda\,\mathrm{tr}(E)\,I + 2\mu E$
- **Viscous damping** — the same FEM pipeline applied to $\dot F$ and $\dot E$, adding a damping stress before per-vertex force assembly
- **Rest-state precomputation** — each tetrahedron's $D_m^{-1}$ and rest volume are cached once at load time so the per-step force evaluation reduces to a few small matrix products

### Surface Mesh Extraction
- Boundary faces are detected by hashing each tet face as a sorted vertex triple; faces appearing **once** are surface, faces appearing **twice** are interior
- The extracted surface is reused for rendering, ray-picking, and collision queries

### Collision Resolution
| Stage | Implementation |
| --- | --- |
| Force phase | Penalty forces for ground and sphere obstacles provide continuous support |
| Position projection | Iteratively averaged push-out across boundary triangles in contact |
| Inversion guard | Minimum-volume tet projection keeps the contact region from collapsing |
| Velocity update | Velocities rebuilt from corrected positions, then split into normal / tangential response with restitution and friction |

### Integration
- **Explicit midpoint** — evaluate forces at $t$, take a half step to a midpoint state, re-evaluate forces there, then advance the full step using midpoint velocity and midpoint acceleration before collision handling

### Interactivity
- **Right-mouse drag** casts a ray against the live surface mesh, stores the hit triangle along with its barycentric coordinates, and applies a **spring–damper force** to the corresponding barycentric point so the user can pull and deform the body interactively while the simulation continues to step

### Performance
- **OpenMP** `parallel for` on rest-state preprocessing, per-vertex gravity / damping accumulation, and midpoint integration loops
- Custom CMake configuration to enable `libomp` on Apple Silicon

## Results

Demonstration scenes cover ground contact across multiple geometries (tet, cube, sphere, ellipsoid), sphere-obstacle collisions, and live interactive drag — all running in real time.

![Ground contact — single tetrahedron](/images/projects/sim-fem/ezgif-4ffea82290e9e163.gif)

![Ground contact — cube](/images/projects/sim-fem/ezgif-4adbeb9cbe3097af.gif)

![Ground contact — sphere](/images/projects/sim-fem/sphere.gif)

![Sphere-obstacle collision — cube](/images/projects/sim-fem/ezgif-2c7f46c4a9e8fa54.gif)

![Sphere-obstacle collision — sphere](/images/projects/sim-fem/sphere2.gif)

![Interactive drag with spring–damper coupling](/images/projects/sim-fem/drag.gif)
