# Project 3: Illuminate

Please fill this out for Illuminate only. The project handout can be found [here](https://cs1230.graphics/projects/ray/2).

## Output Comparison
Run the program with the specified `.ini` file to compare your output (it should automatically save to the correct path).
> If your program can't find certain files or you aren't seeing your output images appear, make sure to:<br/>
> 1. Set your working directory to the project directory
> 2. Set the command-line argument in Qt Creator to `template_inis/illuminate/<ini_file_name>.ini`
> 3. Clone the `scenefiles` submodule. If you forgot to do this when initially cloning this repository, run `git submodule update --init --recursive` in the project directory

> Note: once all images are filled in, the images will be the same size in the expected and student outputs.

| File/Method To Produce Output | Expected Output | Your Output |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | 
| point_light_1.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/point_light/point_light_1.png) | ![Place point_light_1.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/point_light_1.png) |
| point_light_2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/point_light/point_light_2.png) | ![Place point_light_2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/point_light_2.png) |
| spot_light_1.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/spot_light/spot_light_1.png) | ![Place spot_light_1.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/spot_light_1.png) |
| spot_light_2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/spot_light/spot_light_2.png) | ![Place spot_light_2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/spot_light_2.png) |
| simple_shadow.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/shadow/simple_shadow.png) | ![Place simple_shadow.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/simple_shadow.png) |
| shadow_test.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/shadow/shadow_test.png) | ![Place shadow_test.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/shadow_test.png) |
| shadow_special_case.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/shadow/shadow_special_case.png) | ![Place shadow_special_case.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/shadow_special_case.png) |
| reflections_basic.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/reflection/reflections_basic.png) | ![Place reflections_basic.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/reflections_basic.png) |
| reflections_complex.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/reflection/reflections_complex.png) | ![Place reflections_complex.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/reflections_complex.png) |
| texture_cone.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cone.png) | ![Place texture_cone.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cone.png) |
| texture_cone2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cone2.png) | ![Place texture_cone2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cone2.png) |
| texture_cube.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cube.png) | ![Place texture_cube.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cube.png) |
| texture_cube2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cube2.png) | ![Place texture_cube2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cube2.png) |
| texture_cyl.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cyl.png) | ![Place texture_cyl.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cyl.png) |
| texture_cyl2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_cyl2.png) | ![Place texture_cyl2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_cyl2.png) |
| texture_sphere.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_sphere.png) | ![Place texture_sphere.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_sphere.png) |
| texture_sphere2.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/illuminate/required_outputs/texture_tests/texture_sphere2.png) | ![Place texture_sphere2.png in student_outputs/illuminate/required folder](student_outputs/illuminate/required/texture_sphere2.png) |


## Design Choices
### isShadow in shadow.cpp
This function determines whether a point on a surface is in shadow by tracing a ray toward the light source and checking if any object blocks it.
1. For different light types, set light direction and max distance differently.
2. For spot light, calculate the angle to early exit.
3. Then generate a shadow ray, and iterate through all primitives to check if any object blocks the shadow ray.
4. Add an id for each primitive to avoid self shadow.

### shadePixel in raytracer_render.cpp
The main function to determine the final color of a pixel.
There are 5 parts in this function:
1. Initialization and find the intersection point and view direction.
2. Calculate the textureColor.
3. If the intersection point is not in shadow, do Phong lighting to get the light color from all lighting.
4. If reflection is enabled and the material is reflective, generate a reflection ray and check if it intersects with any object. If so, call shadePixel recursively until the max depth.
5. Do the same for refraction.
6. Add the accumulative color, cast to RGBA and return.

### phong in raytracer_shading.cpp
1. For different light types, calculate attenuation accordingly.
2. Calculate the diffuse and specular components (texture color is blended here).
3. Composite lighting contribution from those parts.

### sampleTexture in texture.cpp
1. First in shadePixel, calculate UV coordinates according to different primitive types. Then call sampleTexture to get the texture color.
2. Get or load the texture image (including cache) according to textureMap.
3. Handle repeated textures and wrap u,v to the [0, 1) range.
4. Use nearest or bilinear texture filter type: If it is nearest, directly take the closest texel color; If it is bilinear, take the colors of the surrounding 4 pixels and perform bilinear interpolation based on the distance weight.


## Collaboration/References
For Bilinear texture sampling, I read this post: https://www.reddit.com/r/GraphicsProgramming/comments/wn9aan/can_someone_explain_bilinear_filtering_algorithm/

## Known Bugs
The refraction has bugs. The distortion of the spheres is different from standard output. For refract1.json, setting "transparentCoeff" to 0.7 can get an output closer to standard; otherwise, the transparency of the spheres is lower.

transparentCoeff: 0.7
<img width="1024" height="768" alt="image" src="https://github.com/user-attachments/assets/750ac5e2-ff80-4aac-b4b1-7001eb6790e3" />

transparentCoeff: 0.5
<img width="1024" height="768" alt="image" src="https://github.com/user-attachments/assets/ca61de26-9f05-409b-8715-7898985bca51" />

Standard output:
<img width="1024" height="768" alt="image" src="https://github.com/user-attachments/assets/d0d3b059-04b7-4bd6-9a6d-c7503300f068" />

refract2:
<img width="1024" height="768" alt="image" src="https://github.com/user-attachments/assets/1dedefd7-72d1-4ac7-92aa-b1cee4e8b6aa" />

Standard output:
<img width="1024" height="768" alt="image" src="https://github.com/user-attachments/assets/0bf22d8d-9f95-4cb8-951e-4bf1eb4093ce" />


## Extra Credit
### Refraction
Code related to refraction is in shadePixel in raytracer_render.cpp.

### Bilinear Texture Sampling
Related code is in sampleTextureBilinear in texture.cpp.

You can change filter type in .ini file by adding `texture-filter = nearest` or `texture-filter = bilinear`.

Nearest texture filter showed in zoomed-in texture_cube.png:
<img width="1008" height="756" alt="image" src="https://github.com/user-attachments/assets/49ec61d1-7e43-4f2f-90f2-fb4aecdb43c9" />

Bilinear texture filter showed in zoomed-in texture_cube.png:
<img width="983" height="740" alt="image" src="https://github.com/user-attachments/assets/25cbb991-6c74-449e-914a-261fd56923ad" />

### Acceleration Data Structure
#### BVH
in .ini file, add bvh = true to enable BVH.
In raytracer_aabb.cpp, calculate the cubic axis aligned bounding boxes for each primitive type, and check whether the ray intersects with the AABox.
In raytracer_bvh.cpp, use the top-down approach to recursively build the BVH. The split heuristic I used is object area heuristic. First, choose the longest axis of the bounding box as the split axis. Then, sort the primitives by the center point of this axis and take the median, and use the median to divide the primitives into two groups. Recursively construct left and right subtrees.

Without bvh, it takes 1577.78 ms to render primitive_salad_1.png.
```
Finished reading scenefiles/intersect/optional/primitive_salad_1.json
Parallelism disabled
DEBUG: render function called
DEBUG: width=1024, height=768
Render time: 1577.78 ms (1.57778 s)
Saved rendered image to "student_outputs/intersect/extra_credit/primitive_salad_1.png"
```

With BVH, it takes 469.705 ms.
```
Finished reading scenefiles/intersect/optional/primitive_salad_1.json
Parallelism disabled
DEBUG: render function called
DEBUG: width=1024, height=768
Building BVH...
BVH built successfully
BVH Performance Statistics:
  Total rays cast: 786432
  Intersection tests: 6130413
  BVH node tests: 6351016
  Average intersections per ray: 7.80
  Average BVH nodes per ray: 8.08
Render time: 469.705 ms (0.469705 s)
Saved rendered image to "student_outputs/intersect/extra_credit/primitive_salad_1.png"
```

For primitive_salad_2.png, the render time reduces from 36.8562 s to 5.21879 s.
```
Finished reading scenefiles/intersect/optional/primitive_salad_2.json
Parallelism disabled
DEBUG: render function called
DEBUG: width=1024, height=768
Render time: 36856.2 ms (36.8562 s)
Saved rendered image to "student_outputs/intersect/extra_credit/primitive_salad_2.png"
```
```
Finished reading scenefiles/intersect/optional/primitive_salad_2.json
Parallelism disabled
DEBUG: render function called
DEBUG: width=1024, height=768
Building BVH...
BVH built successfully
BVH Performance Statistics:
  Total rays cast: 786432
  Intersection tests: 98773719
  BVH node tests: 86756967
  Average intersections per ray: 125.60
  Average BVH nodes per ray: 110.32
Render time: 5218.79 ms (5.21879 s)
Saved rendered image to "student_outputs/intersect/extra_credit/primitive_salad_2.png"
```
