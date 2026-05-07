# Findings From Performance Snapshot

## Current state

The project is a React/Vite portfolio with a premium 3D bookshelf and cinematic project detail pages.

The uploaded context shows these major performance pressure points:

1. `Bookshelf.tsx` renders three duplicated shelf loops.
2. The shelf uses CSS 3D book structures with multiple DOM layers, shadows, textures, and hover transforms.
3. The shelf has a requestAnimationFrame inertia loop driven by wheel and touch input.
4. `ProjectDetailPage.tsx` uses a custom horizontal rail with a requestAnimationFrame scroll loop.
5. `ProjectDetailPage.tsx` currently reads layout metrics inside animation logic, including `scrollWidth`, `clientWidth`, `querySelectorAll`, and `offsetLeft`.
6. Hero videos are raw `<video autoPlay muted loop preload="none">` elements.
7. Raw autoplay video does not enforce offscreen pausing.
8. Raw autoplay video does not enforce a single active video across the app.
9. The public asset audit lists very large 4K videos, including files from roughly 36 MB to 95 MB.
10. CSS contains multiple `mix-blend-mode`, blur, fixed texture, and overlay effects that can become expensive over video.

## Main risk

The app can ask the browser to do all of this at once:

```txt
4K video decode
+ heavy CSS compositing over video
+ horizontal rail inertia
+ 3D bookshelf inertia
+ route transition animation
+ React motion entrance animations
```

On strong desktop hardware, this may still look good. On Chromebooks, low-power laptops, and mobile browsers, this combination can stutter.

## What this fix package does

This package does not remove the 4K videos. Instead, it creates a video playback contract:

```txt
A video may exist in the DOM.
A video may be near the viewport.
A video may be visible enough.
But it may only play if the coordinator grants playback.
```

The coordinator guarantees:

1. Only one managed video plays at a time.
2. Offscreen videos pause.
3. Videos pause while heavy motion is active.
4. Videos pause when the tab is hidden.
5. Videos use `preload="none"` until near the viewport, then `preload="metadata"`.

## Why not poster-only fallback

The user explicitly wants to keep 4K video playback. This package preserves that. The poster is used only as a visual background behind the video or before playback begins. It is not a replacement for the video experience.

## Why this is the first performance pass

This pass is safer than rewriting the shelf renderer from three duplicated loops to modulo-positioned books. It reduces runtime contention without changing the shelf's visual identity or changing the app's concept.

The 20-book modulo renderer remains a future improvement, not part of this package.
