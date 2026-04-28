# Physically-Based Monte Carlo Path Tracer
## Tech Stack
C++17 · Eigen · Qt 6 · OpenMP · BVH · tinyobjloader

## Context
Course project for Brown University CSCI 2240 Interactive Computer Graphics. Built from scratch in C++ with Eigen and Qt, the project implements an **unbiased Monte Carlo path tracer** that numerically solves the rendering equation to produce photorealistic images featuring soft shadows, color bleeding, caustics, and refraction.

## Summary

The renderer recursively traces rays from the camera into the scene. At each surface intersection it performs **importance sampling** over both the BRDF and area light sources, applies **Next Event Estimation** (event splitting) to separate direct and indirect lighting, and uses **Russian Roulette** with an adaptive continuation probability to keep paths finite while preserving an unbiased estimate. HDR radiance values are finally tone-mapped to LDR via a luminance-preserving Reinhard operator with sRGB gamma correction.

## Features

### Rendering Algorithm
- **Monte Carlo path tracing** solving the rendering equation
- **Event Splitting (NEE)** — separately accumulates direct and indirect lighting at every bounce; a `count_emitted` flag prevents double-counting emissive surfaces along specular / refractive paths
- **Adaptive Russian Roulette** — continuation probability driven by the max channel of the BRDF, so strong reflections survive longer and weak ones terminate early; division by `pdf_rr` keeps the estimator unbiased

### Four BRDFs
| Material | Implementation |
| --- | --- |
| Ideal Diffuse | Lambertian $ρ / π$ |
| Glossy Specular | Normalized Phong lobe with $(n+2)/(2π)$ factor; energy-conserving when $kd + ks > 1$ |
| Ideal Mirror | Deterministic reflection (no PDF division) |
| Dielectric Refraction | Snell's law + **Schlick's approximation** for Fresnel; RR chooses between reflection and refraction |

### Lighting & Sampling
- **Soft shadows** from area lights via uniform barycentric sampling on emissive triangles
- **Cosine-weighted hemisphere sampling** for diffuse importance sampling
- **Phong-lobe importance sampling** around the reflection direction $R$, dramatically reducing variance on glossy surfaces

![Diffuse surfaces: uniform vs cosine-weighted hemisphere sampling at equal sample count](/images/projects/path-tracer/comparison_cosinesampling.jpg)

![Glossy surfaces: uniform hemisphere vs Phong-lobe importance sampling](/images/projects/path-tracer/comparison_phongsampling.jpg)

### Tone Mapping
- Luminance-based **Reinhard** (preserves hue, no per-channel drift) followed by **sRGB gamma correction (γ = 2.2)**

### Performance
- **OpenMP** `parallel for` with dynamic row-level scheduling
- Custom build configuration to enable `libomp` on Apple Silicon
- **BVH** acceleration structure for fast ray-scene intersection

## Results

Rendered scenes include the full Cornell Box (full lighting, direct-only, low-probability RR), mirror sphere, glossy reflection, and dielectric refraction — closely matching Mitsuba reference renders.

![Cornell Box — full global illumination](/images/projects/path-tracer/cornell_box_full_lighting.png?w=420)

![Cornell Box — full lighting with a low Russian Roulette continuation probability (more variance, fewer surviving paths)](/images/projects/path-tracer/cornell_box_full_lighting_low_probability.png?w=420)

![Mirror sphere — perfect specular reflection](/images/projects/path-tracer/mirror.png?w=420)

![Glossy reflection rendered with Phong-lobe importance sampling](/images/projects/path-tracer/glossy.png?w=420)

![Dielectric refraction with Schlick's Fresnel approximation](/images/projects/path-tracer/refraction.png?w=420)
