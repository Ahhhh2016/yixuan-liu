# Project 4: Antialias

Please fill this out for Antialias only. The project handout can be found [here](https://cs1230.graphics/projects/ray/3).

## Output Comparison
Run the program with the specified `.ini` file to compare your output (it should automatically save to the correct path).
> If your program can't find certain files or you aren't seeing your output images appear, make sure to:<br/>
> 1. Set your working directory to the project directory
> 2. Set the command-line argument in Qt Creator to `template_inis/antialias/<ini_file_name>.ini`
> 3. Clone the `scenefiles` submodule. If you forgot to do this when initially cloning this repository, run `git submodule update --init --recursive` in the project directory

> Note: Once all images are filled in, the images should be the same size in the expected and student outputs. However, if the images are not the same size, the aliasing may appear different in the markdown preview, even if your outputs are correct. 

| File/Method To Produce Output | Expected Output | Your Output |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | 
| shadow_test_4spp_grid.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/shadow_test_4spp_grid.png) | ![Place shadow_test_4spp_grid.png in student_outputs/antialias/required folder](student_outputs/antialias/required/shadow_test_4spp_grid.png) |
| shadow_test_4spp_rand.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/shadow_test_4spp_rand.png) | ![Place shadow_test_4spp_rand.png in student_outputs/antialias/required folder](student_outputs/antialias/required/shadow_test_4spp_rand.png) |
| shadow_test_4spp_strat.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/shadow_test_4spp_strat.png) | ![Place shadow_test_4spp_strat.png in student_outputs/antialias/required folder](student_outputs/antialias/required/shadow_test_4spp_strat.png) |
| mirror_primitives_64spp_strat.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/mirror_primitives_64spp_strat.png) | ![Place mirror_primitives_64spp_strat.png in student_outputs/antialias/required folder](student_outputs/antialias/required/mirror_primitives_64spp_strat.png) |
| cube_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/cube_bilinear.png) | ![Place cube_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/cube_bilinear.png) |
| unit_checkerboard_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/unit_checkerboard_bilinear.png) | ![Place unit_checkerboard_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/unit_checkerboard_bilinear.png) |
| sphere_checkerboard_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/sphere_checkerboard_bilinear.png) | ![Place sphere_checkerboard_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/sphere_checkerboard_bilinear.png) |
| unit_checkerboard_mipmap_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/unit_checkerboard_mipmap_bilinear.png) | ![Place unit_checkerboard_mipmap_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/unit_checkerboard_mipmap_bilinear.png) |
| sphere_checkerboard_mipmap_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/sphere_checkerboard_mipmap_bilinear.png) | ![Place sphere_checkerboard_mipmap_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/sphere_checkerboard_mipmap_bilinear.png) |
| cone_checkerboard_mipmap_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/cone_checkerboard_mipmap_bilinear.png) | ![Place cone_checkerboard_mipmap_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/cone_checkerboard_mipmap_bilinear.png) |
| cylinder_checkerboard_mipmap_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/cylinder_checkerboard_mipmap_bilinear.png) | ![Place cylinder_checkerboard_mipmap_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/cylinder_checkerboard_mipmap_bilinear.png) |
| moire_checkerboard_mipmap_bilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/moire_checkerboard_mipmap_bilinear.png) | ![Place moire_checkerboard_mipmap_bilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/moire_checkerboard_mipmap_bilinear.png) |
| unit_checkerboard_trilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/unit_checkerboard_trilinear.png) | ![Place unit_checkerboard_trilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/unit_checkerboard_trilinear.png) |
| sphere_checkerboard_trilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/sphere_checkerboard_trilinear.png) | ![Place rsphere_checkerboard_trilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/sphere_checkerboard_trilinear.png) |
| cone_checkerboard_trilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/cone_checkerboard_trilinear.png) | ![Place cone_checkerboard_trilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/cone_checkerboard_trilinear.png) |
| cylinder_checkerboard_trilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/cylinder_checkerboard_trilinear.png) | ![Place cylinder_checkerboard_trilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/cylinder_checkerboard_trilinear.png) |
| moire_checkerboard_trilinear.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/antialias/required_outputs/moire_checkerboard_trilinear.png) | ![Place moire_checkerboard_trilinear.png in student_outputs/antialias/required folder](student_outputs/antialias/required/moire_checkerboard_trilinear.png) |



## Design Choices
### Effectiveness 
In src/utils/sceneparser.h, I stored the inverse CTM for each shape.

In src/camera/camera.h, use variable `m_inverseViewMatrix` to cache inverse view matrix. Then in src/camera/camera.cpp, there is a getInverseViewMatrix() function. Thus, in ray generation, we could use the cached camara inverse view matrix. And if the camara position changed, variable `m_inverseViewMatrixValid` will be set to false.

### Downsampling
The code is in src/utils/mipmap.cpp.

I implemented downsampling using a two-pass separable filtering approach. The algorithm first performs a horizontal filtering pass along the X direction and then a vertical filtering pass along the Y direction. The filter I used is triangle filter. 

## Collaboration/References

## Known Bugs

I didn't have enough time to finish mipmap level determination and trilinear filtering. My implementation of `sampleTexture(const SceneFileMap& textureMap, const glm::vec2& uv, const std::pair<float, RenderShapeData>& intersection, const Ray& ray)` in texture.cpp is buggy.

## Extra Credit

### Parallelism
Add a new parameter parallel-level in .ini files settings section. Level1: openMP, Level2: QtConcurrent, Level3: QThreadPool.

#### QtConcurrent & QFuture
Treat each pixel of the entire image as an independent task and execute it in parallel using multiple threads. For each element in PixelTask list, apply the given lambda function and executed automatically in parallel. future will block the main thread until all pixels have been rendered. Finally, copy results back to imageData.

#### QThreadPool 
Define PixelRenderTask class (inherited from QRunnable, which provides run() as the entry point for task execution.) in raytracer_render.cpp. As it only used in render function, it's not defined in the header file to encapsulate implementation details and keep header files concise.

Use global thread pool by calling `QThreadPool::globalInstance()`, the number of threads is equal to the number of CPU cores. 

#### Results
However, the 3 levels give similar performances.

Render scenefiles/antialias/optional/mirror_primitives.json:

DEBUG: Parallelism enabled (OpenMP)
DEBUG: OpenMP parallel rendering completed
Render time: 10318.7 ms (10.3187 s)

DEBUG: Parallelism enabled (QtConcurrent)
DEBUG: QtConcurrent parallel rendering completed
Render time: 10468.3 ms (10.4683 s)

DEBUG: Parallelism enabled (QThreadPool with QRunnable)
DEBUG: QThreadPool parallel rendering completed
Render time: 10759 ms (10.759 s)


### Adaptive supersampling
In raytracer_render.cpp, I implemented adaptive supersampling in renderPixel(). To enable it, in .ini file's settings, set `super-sampler-pattern = "adaptive"`.

The result is:

![Place shadow_test_4spp_adaptive.png in student_outputs/antialias/required folder](student_outputs/antialias/required/shadow_test_4spp_adaptive.png)