## Project 2: Intersect

Please fill this out for Intersect only. The project handout can be found [here](https://cs1230.graphics/projects/ray/1).

### Output Comparison
Run the program with the specified `.ini` file to compare your output (it should automatically save to the correct path).
> If your program can't find certain files or you aren't seeing your output images appear, make sure to:<br/>
> 1. Set your working directory to the project directory
> 2. Set the command-line argument in Qt Creator to `template_inis/intersect/<ini_file_name>.ini`
> 3. Clone the `scenefiles` submodule. If you forgot to do this when initially cloning this repository, run `git submodule update --init --recursive` in the project directory

> Note: once all images are filled in, the images will be the same size in the expected and student outputs.

| File/Method To Produce Output | Expected Output | Your Output |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: |
| unit_cone.ini |  ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cone.png) | ![Place unit_cone.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cone.png) |
| unit_cone_cap.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cone_cap.png) | ![Place unit_cone_cap.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cone_cap.png) |
| unit_cone_top.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cone_top.png) | ![Place unit_cone_top.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cone_top.png) |
| unit_cube.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cube.png) | ![Place unit_cube.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cube.png) |
| unit_cylinder.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cylinder.png) | ![Place unit_cylinder.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cylinder.png) |
| unit_cylinder_bottom.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_cylinder_bottom.png) | ![Place unit_cylinder.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_cylinder_bottom.png) |
| unit_sphere.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/unit_sphere.png) | ![Place unit_sphere.png in student_outputs/intersect/required folder](student_outputs/intersect/required/unit_sphere.png) |
| parse_matrix.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/parse_matrix.png) | ![Place parse_matrix.png in student_outputs/intersect/required folder](student_outputs/intersect/required/parse_matrix.png) |
| ambient_total.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/ambient_total.png) | ![Place ambient_total.png in student_outputs/intersect/required folder](student_outputs/intersect/required/ambient_total.png) |
| diffuse_total.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/diffuse_total.png) | ![Place diffuse_total.png in student_outputs/intersect/required folder](student_outputs/intersect/required/diffuse_total.png) |
| specular_total.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/specular_total.png) | ![Place specular_total.png in student_outputs/intersect/required folder](student_outputs/intersect/required/specular_total.png) |
| phong_total.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/phong_total.png) | ![Place phong_total.png in student_outputs/intersect/required folder](student_outputs/intersect/required/phong_total.png) |
| directional_light_1.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/directional_light_1.png) | ![Place directional_light_1.png in student_outputs/intersect/required folder](student_outputs/intersect/required/directional_light_1.png) |
| directional_light_2.ini | ![](https://raw.githubusercontent.com/BrownCSCI1230/scenefiles/main/intersect/required_outputs/directional_light_2.png) | ![Place directional_light_2.png in student_outputs/intersect/required folder](student_outputs/intersect/required/directional_light_2.png) |

### Design Choices

### Collaboration/References
For extra credit, the parallel intersection in raytracer_intersections_simd.cpp has some bugs, which make the floor (transformed cube) not able to render.

### Known Bugs

### Extra Credit

#### Parallelization
##### 1: OpenMP 
I add omp parallel in function render() in raytracer_render.cpp. I use schedule(dynamic) to realize dynamic scheduling and load balancing, and collapse(2) to flatten the 2D loop space into 1D to have better parallelism.

```cpp
if (m_config.enableParallelism) {
    #pragma omp parallel for collapse(2) schedule(dynamic) 
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            ...
        }
    }
}

```
To enable this, run `brew install libomp`, and in CMakeLists.txt, I add:

```cpp
# Find OpenMP
set(OpenMP_CXX_FLAGS "-Xpreprocessor -fopenmp -I/opt/homebrew/opt/libomp/include")
set(OpenMP_C_FLAGS   "-Xpreprocessor -fopenmp -I/opt/homebrew/opt/libomp/include")
set(OpenMP_CXX_LIB_NAMES "omp")
set(OpenMP_C_LIB_NAMES "omp")
set(OpenMP_omp_LIBRARY "/opt/homebrew/opt/libomp/lib/libomp.dylib")

find_package(OpenMP REQUIRED)

// ...
// other code 
// ...

target_link_libraries(${PROJECT_NAME} PRIVATE
    Qt::Concurrent
    Qt::Core
    Qt::Gui
    Qt::Xml
    OpenMP::OpenMP_CXX # Add OpenMP
)
```
You might need to change the path to libomp to your own.

Implementing openMP brings about 10x performance improvement.

Before:
```
Finished reading scenefiles/intersect/required/directional_light_2.json
Render time: 237.89 ms (0.23789 s)
Saved rendered image to "student_outputs/intersect/required/directional_light_2.png"
```
After:
```
Finished reading scenefiles/intersect/required/directional_light_2.json
OpenMP enabled, max threads: 10
Render time: 37.2792 ms (0.0372792 s)
Saved rendered image to "student_outputs/intersect/required/directional_light_2.png"
```

##### 2: SIMD

In CMakeLists.txt, add 
```cpp
# ARM NEON SIMD optimize compilation options
if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
    # Detect CPU architecture and SIMD support
    include(CheckCXXCompilerFlag)
    
    # Detect whether it is ARM architecture
    if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm|ARM|aarch64|AARCH64")
        message(STATUS "ARM architecture")
        
        # Try to enable NEON
        check_cxx_compiler_flag("-mfpu=neon" COMPILER_SUPPORTS_NEON)
        if(COMPILER_SUPPORTS_NEON)
            set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -mfpu=neon")
            add_definitions(-DGLM_FORCE_NEON)
            message(STATUS "Enalbe ARM NEON Optimization")
        endif()
        
        # For AArch64，NEON enable by default
        if(CMAKE_SYSTEM_PROCESSOR MATCHES "aarch64|AARCH64")
            add_definitions(-DGLM_FORCE_NEON)
            message(STATUS "AArch64，NEON enable by default")
        endif()
        
        # ARM Optimize Options
        set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -ffast-math -funroll-loops")
        set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -march=native -mtune=native")
    endif()

elseif(MSVC)
    # MSVC Optimize Options
    if(CMAKE_SYSTEM_PROCESSOR MATCHES "arm|ARM|aarch64|AARCH64")
        message(STATUS "MSVC ARM architecture, enable NEON")
        add_definitions(-DGLM_FORCE_NEON)
    else()
        set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /O2 /arch:AVX2")
        add_definitions(-DGLM_FORCE_AVX2)
        message(STATUS "Enable MSVC AVX2 Optimization")
    endif()
endif()
```

Then, I implement src/raytracer/raytracer_shading_simd.cpp, src/raytracer/raytracer_shading_soa_simd.cpp and src/raytracer/raytracer_intersections_simd.cpp.
This brings some performance improvement:
```
Finished reading scenefiles/intersect/required/directional_light_2.json
OpenMP enabled, max threads: 10
Batch processing using SIMD, batch size: 64
Render time: 17.3693 ms (0.0173692 s)
Saved rendered image to "student_outputs/intersect/required/directional_light_2.png"
```

However, the parallel intersection in raytracer_intersections_simd.cpp has some bugs, which make the floor (transformed cube) not able to render, but the other primitives looks correct. And the SIMD accelerated shading works fine.

#### Acceleration data structure
I'll implement in Illuminate.
