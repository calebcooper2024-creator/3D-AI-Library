# Buttery Smooth Performance Fix Package

This package is a handoff bundle for the React/Vite 3D portfolio project at:

```txt
C:\Users\Caleb\Downloads\calebs-3d-case-study
```

Goal:

```txt
Make the site feel buttery smooth on lower-powered CPUs and GPUs while preserving the current app appearance, routes, content, 3D identity, and 4K video experience.
```

This package focuses on the fixes that do not require changing the app's visible concept or replacing 4K videos with poster-only fallbacks:

1. Add a strict video playback contract.
2. Ensure only one video can play at once across the app.
3. Pause videos when they are offscreen.
4. Pause or delay videos while heavy shelf scroll, horizontal project rail scroll, or route transition motion is active.
5. Cache horizontal project rail measurements outside the animation frame loop.
6. Make scroll inertia time-based and less aggressive.
7. Use `will-change` only while motion is active.
8. Preserve the current visual design.

Non-goals:

1. Do not replace 4K videos with poster-only fallback experiences.
2. Do not remove videos.
3. Do not redesign the app.
4. Do not change book colors, covers, textures, book typography, titles, routes, or project content.
5. Do not touch GoDaddy, DNS, Vercel domains, or deployment settings.
6. Do not rewrite the bookshelf.
7. Do not convert the mobile experience to 2D in this pass.
8. Do not implement the 20-book modulo renderer in this pass unless explicitly approved after this pass.

Recommended order:

1. Give the agent `agent/AGENT_EXECUTION_PROMPT.md`.
2. Have the agent copy files from `new-files/` into the matching project paths.
3. Apply each file-specific fix in `file-fixes/` in numeric order.
4. Run the checks in `verification/ACCEPTANCE_TESTS.md`.
5. Commit only the changed files from this pass.

Stop conditions:

1. Stop if Graphify reports the relevant ownership boundaries have changed since the performance snapshot.
2. Stop if `src/components/Bookshelf.tsx`, `src/components/project/ProjectDetailPage.tsx`, or `src/data/caseStudies.tsx` no longer resemble the snapshot structure.
3. Stop if applying a change would alter book visuals, route semantics, project content, or navigation.
4. Stop if TypeScript errors indicate a larger architectural change is required.
5. Stop if more than the listed files need edits, unless the build error proves a specific import path or type fix is required.

Expected changed files:

```txt
src/lib/heavyMotion.ts
src/lib/videoPlaybackCoordinator.ts
src/components/ManagedHeroVideo.tsx
src/components/project/ProjectDetailPage.tsx
src/data/caseStudies.tsx
src/components/Bookshelf.tsx
src/index.css
```

Optional only after approval:

```txt
src/components/Book.tsx
src/data/workDetails.tsx
src/data/works.tsx
```

The key principle:

```txt
Keep the cinematic 4K/3D look, but make video decode and scroll animation cooperate instead of competing for the main thread and compositor.
```
