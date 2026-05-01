---
title: "Monster Mash Reproduction"
slug: "monster-mash"
meta: "Sketch-based Modeling · ARAP · Deformation · Animation"
date: "2026-05-01"
summary: "A reproduction of Google Research Monster Mash: sketch in 2D, inflate into 3D, and preview interactive deformation."
---

# Monster Mash Reproduction

This project is a reproduction study of Google Research's Monster Mash pipeline for casual sketch-to-3D modeling and animation.

Reference: [Monster Mash: A Sketch-Based Tool for Casual 3D Modeling and Animation](https://research.google/blog/monster-mash-a-sketch-based-tool-for-casual-3d-modeling-and-animation/).


Project repository: https://github.com/Ahhhh2016/happy-dancing-trees

## Features

- **2D canvas** with stroke interpolation, closed-region detection, overlap and connectivity handling, and optional **template image** load with faded overlay for tracing.
- **Constrained triangulation** (CDT / Triangle) per region and **host–attachment** splitting along merging boundaries (`Bp`).
- **Front/back mesh parts** with **Poisson inflation** (cotangent Laplacian, mass-weighted RHS, Dirichlet heights on contours, semi-elliptical thickness shaping).
- **Seam welding** for stitched multi-region meshes.
- **OBJ export** with **UV coordinates** derived from canvas coordinates; **texture export** aligned to mesh sampling.
- **OpenGL 3.3** mesh viewer (GLEW + Qt `QOpenGLWidget`): load OBJ, shaded rendering, orbit / zoom style interaction.


## Workflow

### 1) Draw on the 2D canvas

Load a template image, then draw closed regions that define the main parts.

![2D sketch canvas with traced regions](/images/projects/monster-mash/image.png)

### 2) Build and preview the 3D model

After region construction and stitching, the generated mesh can be previewed directly.

![3D preview in application](/images/projects/monster-mash/image-1.png)

## Intermediate Results

Triangulated mesh quality and topology before full inflation:

![Triangulation and mesh connectivity](/images/projects/monster-mash/screenshot-01.png)

Inflated surface result after reconstruction:

![Inflated monster-mash surface](/images/projects/monster-mash/screenshot-02.png)

## Third-Party Libraries

- **Qt 6** (Core, Widgets, Gui, OpenGL, OpenGLWidgets)  
- **Eigen**  
- **GLEW**  
- **libigl** (triangulation, Poisson / `min_quad_with_fixed`, etc.)  
- **Triangle** (via libigl, planar CDT)  
- **tinyobjloader** (header-only OBJ loading in the viewer)

## Notes

- This page documents a **reproduction-oriented study** of the method and interaction flow.
- Credit for the original system and design belongs to the Monster Mash authors at Google Research and collaborators.

## References

- Google Research Blog: https://research.google/blog/monster-mash-a-sketch-based-tool-for-casual-3d-modeling-and-animation/
