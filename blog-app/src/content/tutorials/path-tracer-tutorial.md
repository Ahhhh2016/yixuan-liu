---
title: "Path Tracer Tutorial"
slug: "path-tracer-tutorial"
meta: "Rendering · BRDF · Global Illumination"
date: "2026-04-26"
summary: "Build a minimal but extensible path tracer from camera rays to indirect lighting."
---

## 1. Setup the Camera

Start from ray generation in camera space and transform into world space. Keep the camera model simple first, then add depth of field later.

## 2. Material and BRDF Basics

Implement diffuse and specular BRDF branches. Make every sample path produce a throughput multiplier so energy tracking remains clear.

## 3. Sampling and Accumulation

Use random hemisphere sampling and progressive accumulation. Render many noisy frames and blend to convergence.

## 4. Next Steps

Add MIS and denoising as optional extensions once the baseline integrator is stable.
