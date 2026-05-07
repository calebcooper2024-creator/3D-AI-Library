# 03 - Modify `src/components/Bookshelf.tsx`

Purpose:

1. Add heavy-motion signaling from the 3D shelf scroll loop.
2. Make the shelf inertia time-based.
3. Reduce velocity cap to make the shelf feel smoother and less jumpy.
4. Add dynamic `will-change` only while the shelf is moving.
5. Keep the current shelf appearance and function.

Important:

This pass does not convert the shelf from 3 duplicated DOM loops to a 20-book modulo renderer. That would be a larger renderer refactor. Keep the existing `displayedBooks` strategy for now.

## Step 1 - Add import

At the top of `Bookshelf.tsx`, add:

```ts
import { createHeavyMotionSettler } from '../lib/heavyMotion';
```

## Step 2 - Replace the shelf scroll effect

Find the existing `React.useEffect` that attaches wheel and touch listeners. It begins with:

```ts
React.useEffect(() => {
  const el = shelfRef.current;
  const stage = stageRef.current;
  if (!el || cycleWidth === 0) return;
```

Replace that entire effect with this:

```ts
React.useEffect(() => {
  const el = shelfRef.current;
  const stage = stageRef.current;
  if (!el || !stage || cycleWidth === 0) return;

  const shelfMotion = createHeavyMotionSettler('bookshelf', 650);
  const VELOCITY_SCALE = 0.12;
  const VELOCITY_LIMIT = 24;
  const DAMPING_PER_FRAME = 0.84;

  let lastTimestamp = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchLastX = 0;
  let touchActive = false;
  let lastTouchDelta = 0;

  const setMoving = (moving: boolean) => {
    if (moving) {
      stage.classList.add('is-moving');
    } else {
      stage.classList.remove('is-moving');
    }
  };

  const applyTransform = () => {
    const normalizedOffset = ((offset.current % cycleWidth) + cycleWidth) % cycleWidth;
    stage.style.transform = `translate3d(${-cycleWidth - normalizedOffset}px, 0, 0)`;
  };

  const stopAnimation = () => {
    velocity.current = 0;
    lastTimestamp = 0;
    rafId.current = null;
    setMoving(false);
    shelfMotion.end('bookshelf-stop');
  };

  const animate = (timestamp: number) => {
    shelfMotion.markActive('bookshelf-animation');
    setMoving(true);

    const previousTimestamp = lastTimestamp || timestamp;
    const dt = Math.min(34, timestamp - previousTimestamp);
    const frameScale = dt > 0 ? dt / 16.667 : 1;
    lastTimestamp = timestamp;

    offset.current += velocity.current * frameScale;
    velocity.current *= Math.pow(DAMPING_PER_FRAME, frameScale);
    applyTransform();

    if (Math.abs(velocity.current) > 0.1) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    stopAnimation();
  };

  const startAnimation = () => {
    shelfMotion.markActive('bookshelf-start');
    setMoving(true);

    if (rafId.current === null) {
      lastTimestamp = 0;
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handleWheelEvent = (e: WheelEvent) => {
    if (isTransitioning) return;

    const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(dominantDelta) < 0.01) return;

    e.preventDefault();
    shelfMotion.markActive('bookshelf-wheel');
    velocity.current += dominantDelta * VELOCITY_SCALE;
    velocity.current = Math.max(-VELOCITY_LIMIT, Math.min(VELOCITY_LIMIT, velocity.current));

    startAnimation();
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (isTransitioning) return;

    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchLastX = touch.clientX;
    touchActive = false;
    lastTouchDelta = 0;
    velocity.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isTransitioning) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (!touchActive && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      touchActive = true;
      setMoving(true);
    }

    if (!touchActive) return;

    e.preventDefault();
    shelfMotion.markActive('bookshelf-touch');

    const moveDelta = touchLastX - touch.clientX;
    touchLastX = touch.clientX;
    lastTouchDelta = moveDelta;

    offset.current += moveDelta;
    applyTransform();
  };

  const handleTouchEnd = () => {
    if (!touchActive) return;

    velocity.current = Math.max(
      -VELOCITY_LIMIT,
      Math.min(VELOCITY_LIMIT, lastTouchDelta * 0.8)
    );

    touchActive = false;
    startAnimation();
  };

  applyTransform();

  el.addEventListener('wheel', handleWheelEvent, { passive: false });
  el.addEventListener('touchstart', handleTouchStart, { passive: true });
  el.addEventListener('touchmove', handleTouchMove, { passive: false });
  el.addEventListener('touchend', handleTouchEnd, { passive: true });

  return () => {
    el.removeEventListener('wheel', handleWheelEvent);
    el.removeEventListener('touchstart', handleTouchStart);
    el.removeEventListener('touchmove', handleTouchMove);
    el.removeEventListener('touchend', handleTouchEnd);

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    setMoving(false);
    shelfMotion.dispose();
  };
}, [cycleWidth, isTransitioning]);
```

## Step 3 - Remove permanent `will-change-transform`

Find:

```tsx
className="book-stage relative flex transform-gpu will-change-transform"
```

Replace with:

```tsx
className="book-stage relative flex transform-gpu"
```

The new effect adds the `is-moving` class only while motion is active.

## Step 4 - Adjust touch action safely

Find:

```tsx
style={{ touchAction: 'pan-x' }}
```

Replace with:

```tsx
style={{ touchAction: 'pan-y pinch-zoom' }}
```

Reason:

The component still handles horizontal intent with JavaScript after detecting horizontal movement. This CSS value allows normal vertical page gestures to remain healthier on touch devices.

If this breaks intended horizontal touch behavior during manual testing, revert this one line only and report it.

## Step 5 - Do not change visual constants

Do not change:

```ts
const spine = 72;
const projectedFace = 188;
const gap = 2;
const step = spine + projectedFace + gap;
```

Do not change book rendering, colors, cover content, title rendering, or click behavior.
