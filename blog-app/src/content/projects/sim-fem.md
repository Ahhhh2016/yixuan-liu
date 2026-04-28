# SIM-FEM

## Design Choices
### extracting the surface mesh
I count each tetrahedron face by a sorted triple of vertex indices; faces that appear once are on the boundary, while shared faces are interior. 

### computing and applying internal forces
I precompute each tet's rest-state inverse matrix `Dm^-1` and rest volume, then build the deformation gradient `F = Ds Dm^-1` at runtime from the current vertex positions. 
From `F` I compute Green strain $E = 0.5(F^T F - I)$ and second Piola-Kirchhoff stress $S = \lambda tr(E) I + 2 \mu E$, then convert that stress into per-vertex forces with the standard FEM force assembly.
Viscous damping uses the same pipeline with `Fdot` and `E_dot`, adding a damping stress before scattering forces to the four tet vertices.

### collision resolution
Ground and sphere obstacle contacts first contribute penalty forces during force accumulation, which gives continuous support before the projection stage. After each step, `resolveCollisions()` iteratively averages surface-based push-out corrections over boundary triangles, applies a minimum-volume tet projection to keep the contact region from collapsing, and then clamps any remaining penetrations in world space. Velocities are rebuilt from the corrected positions and passed through a normal/tangential response with restitution and friction.

### your explicit integration method
I use the explicit midpoint method. Each step first evaluates forces and accelerations at the current state, advances position and velocity by half a step to form a midpoint state, and then recomputes forces at that midpoint. The full update uses midpoint velocity and midpoint acceleration, followed by collision handling.

### Extra Credits
#### Parallelization
I parallelized a few simple loops with OpenMP, including rest-state tet preprocessing, per-vertex gravity/damping accumulation, and the midpoint integration loops. 
The following code is added in CMakeLists.txt to support OpenMP.
```
find_package(OpenMP)
if(OpenMP_CXX_FOUND)
  target_link_libraries(${PROJECT_NAME} PUBLIC OpenMP::OpenMP_CXX)
else()
  if(APPLE)
    set(LIBOMP_PATH /opt/homebrew/opt/libomp)

    target_compile_options(${PROJECT_NAME} PRIVATE
      -Xpreprocessor -fopenmp
    )

    target_include_directories(${PROJECT_NAME} PRIVATE
      ${LIBOMP_PATH}/include
    )

    target_link_directories(${PROJECT_NAME} PRIVATE
      ${LIBOMP_PATH}/lib
    )

    target_link_libraries(${PROJECT_NAME} PRIVATE
      omp
    )
  endif()
endif()
```

#### Interactivity: Drag
I added right mouse dragging to the falling object. A ray is cast from the camera, intersect with the current surface mesh, and the hit triangle is stored together with its barycentric coordinates. While dragging, the target point follows the mouse ray at the original depth, and a spring-damper force pulls the corresponding barycentric point on the deformable surface toward that target. 


## Link of Implementations
- [Extract the surface mesh from your tetrahedral mesh](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L45-L69)
- [Compute and apply force due to gravity](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L600-L618)
- [Compute and apply internal elastic forces](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L620-L673)
- [Compute and apply internal viscous damping forces](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L652-L665)
- [Resolve collisions](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L421-L579)
- [Explicit midpoint method](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L713-L747)
- [Parallelization](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L391-L414)
- [Interactivity: drag](https://github.com/brown-cs-224/sim-fem-Ahhhh2016-1/blob/master/src/simulation.cpp#L803-L868)

## Result Videos
Ground contact:

![Ground contact tet](example-video/ezgif-4ffea82290e9e163.gif)
![Ground contact cube](example-video/ezgif-4adbeb9cbe3097af.gif)
![Ground contact sphere](example-video/sphere.gif)
![Ground contact ellipsoid](example-video/ellip.gif)

Sphere collision:

![cube](example-video/ezgif-2c7f46c4a9e8fa54.gif)
![sphere](example-video/sphere2.gif)


Interactive drag:

![Interactive drag](example-video/drag.gif)


## Known Bugs
The ellipsoid got exploded after collision with sphere obstable.

![explode](example-video/yishujiushibaozha.gif)