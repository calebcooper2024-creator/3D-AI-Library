# 06 - Optional Improvements Not Included In This Pass

These improvements may be useful later, but do not implement them in the current pass unless explicitly approved.

## 1. Convert bookshelf from 3 duplicated loops to modulo-positioned books

Current likely strategy:

```txt
20 logical books x 3 rendered copies = 60 rendered book structures
```

Future target:

```txt
20 logical books = 20 rendered book structures
Infinite feeling preserved by circular positioning math
```

Why not in this pass:

1. It touches the core shelf renderer.
2. It may affect book position, z-index, hover behavior, opening animation, and the infinite loop illusion.
3. It is higher-risk for visual regression.

## 2. Low-tier visual effect reduction

Potential low-tier changes:

1. Disable huge blur overlays over active video.
2. Disable fixed full-screen `mix-blend-mode` texture overlays.
3. Reduce shadow density.
4. Disable marquee animation.

Why not in this pass:

1. These can visibly alter the app.
2. User requested fixes that do not change appearance or function per se.
3. Video governance and scroll-loop hygiene should be tested first.

## 3. Mobile 2D shelf

This is recommended as a product architecture improvement, but it is not included here.

Why not in this pass:

1. It adds a new visible experience.
2. It changes function on mobile.
3. It should be its own implementation pass.

## 4. Optimized video derivatives

The user said poster-only fallback is not an option and wants to keep 4K video playback.

Future option:

Keep 4K available, but serve 720p or 1080p by default on weak devices.

Why not in this pass:

1. It changes asset policy.
2. It requires media generation and data updates.
3. It should be approved separately.
