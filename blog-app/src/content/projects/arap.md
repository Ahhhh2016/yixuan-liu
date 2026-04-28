### Example Videos


| Program Specification | Our Example | Student Output |
| :-------------------- | :---------- | :------------- |
| Anchoring exactly one point, then moving that point, results in perfectly rigid motion (mostly translation, though some rotation for smaller meshes is acceptable).       | ![](./readme-videos/sphere.gif)      | ![](./output/sphere.gif)  |
| Anchoring exactly two points, then rotating one point around the other at a fixed distance, results in perfectly rigid rotation.                                          | ![](./readme-videos/teapot.gif)      | ![](./output/teapot.gif)      |
| Deformations are "permanent"; i.e. un-anchoring previously moved points leaves the mesh in its deformed state, and further deformations can be made on the deformed mesh. | ![](./readme-videos/bean.gif)        | ![](./output/bean.gif)        |
| You should be able to make the armadillo wave.                                                                                                                            | ![](./readme-videos/armadillo.gif)   |![](./output/armadillo.gif)   |
| Attempting to deform `tetrahedron.obj` should not cause it to collapse or behave erratically.                                                                             | ![](./readme-videos/tetrahedron.gif) |   ![](./output/tetrahedron.gif) |
| Attempting to deform a (large) mesh like `bunny.obj` or `peter.obj` should not cause your code to crash.                                                                  | ![](./readme-videos/peter.gif)       |  ![](./output/peter.gif)       |


### Implementation Location
- [Build the L-matrix](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L170)
- [Apply constraints](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L264)
- [Precompute the decomposition of the L matrix](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L193)
- [Determine the best-fit rotations](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L224)
- [Optimize the positions](https://github.com/brown-cs-224/arap-Ahhhh2016-1/blob/faf79120c4af5e860a5c9bfa030d6b2787981afd/src/arap.cpp#L276)


### Run the Program
In `arap.cpp` line 91, change the file path for mesh loader to specify which mesh to load. Then just run the program after change the working directory.

### Design choices
- The iteration number is set to 5.
- Vertices, Lff and solver are cached. If anchors are not changed, they will not be calculated again.