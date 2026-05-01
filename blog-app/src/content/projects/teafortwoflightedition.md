---
title: "Tea for Two - Flight Edition"
slug: "teafortwoflightedition"
meta: "Realtime Graphics · OpenGL · Stylized Rendering"
date: "2026-05-01"
summary: "A graphics final project implementing real-time flight through stylized scenes with procedural terrain, portal rendering, and post-processing."
---

# Tea for Two - Flight Edition

## Tech Stack
C++17 · OpenGL · GLSL · Qt · CMake · Perlin Noise · Shadow Mapping · Post-Processing

## Context
Course graphics project focused on a **real-time first-person flight experience** across multiple stylized scenes (including a cartoon-space environment).  
The project explores a modern graphics pipeline with modular rendering passes and shader-driven visual effects, while keeping camera movement and interaction responsive through mouse + keyboard controls.

## Summary

This project implements a modular rendering architecture: geometry rendering, shadow pass, and a chained post-processing stage. Terrain and water are procedurally shaped with tileable Perlin noise, while shadows are produced via light-space depth maps with PCF filtering. Visual style is built through composable full-screen effects (toon shading, edge outlines, color grading, fog, and motion blur), and extended with stencil-masked portals that render secondary views in real time.

## Demo Video

<div style="position: relative; width: 100%; max-width: 900px; margin: 1.5rem auto; padding-top: 56.25%;">
  <iframe
    src="https://player.bilibili.com/player.html?bvid=BV1fU9BBrEga&page=1&high_quality=1&danmaku=0"
    title="Tea for Two - Flight Edition"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0; border-radius: 16px;"
    allowfullscreen="true"
  ></iframe>
</div>

Project repository: [GitHub - Ahhhh2016/tea-for-two-flight-edition](https://github.com/Ahhhh2016/tea-for-two-flight-edition)

## Features

### Core Rendering Pipeline
- **Modular multi-pass design** — geometry → shadow map generation → post-processing chain
- **Shader-centric implementation** — effect tuning is parameterized in GLSL for rapid visual iteration
- **Deterministic effect ordering** — single-FBO / ping-pong style composition for predictable output

### Procedural Scene Generation
- **Perlin-noise terrain/water shaping** — tileable noise reduces visible seams and adds natural variation in height/normal detail

### Lighting and Shadows
- **Shadow mapping with PCF** — depth-based shadows sampled in light space
- **Bias tuning strategy** — balances shadow acne and peter-panning artifacts under different viewing angles

### Stylized Post-Processing
- **Toon and edge-outline filters** for non-photorealistic rendering
- **Color grading** for scene mood control
- **Depth-aware fog** (exponential / height-style behavior in post)
- **Screen-space motion blur** using velocity from previous-frame transforms

### Portal Rendering
- **Stencil-masked portal views** — renders view-to-view transitions in real time
- **Recursion cap** by design to avoid unstable feedback loops and excessive cost

### Interactivity
- **First-person flight controls** — mouse + keyboard jointly control camera direction and velocity for real-time navigation

### Performance / Engineering Notes
- **Pass decoupling** keeps the renderer extensible and easier to debug
- **Post stack scalability** allows adding/removing effects with minimal pipeline changes

## Known Limitations

| Area | Notes |
| --- | --- |
| Shadow quality | Minor acne / peter-panning can appear at grazing angles depending on bias |
| Portal boundaries | Slight edge bleeding may appear; recursion intentionally limited |
| Motion blur | Ghosting can occur during very fast camera rotation; may smear UI overlays |
| Transparency | Sorting artifacts may appear with fog and certain filters |
| Performance | High resolution + heavy blur can reduce FPS on integrated GPUs |
| Cross-platform variance | Driver precision differences (notably macOS OpenGL) may cause subtle visual changes |

## Results

Demonstrations include procedural terrain/water scenes, stylized cartoon-space flight, portal view transitions, and chained post effects running in real time.

![Procedural terrain and water scene](/images/projects/tea-for-two/terrain_water.gif)

![Stylized cartoon-space flight](/images/projects/tea-for-two/cartoon_space.gif)

![Portal rendering with stencil masking](/images/projects/tea-for-two/portal.gif)

![Post-processing stack: toon + edge + fog + motion blur](/images/projects/tea-for-two/post_pipeline.gif)

## References

- Project source code: https://github.com/Ahhhh2016/tea-for-two-flight-edition
- Terrain generation inspiration: https://www.youtube.com/watch?v=BFld4EBO2RE
- Water scene reference: https://www.shadertoy.com/view/MdXyzX
- Stylized portal shader reference: https://www.shadertoy.com/view/fddSWj
- Moebius-style post-processing notes: https://blog.maximeheckel.com/posts/moebius-style-post-processing/