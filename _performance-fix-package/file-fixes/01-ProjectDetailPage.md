# 01 - Modify `src/components/project/ProjectDetailPage.tsx`

Purpose:

1. Replace the raw autoplay hero video with `ManagedHeroVideo`.
2. Add heavy-motion signaling from the horizontal project rail.
3. Cache rail measurements and snap points outside the animation frame loop.
4. Make rail physics time-based.
5. Reduce the rail velocity cap so the experience feels controlled instead of jumpy.

Do not change layout, copy, routes, colors, panels, project data, or visual theme.

## Step 1 - Add imports

At the top of `ProjectDetailPage.tsx`, add these imports near the existing component imports:

```ts
import { ManagedHeroVideo } from '../ManagedHeroVideo';
import { createHeavyMotionSettler } from '../../lib/heavyMotion';
```

The import path is correct for a file located at:

```txt
src/components/project/ProjectDetailPage.tsx
```

## Step 2 - Add rail measurement refs

Find the existing rail refs:

```ts
const railRef = useRef<HTMLElement | null>(null);
const railOffsetRef = useRef(0);
const railVelocityRef = useRef(0);
const railRafRef = useRef<number | null>(null);
const railSnappingRef = useRef(false);
```

Immediately after them, add:

```ts
const railMaxOffsetRef = useRef(0);
const railSnapPointsRef = useRef<number[]>([0]);
const railLastTimestampRef = useRef(0);
```

## Step 3 - Replace the horizontal rail effect

Find the `useEffect` that starts with:

```ts
useEffect(() => {
  const rail = railRef.current;
  if (!rail) return;

  const desktopQuery = window.matchMedia('(min-width: 901px)');
```

Replace that entire `useEffect` with this version:

```ts
useEffect(() => {
  const rail = railRef.current;
  if (!rail) return;

  const desktopQuery = window.matchMedia('(min-width: 901px)');
  const railMotion = createHeavyMotionSettler(`project-rail-${slug}`, 650);
  const SNAP_VELOCITY_THRESHOLD = 0.36;
  const SNAP_EASING = 0.16;
  const SNAP_DONE_PX = 0.5;
  const VELOCITY_SCALE = 0.12;
  const VELOCITY_LIMIT = 24;
  const DAMPING_PER_FRAME = 0.84;

  const measureRail = () => {
    const panels = Array.from(
      rail.querySelectorAll('.project-horizontal-panel')
    ) as HTMLElement[];

    railMaxOffsetRef.current = Math.max(0, rail.scrollWidth - rail.clientWidth);

    if (!panels.length) {
      railSnapPointsRef.current = [0];
      return;
    }

    const baseOffset = panels[0].offsetLeft;

    railSnapPointsRef.current = panels.map((panel) =>
      Math.max(
        0,
        Math.min(panel.offsetLeft - baseOffset, railMaxOffsetRef.current)
      )
    );
  };

  const clampOffset = (value: number) =>
    Math.max(0, Math.min(value, railMaxOffsetRef.current));

  const applyOffset = () => {
    const nextOffset = clampOffset(railOffsetRef.current);
    railOffsetRef.current = nextOffset;

    if (Math.abs(rail.scrollLeft - nextOffset) > 0.25) {
      rail.scrollLeft = nextOffset;
    }
  };

  const stopRailAnimation = () => {
    if (railRafRef.current !== null) {
      cancelAnimationFrame(railRafRef.current);
      railRafRef.current = null;
    }

    railVelocityRef.current = 0;
    railSnappingRef.current = false;
    railLastTimestampRef.current = 0;
    railMotion.end('rail-stop');
  };

  const animateRail = (timestamp: number) => {
    if (!desktopQuery.matches || lightboxOpen) {
      stopRailAnimation();
      return;
    }

    railMotion.markActive('rail-animation');

    const previousTimestamp = railLastTimestampRef.current || timestamp;
    const dt = Math.min(34, timestamp - previousTimestamp);
    const frameScale = dt > 0 ? dt / 16.667 : 1;
    railLastTimestampRef.current = timestamp;

    if (railSnappingRef.current) {
      const snapPoints = railSnapPointsRef.current;
      const snapTarget = snapPoints.reduce<number>(
        (closest, point) =>
          Math.abs(point - railOffsetRef.current) < Math.abs(closest - railOffsetRef.current)
            ? point
            : closest,
        snapPoints[0] ?? 0
      );
      const delta = snapTarget - railOffsetRef.current;

      if (Math.abs(delta) <= SNAP_DONE_PX) {
        railOffsetRef.current = snapTarget;
        applyOffset();
        stopRailAnimation();
        return;
      }

      railOffsetRef.current += delta * Math.min(1, SNAP_EASING * frameScale);
      applyOffset();
      railRafRef.current = requestAnimationFrame(animateRail);
      return;
    }

    railOffsetRef.current += railVelocityRef.current * frameScale;
    applyOffset();

    const maxOffset = railMaxOffsetRef.current;
    const atStart = railOffsetRef.current <= 0.5;
    const atEnd = railOffsetRef.current >= maxOffset - 0.5;

    if ((atStart && railVelocityRef.current < 0) || (atEnd && railVelocityRef.current > 0)) {
      railVelocityRef.current = 0;
    } else {
      railVelocityRef.current *= Math.pow(DAMPING_PER_FRAME, frameScale);
    }

    if (Math.abs(railVelocityRef.current) > SNAP_VELOCITY_THRESHOLD) {
      railRafRef.current = requestAnimationFrame(animateRail);
      return;
    }

    railVelocityRef.current = 0;
    railSnappingRef.current = true;
    railRafRef.current = requestAnimationFrame(animateRail);
  };

  const startRailAnimation = () => {
    railMotion.markActive('rail-start');

    if (railRafRef.current === null) {
      railLastTimestampRef.current = 0;
      railRafRef.current = requestAnimationFrame(animateRail);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (!desktopQuery.matches || lightboxOpen || e.ctrlKey) return;

    const dominantDelta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (Math.abs(dominantDelta) < 0.01) return;

    e.preventDefault();
    railMotion.markActive('rail-wheel');
    railOffsetRef.current = clampOffset(rail.scrollLeft);
    railSnappingRef.current = false;
    railVelocityRef.current += dominantDelta * VELOCITY_SCALE;
    railVelocityRef.current = Math.max(
      -VELOCITY_LIMIT,
      Math.min(VELOCITY_LIMIT, railVelocityRef.current)
    );

    startRailAnimation();
  };

  const handleScroll = () => {
    if (railRafRef.current === null) {
      railOffsetRef.current = clampOffset(rail.scrollLeft);
    }
  };

  const handleResize = () => {
    measureRail();
    railOffsetRef.current = clampOffset(rail.scrollLeft);
    applyOffset();
  };

  measureRail();
  railOffsetRef.current = clampOffset(rail.scrollLeft);

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => {
          measureRail();
          railOffsetRef.current = clampOffset(rail.scrollLeft);
        })
      : null;

  resizeObserver?.observe(rail);

  rail.addEventListener('wheel', handleWheel, { passive: false });
  rail.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);

  return () => {
    rail.removeEventListener('wheel', handleWheel);
    rail.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    resizeObserver?.disconnect();
    stopRailAnimation();
    railMotion.dispose();
  };
}, [lightboxOpen, slug]);
```

## Why this matters

The old effect called `getSnapPoints()` during snapping. That function used:

```txt
querySelectorAll
offsetLeft
scrollWidth
clientWidth
```

Those layout reads could run inside animation work. The new version measures once on mount, resize, and content resize, then the animation loop uses cached refs.

The old inertia was frame-based. The new inertia uses delta time so it behaves more consistently on lower-powered devices.

## Step 4 - Replace the raw hero video

Find this block inside the intro panel:

```tsx
{detail.heroVideo && (
  <>
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover opacity-85 z-0 pointer-events-none"
    >
      <source src={detail.heroVideo} type="video/mp4" />
    </video>
    <div 
      className="absolute inset-0 z-[1] pointer-events-none" 
      style={{ 
        background: 'linear-gradient(180deg, rgba(251,246,239,0.05) 0%, rgba(242,229,215,0.3) 100%)'
      }} 
    />
  </>
)}
```

Replace it with:

```tsx
{detail.heroVideo && (
  <>
    <ManagedHeroVideo
      src={detail.heroVideo}
      idSeed={`project-detail-${detail.slug}`}
      poster={detail.heroImage || undefined}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      videoClassName="absolute inset-0 h-full w-full object-cover opacity-85 pointer-events-none"
    />
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(251,246,239,0.05) 0%, rgba(242,229,215,0.3) 100%)'
      }}
    />
  </>
)}
```

This preserves the 4K video source. The video still plays when visible. It no longer gets unconditional `autoPlay` at mount time.

## Step 5 - Search for raw video in this file

Run or use editor search:

```txt
<video
autoPlay
```

There should be no raw autoplay hero video remaining in `ProjectDetailPage.tsx` after this patch.
