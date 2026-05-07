# 02 - Modify `src/data/caseStudies.tsx`

Purpose:

1. Replace raw autoplay videos in generated case-study hero sections.
2. Keep the original 4K video source.
3. Enforce the same managed video contract used by project detail pages.
4. Keep hero layout, overlay, copy, colors, and function unchanged.

## Step 1 - Add import

At the top of `src/data/caseStudies.tsx`, add:

```ts
import { ManagedHeroVideo } from '../components/ManagedHeroVideo';
```

This path is correct from:

```txt
src/data/caseStudies.tsx
```

## Step 2 - Replace the raw hero video block

Find this block inside `createMassiveSections`:

```tsx
{theme.heroVideo && (
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    className="absolute inset-0 h-full w-full object-cover opacity-85 z-0"
  >
    <source src={theme.heroVideo} type="video/mp4" />
  </video>
)}
```

Replace it with:

```tsx
{theme.heroVideo && (
  <ManagedHeroVideo
    src={theme.heroVideo}
    idSeed={`case-study-${title}`}
    className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
  />
)}
```

## Step 3 - Leave overlays alone in this pass

Do not remove this overlay in this pass:

```tsx
<div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-white/10 rounded-full mix-blend-overlay blur-3xl opacity-50" />
```

Reason:

1. It affects appearance.
2. The current user request is to focus on fixes that preserve app appearance and function.
3. The managed video contract should be implemented first.

Optional future task:

On low-performance tiers only, that overlay can be disabled or simplified. Do not do that here unless the user explicitly approves a low-tier visual degradation policy.

## Step 4 - Search for remaining raw autoplay video in this file

Search:

```txt
<video
autoPlay
```

Expected result:

```txt
No raw autoplay video remains in src/data/caseStudies.tsx.
```

If another raw autoplay video exists in this file, stop and report the exact location instead of guessing.
