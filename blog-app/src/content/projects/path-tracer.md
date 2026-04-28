## Path (final submission)

Please fill this out and submit your work to Gradescope by the deadline.

### Output Comparison

Run the program with the specified `.ini` config file to compare your output against the reference images. The program should automatically save to the correct path for the images to appear in the table below.

If you are not using the Qt framework, you may also produce your outputs otherwise so long as you place them in the correct directories as specified in the table. In this case, please also describe how your code can be run to reproduce your outputs

> Qt Creator users: If your program can't find certain files or you aren't seeing your output images appear, make sure to:<br/>
>
> 1. Set your working directory to the project directory
> 2. Set the command-line argument in Qt Creator to `template_inis/final/<ini_file_name>.ini`

Note that your outputs do **not** need to exactly match the reference outputs. There are several factors that may result in minor differences, such as your choice of tone mapping and randomness.

Please do not attempt to duplicate the given reference images; we have tools to detect this.

|         `.ini` File To Produce Output         |                 Expected Output (No Gamma)                  |                                   Expected Output                                    |                                                                         Your Output                                                                         |
| :-------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         cornell_box_full_lighting.ini         | ![](example-scenes/ground_truth/final/cornell_box_full_lighting_wo_gamma.png)         | ![](example-scenes/ground_truth/final/cornell_box_full_lighting.png)         | ![Place cornell_box_full_lighting.png in student_outputs/final folder](student_outputs/final/cornell_box_full_lighting.png)                 |
|     cornell_box_direct_lighting_only.ini      | ![](example-scenes/ground_truth/final/cornell_box_direct_lighting_only_wo_gamma.png)  | ![](example-scenes/ground_truth/final/cornell_box_direct_lighting_only.png)  | ![Place cornell_box_direct_lighting_only.png in student_outputs/final folder](student_outputs/final/cornell_box_direct_lighting_only.png)          |
| cornell_box_full_lighting_low_probability.ini | ![](example-scenes/ground_truth/final/cornell_box_full_lighting_low_probability_wo_gamma.png) | ![](example-scenes/ground_truth/final/cornell_box_full_lighting_low_probability.png) | ![Place cornell_box_full_lighting_low_probability.png in student_outputs/final folder](student_outputs/final/cornell_box_full_lighting_low_probability.png) |
|                  mirror.ini                   |                  ![](example-scenes/ground_truth/final/mirror_wo_gamma.png)                   |                  ![](example-scenes/ground_truth/final/mirror.png)                   |                                    ![Place mirror.png in student_outputs/final folder](student_outputs/final/mirror.png)                                    |
|                  glossy.ini                   |                  ![](example-scenes/ground_truth/final/glossy_wo_gamma.png)                   |                  ![](example-scenes/ground_truth/final/glossy.png)                   |                                    ![Place glossy.png in student_outputs/final folder](student_outputs/final/glossy.png)                                    |
|                refraction.ini                 |                ![](example-scenes/ground_truth/final/refraction_wo_gamma.png)                 |                ![](example-scenes/ground_truth/final/refraction.png)                 |                                ![Place refraction.png in student_outputs/final folder](student_outputs/final/refraction.png)                                |


> Note: The reference images above were produced using the [Extended Reinhard](https://64.github.io/tonemapping/#extended-reinhard) tone mapping function with minor gamma correction. You may choose to use another mapping function or omit gamma correction.

### Implementation Locations

Please link to the lines (in GitHub) where the implementation of these features start:

- [Diffuse Reflection](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/brdf.cpp#L57)
- [Glossy Reflection](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/brdf.cpp#L62)
- [Mirror Reflection](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L225)
- [Refraction (with Fresnel refletion)](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L235)
- [Soft Shadows](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L322)
- [Illumination](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L107)
- [Russian Roulette path termination](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L116)
- [Event Splitting](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L98)
- [Tone Mapping](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L287)
- Any extra features
- [Lambertian Sampling](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L142)
- [Phong Sampling](https://github.com/brown-cs-224/path-Ahhhh2016-1/blob/6dcdc2da38f3efd6a7edc6a6fd73f89eca63d3a0/pathtracer.cpp#L166)

### Design Choices

Please list all the features your path tracer implements.
#### Diffuse Reflection

#### Lighting
In brdf.cpp, I implemented PhongBRDF method to combine diffuseBRDF and specularBRDF. For energy conservation, if kd + ks > 1, do normalize.

#### Glossy Reflection
To get closer output to the reference image, I did specularBRDF only for materials with specularity.

#### Mirror Reflection
For mirror reflection, do not random sampling and do not use PDF, use deterministic reflection direction.

#### Refraction
For transparent material, use Snell's Law to determine the direction of refraction, then use Schlick's approximation to calculate reflect probability and use Russian roulette to randomly choose between with reflection and refraction. 

#### Soft Shadows
In function `randomPointOnTriangle()`, use barycentric coordinates to uniformly sample on triangle.
In `calculateDirectLighting()`, loop over all lights and uniformly samples and averages the surface of the light source to naturally produce soft shadows.

#### Russian Roulette path termination
Use RR to control the path length and divide by pdf_rr to keep unbiased when surviving.
The probability of renewal is adaptive using the current BRDF strength (max channel), so that strong reflections are more likely to continue and weak reflections terminate more quickly to save computation.

#### Event Splitting

In `traceRay()`, for every traceRay hit:
Add a copy of Direct Lighting first: `L += calculateDirectLighting(...)`
then take an indirect bounce: `L += traceRay(newRay, ...) ...`

Use variable `count_emitted` to control whether or not the current path allows emission to be added directly when hitting a light source, thus avoiding double-counting of source contributions when using NEE, while ensuring that specular/refractive paths still see the source correctly.

#### Tone Mapping
I implemented Reinhard + luminance-based scaling to keep the hue from drifting, and then do Gamma correction to sRGB.

### Extra Features
Briefly explain your implementation of any extra features, provide output images, and describe what each image demonstrates.

#### Parallelism
I use OpenMP to parallelize the per-pixel computation in traceScene(), distributing pixel sampling across multiple CPU threads to accelerate rendering performance. To achieve that, in CMakeLists.txt, I added the following code to include openMP for Macos
```
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
```

#### Lambertian Sampling
In pathtracer.cpp line 142, I implemented cosine-weighted sample hemisphere (commented out now).
The result images are in student_outputs/extra folder. 
Uniform sampling:

![](student_outputs/extra/sphere_uniform.png)

Lambertian Sampling:

![](student_outputs/extra/sphere_lambertian.png)

The comparison is as follows:

![](student_outputs/extra/comparison_cosinesampling.jpg)

#### Phong Sampling
In pathtracer.cpp line 166, I implemented phong sample hemisphere (commented out now). Using phong sampling for glossy focuses the samples in the high contribution direction (around R) and significantly reduces the high optical noise.

The result images are in student_outputs/extra folder. 

Uniform sampling:

![](student_outputs/extra/glossy_uniform.png)

Phong sampling:
![](student_outputs/extra/glossy_phongsampling.png)

The comparison is as follows:

![](student_outputs/extra/comparison_phongsampling.jpg)


### Collaboration/References

### Known Bugs
