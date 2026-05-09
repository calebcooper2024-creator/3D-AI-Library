import React, { useRef, useState } from 'react';
import { Book } from './Book';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronsLeft } from 'lucide-react';

export interface ShelfBook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  spineColor: string;
  coverColor: string;
  textColor: string;
  spineTextColor?: string;
  fontTitle: string;
  textureClass?: string;
  detailHref?: string;
  coverImage?: string;
  /** Extra image URLs embedded in coverContent/spineContent that Bookshelf cannot
   *  discover automatically. Added to the readiness preload set alongside coverImage. */
  visualAssetUrls?: string[];
  coverContent?: React.ReactNode;
  spineContent?: React.ReactNode;
  showAuthorBadge?: boolean;
}

const SHELF_PRELOAD_BUDGET = 10;

const _preloadedUrls = new Set<string>();

type ImagePreloadResult = { url: string; ok: boolean; error?: string };

function preloadImageAsset(url: string): Promise<ImagePreloadResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    const finish = (ok: boolean, error?: string): void => {
      if (ok && typeof img.decode === 'function') {
        img.decode()
          .then(() => resolve({ url, ok: true }))
          .catch((e: unknown) =>
            resolve({ url, ok: false, error: e instanceof Error ? e.message : 'decode failed' })
          );
      } else {
        resolve({ url, ok, error });
      }
    };
    img.onload = () => finish(true);
    img.onerror = () => finish(false, 'image load failed');
    img.src = url;
  });
}

export const Bookshelf = ({
  books,
  onSelectBook,
  canOpenBook,
  onBlockedSelectBook,
  shelfMessage,
  isTransitioning = false,
  onReady
}: {
  books: ShelfBook[];
  onSelectBook: (id: string) => void;
  canOpenBook?: (id: string) => boolean;
  onBlockedSelectBook?: (id: string) => void;
  shelfMessage?: string | null;
  isTransitioning?: boolean;
  onReady?: () => void;
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playPageTurnSound = () => {
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextCtor) return;

      const context = audioContextRef.current ?? new AudioContextCtor();
      audioContextRef.current = context;

      const scheduleSound = () => {
        const now = context.currentTime;
        const duration = 1.12;
        const frameCount = Math.floor(context.sampleRate * duration);
        const buffer = context.createBuffer(1, frameCount, context.sampleRate);
        const channel = buffer.getChannelData(0);

        for (let i = 0; i < frameCount; i += 1) {
          const t = i / frameCount;
          const flutter = Math.sin(t * Math.PI * 7.5) * 0.14;
          channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.35) * (0.68 + flutter);
        }

        const source = context.createBufferSource();
        source.buffer = buffer;

        const bandpass = context.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(860, now);
        bandpass.frequency.exponentialRampToValueAtTime(310, now + duration);
        bandpass.Q.setValueAtTime(0.65, now);

        const lowpass = context.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(1600, now);
        lowpass.frequency.exponentialRampToValueAtTime(520, now + duration);

        const gain = context.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.16, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.46);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        const thump = context.createOscillator();
        thump.type = 'triangle';
        thump.frequency.setValueAtTime(96, now);
        thump.frequency.exponentialRampToValueAtTime(42, now + 0.28);

        const thumpGain = context.createGain();
        thumpGain.gain.setValueAtTime(0.0001, now);
        thumpGain.gain.exponentialRampToValueAtTime(0.032, now + 0.05);
        thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

        source.connect(bandpass);
        bandpass.connect(lowpass);
        lowpass.connect(gain);
        gain.connect(context.destination);

        thump.connect(thumpGain);
        thumpGain.connect(context.destination);

        source.start(now);
        source.stop(now + duration);
        thump.start(now);
        thump.stop(now + 0.34);
      };

      const safeScheduleSound = () => {
        try {
          scheduleSound();
        } catch {
          // Audio is decorative; it should never block the case-study transition.
        }
      };

      if (context.state === 'suspended') {
        void context.resume().then(safeScheduleSound).catch(() => undefined);
      } else {
        safeScheduleSound();
      }
    } catch {
      // Audio is decorative; it should never block the case-study transition.
    }
  };

  const [isReady, setIsReady] = useState(false);

  // Tracks which specific rendered instance (id-copyIndex) is animating open
  const [openingInstanceKey, setOpeningInstanceKey] = useState<string | null>(null);

  const handleSelectInstance = (id: string, instanceKey: string) => {
    if (isTransitioning || openingInstanceKey) return;
    if (canOpenBook && !canOpenBook(id)) {
      onBlockedSelectBook?.(id);
      return;
    }

    // Mark this instance as opening (triggers is-opening CSS)
    setOpeningInstanceKey(instanceKey);

    // Play page-turn sound immediately on click
    playPageTurnSound();

    // Hand control back to the route gate on the next frame so the overlay can
    // appear immediately without removing the opening state from this instance.
    window.requestAnimationFrame(() => {
      onSelectBook(id);
    });
  };

  const spine = 72;
  const projectedFace = 188;
  const gap = 2;
  const step = spine + projectedFace + gap;
  const cycleWidth = books.length * step;
  // Single copy of the book list. We used to render 3 copies for an infinite-
  // scroll wrap effect; on a finite portfolio that ~3x'd DOM nodes and motion-
  // mount springs for no real UX gain. The shelf now has hard edges with a
  // small rubber-band on overscroll.
  const displayedBooks = React.useMemo(
    () => books.map((book, bookIndex) => ({ book, bookIndex })),
    [books]
  );

  const shelfRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const offset = React.useRef(0);
  const velocity = React.useRef(0);
  const rafId = React.useRef<number | null>(null);
  // Cached visible viewport width — updated on mount and resize so the animate
  // loop never has to read layout (which would force a reflow each frame).
  const containerWidthRef = React.useRef(0);
  // Imperatively-callable tween. Assigned inside the animation effect so it
  // closes over the same applyTransform/getMaxOffset helpers used by inertia.
  const tweenToRef = React.useRef<((target: number) => void) | null>(null);

  // Control-button states. We keep "last shown" refs so the per-frame state
  // sync only triggers a React render when the value actually crosses a
  // threshold — most frames are no-ops.
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const lastCanScrollLeftRef = React.useRef(false);
  const lastCanScrollRightRef = React.useRef(true);

  // Preload cover images (coverImage + visualAssetUrls) for the first
  // SHELF_PRELOAD_BUDGET books, then reveal. Module-level cache means return
  // visits are instant. Safety timeout prevents the gate from blocking forever.
  React.useEffect(() => {
    const visibleBooks = books.slice(0, SHELF_PRELOAD_BUDGET);
    const urls = Array.from(new Set([
      ...visibleBooks.map((b) => b.coverImage).filter((u): u is string => Boolean(u)),
      ...visibleBooks.flatMap((b) => b.visualAssetUrls ?? []).filter(Boolean),
    ]));

    const markReady = () => { setIsReady(true); onReady?.(); };

    if (urls.length === 0) { markReady(); return; }

    if (urls.every((u) => _preloadedUrls.has(u))) { markReady(); return; }

    let cancelled = false;
    const safetyTimer = window.setTimeout(() => {
      if (cancelled) return;
      if (import.meta.env.DEV) {
        console.warn('[Bookshelf] Cover preload safety timeout. Still pending:', urls.filter((u) => !_preloadedUrls.has(u)));
      }
      cancelled = true;
      markReady();
    }, 3500);

    Promise.all(urls.map(preloadImageAsset)).then((results) => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(safetyTimer);
      results.forEach((r) => { if (r.ok) _preloadedUrls.add(r.url); });
      if (import.meta.env.DEV) {
        const failed = results.filter((r) => !r.ok);
        if (failed.length > 0) {
          console.warn('[Bookshelf] Some cover assets failed to preload:', failed.map((r) => r.url));
        }
      }
      markReady();
    });

    return () => { cancelled = true; window.clearTimeout(safetyTimer); };
  }, [books, onReady]);

  React.useEffect(() => {
    const el = shelfRef.current;
    const stage = stageRef.current;
    if (!el || cycleWidth === 0) return;

    // The 3D-perspective book card renders visually wider than its `step`
    // allocation (the projected front cover juts out to the right of the spine
    // and the hover state scales the whole card). Without a generous trailing
    // buffer the last book clips its cover at maxOffset and gets cropped on
    // hover. ~1.6 steps gives plenty of breathing room for hover scale.
    const trailingBuffer = Math.round(step * 1.6);

    // Refresh the cached viewport width. Called on mount and resize so the
    // hot animate path never reads layout.
    const measureContainer = () => {
      const container = stage?.parentElement;
      containerWidthRef.current = container?.clientWidth ?? 0;
    };
    measureContainer();

    const getMaxOffset = () =>
      Math.max(0, cycleWidth + trailingBuffer - containerWidthRef.current);

    const applyTransform = () => {
      if (!stage) return;
      stage.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
    };

    const syncButtonStates = () => {
      const max = getMaxOffset();
      const left = offset.current > 1;
      const right = offset.current < max - 1;
      if (left !== lastCanScrollLeftRef.current) {
        lastCanScrollLeftRef.current = left;
        setCanScrollLeft(left);
      }
      if (right !== lastCanScrollRightRef.current) {
        lastCanScrollRightRef.current = right;
        setCanScrollRight(right);
      }
    };

    const animate = () => {
      const max = getMaxOffset();

      // Spring-back force when out of bounds — pulls offset toward the nearest
      // edge proportional to overshoot. Heavier damping while out of bounds so
      // the rubber-band settles quickly without oscillating.
      if (offset.current < 0) {
        velocity.current += -offset.current * 0.2;
      } else if (offset.current > max) {
        velocity.current += (max - offset.current) * 0.2;
      }

      offset.current += velocity.current;

      const outOfBounds = offset.current < 0 || offset.current > max;
      velocity.current *= outOfBounds ? 0.7 : 0.91;

      applyTransform();
      syncButtonStates();

      if (Math.abs(velocity.current) > 0.1 || outOfBounds) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        velocity.current = 0;
        rafId.current = null;
      }
    };

    // Smooth tween toward an absolute target offset. Used by the control-pill
    // buttons. Cancels any in-flight inertia first so the two animation modes
    // never fight over rafId.
    const tweenTo = (rawTarget: number) => {
      const max = getMaxOffset();
      const target = Math.max(0, Math.min(max, rawTarget));
      velocity.current = 0;
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      const startOffset = offset.current;
      const distance = target - startOffset;
      if (Math.abs(distance) < 0.5) {
        offset.current = target;
        applyTransform();
        syncButtonStates();
        return;
      }
      // Duration scales with distance so short hops feel snappy and long
      // jumps (Start → end of shelf) still complete in well under a second.
      const duration = Math.min(900, Math.max(380, Math.abs(distance) * 0.55));
      const startTime = performance.now();

      const tweenStep = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        // ease-out cubic: fast departure, soft landing.
        const eased = 1 - Math.pow(1 - t, 3);
        offset.current = startOffset + distance * eased;
        applyTransform();
        syncButtonStates();
        if (t < 1) {
          rafId.current = requestAnimationFrame(tweenStep);
        } else {
          offset.current = target;
          applyTransform();
          syncButtonStates();
          rafId.current = null;
        }
      };

      rafId.current = requestAnimationFrame(tweenStep);
    };

    tweenToRef.current = tweenTo;

    const handleWheelEvent = (e: WheelEvent) => {
      if (isTransitioning) return;
      const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominantDelta) < 0.01) return;

      e.preventDefault();
      const max = getMaxOffset();
      let scaled = dominantDelta * 0.09;
      // Dampen wheel input pushing further past an edge (rubber-band feel).
      if (offset.current <= 0 && scaled < 0) scaled *= 0.3;
      if (offset.current >= max && scaled > 0) scaled *= 0.3;

      velocity.current += scaled;
      velocity.current = Math.max(-18, Math.min(18, velocity.current));

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    // --- Touch support for mobile ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX = 0;
    let touchActive = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (isTransitioning) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchLastX = touch.clientX;
      touchActive = false;
      // Kill existing inertia on new touch
      velocity.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;

      // Once horizontal intent is established, lock to horizontal
      if (!touchActive && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        touchActive = true;
      }

      if (touchActive) {
        e.preventDefault();
        let moveDelta = touchLastX - touch.clientX;
        touchLastX = touch.clientX;
        const max = getMaxOffset();
        // Dampen drag past edges (rubber-band feel during active drag).
        if (offset.current < 0 && moveDelta < 0) moveDelta *= 0.3;
        if (offset.current > max && moveDelta > 0) moveDelta *= 0.3;
        offset.current += moveDelta;
        applyTransform();
        syncButtonStates();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchActive) return;
      const touch = e.changedTouches[0];
      const flickDelta = touchLastX - touch.clientX;
      velocity.current = flickDelta * 0.8;
      velocity.current = Math.max(-18, Math.min(18, velocity.current));
      const max = getMaxOffset();
      const outOfBounds = offset.current < 0 || offset.current > max;
      // Always run animate when out of bounds so the spring-back fires even
      // after a slow drag that ended past an edge.
      if (rafId.current === null && (Math.abs(velocity.current) > 0.1 || outOfBounds)) {
        rafId.current = requestAnimationFrame(animate);
      }
      touchActive = false;
    };

    applyTransform();
    syncButtonStates();
    el.addEventListener('wheel', handleWheelEvent, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', measureContainer);

    return () => {
      el.removeEventListener('wheel', handleWheelEvent);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', measureContainer);
      tweenToRef.current = null;
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [cycleWidth, isTransitioning]);

  // Click handlers wired to the imperative tween. Each button steps by ~70%
  // of the visible width so users see partial overlap with the prior view —
  // far more orienting than a full-page jump.
  const stepByPage = (direction: 1 | -1) => {
    const tween = tweenToRef.current;
    if (!tween) return;
    const pageDistance = Math.max(step * 2, containerWidthRef.current * 0.7);
    tween(offset.current + direction * pageDistance);
  };

  const goToStart = () => {
    tweenToRef.current?.(0);
  };

  return (
    <div className="relative min-h-screen">
      {/* Loading overlay — visible and interactive until cover images are decoded */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center bg-[#f9f3eb]"
        style={{ opacity: isReady ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: isReady ? 'none' : 'auto' }}
        aria-hidden={isReady}
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f1a17]/55">
          Opening Library
        </p>
      </div>
    <div
      ref={shelfRef}
      className={`min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-transparent hide-scrollbar ${isTransitioning ? 'pointer-events-none' : ''}`}
      style={{ touchAction: 'pan-y pinch-zoom', opacity: isReady ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: isReady ? 'auto' : 'none' }}
      aria-hidden={!isReady}
    >
      <div className={`bookshelf-container px-4 md:px-16 flex items-center${openingInstanceKey ? ' has-opening-book' : ''}`}>
          <div
            ref={stageRef}
            className="book-stage relative flex transform-gpu"
            style={{
              width: `${displayedBooks.length * step}px`,
              height: '540px',
              // Hint the compositor so transform updates promote into a layer
              // and the browser doesn't re-rasterize on every frame.
              willChange: 'transform',
            }}
          >
            {displayedBooks.map(({ book, bookIndex }, index) => {
              const bookLeft = index * step;
              const instanceKey = book.id;
              const isOpening = openingInstanceKey === instanceKey;

              return (
                <motion.div
                  key={instanceKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: bookIndex * 0.06 + 0.2, type: "spring", bounce: 0.35 }}
                  className="book-item-wrapper absolute top-0 transition-transform duration-500 ease-out transform-gpu z-10 hover:z-[60]"
                  style={{ left: `${bookLeft}px`, height: '100%', zIndex: isOpening ? 200 : books.length - bookIndex }}
                >
                  <Book 
                    book={book} 
                    onClick={() => handleSelectInstance(book.id, instanceKey)}
                    index={bookIndex}
                    isOpening={isOpening}
                  />
                </motion.div>
              );
            })}
          </div>
      </div>

      <div className="mt-10 flex h-8 items-center justify-center px-10">
        <motion.div
          key={shelfMessage ?? 'shelf-idle'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: shelfMessage ? 1 : 0, y: shelfMessage ? 0 : 8 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-black text-center whitespace-nowrap"
        >
          {shelfMessage ?? ''}
        </motion.div>
      </div>

      {/* Floating scroll-control pill. Buttons fade to inactive when they
          can't scroll further in their direction so the user always knows
          where the boundaries are. */}
      <div className="pointer-events-none fixed bottom-8 right-8 z-50 select-none">
        <div className="pointer-events-auto flex items-center gap-1 border border-[#1f1a17]/15 bg-[rgba(249,243,235,0.92)] px-1.5 py-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <button
            type="button"
            onClick={goToStart}
            disabled={!canScrollLeft}
            aria-label="Back to start"
            className="flex h-9 w-9 items-center justify-center text-[#1f1a17] transition-opacity duration-200 hover:bg-[#1f1a17]/10 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronsLeft size={18} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => stepByPage(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center text-[#1f1a17] transition-opacity duration-200 hover:bg-[#1f1a17]/10 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft size={18} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => stepByPage(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center text-[#1f1a17] transition-opacity duration-200 hover:bg-[#1f1a17]/10 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronRight size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
