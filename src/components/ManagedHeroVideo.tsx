import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  HEAVY_MOTION_EVENT,
  isHeavyMotionActive,
  type HeavyMotionDetail,
} from '../lib/heavyMotion';
import {
  getVideoReadinessSnapshot,
  markManagedVideoPlaying,
} from '../lib/videoReadinessTracker';
import {
  pauseManagedVideo,
  registerManagedVideo,
  requestManagedVideoPlayback,
} from '../lib/videoPlaybackCoordinator';

type ManagedHeroVideoProps = {
  src: string;
  idSeed: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  visibilityThreshold?: number;
  rootMargin?: string;
  pauseDuringHeavyMotion?: boolean;
};

function safeId(value: string) {
  return value.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

export function ManagedHeroVideo({
  src,
  idSeed,
  poster,
  className = '',
  videoClassName = 'absolute inset-0 h-full w-full object-cover pointer-events-none',
  visibilityThreshold = 0.45,
  rootMargin = '240px 0px',
  pauseDuringHeavyMotion = true,
}: ManagedHeroVideoProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Tracks the current play intent so event-driven retries (canplay, progress,
  // poll) only call play() when the video should be playing.
  const shouldPlayRef = useRef(false);
  // Default to true to prevent the hero video from pausing for 1 frame while waiting for observer
  const [nearViewport, setNearViewport] = useState(true);
  const [visibleEnough, setVisibleEnough] = useState(true);
  const [heavyMotionActive, setHeavyMotionActive] = useState(() => isHeavyMotionActive());
  const [videoReady, setVideoReady] = useState(() => {
    // Use isPlaying (not canPlay) so the poster stays visible until the
    // visible element has actually played a frame. canPlay comes from the
    // warmup element and does not guarantee the visible element has decoded
    // its first frame, causing a poster-then-black flash on first open.
    const snap = getVideoReadinessSnapshot(src);
    return snap ? snap.isPlaying : false;
  });
  const [documentVisible, setDocumentVisible] = useState(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  );

  const videoId = useMemo(() => {
    return `managed-video-${safeId(idSeed)}-${safeId(src)}`;
  }, [idSeed, src]);

  useEffect(() => {
    const snap = getVideoReadinessSnapshot(src);
    setVideoReady(snap ? snap.isPlaying : false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    return registerManagedVideo(videoId, video);
  }, [videoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setVideoReady(true);
      }
    };

    // Require 700ms of uninterrupted playback before signalling the entry gate.
    // If the video stalls (waiting/stalled) within that window, the timer resets
    // so the overlay stays up until playback is genuinely sustained.
    let sustainedTimer: number | null = null;

    const cancelSustained = () => {
      if (sustainedTimer !== null) {
        window.clearTimeout(sustainedTimer);
        sustainedTimer = null;
      }
    };

    const onPlaying = () => {
      setVideoReady(true);
      cancelSustained();
      sustainedTimer = window.setTimeout(() => {
        sustainedTimer = null;
        markManagedVideoPlaying(src);
      }, 700);
    };

    const onWaitingOrStalled = () => {
      cancelSustained();
    };

    // The visible <video> is keyed on videoId, so when src changes the element
    // remounts fresh with no buffered data. The first play() call from the
    // visibility effect can silently reject because the browser hasn't loaded
    // enough data yet — and since the visibility deps don't change, no retry
    // happens until the user scrolls. These retry handlers fire on every
    // loading milestone so play() resumes as soon as the browser is ready,
    // gated by shouldPlayRef so we never play while the video should be paused.
    const retryPlay = () => {
      if (!shouldPlayRef.current) return;
      if (!video.paused) return;
      void requestManagedVideoPlayback(videoId);
    };

    // Polling fallback: catches the case where neither canplay nor progress
    // fires after our handlers attach (e.g., events fired before mount).
    const pollId = window.setInterval(retryPlay, 600);

    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('loadeddata', retryPlay);
    video.addEventListener('canplay', retryPlay);
    video.addEventListener('canplaythrough', retryPlay);
    video.addEventListener('progress', retryPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('waiting', onWaitingOrStalled);
    video.addEventListener('stalled', onWaitingOrStalled);
    markReady();
    // If the element already has data buffered when we attach (events fired
    // before mount), kick off a retry immediately.
    retryPlay();

    return () => {
      cancelSustained();
      window.clearInterval(pollId);
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('loadeddata', retryPlay);
      video.removeEventListener('canplay', retryPlay);
      video.removeEventListener('canplaythrough', retryPlay);
      video.removeEventListener('progress', retryPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('waiting', onWaitingOrStalled);
      video.removeEventListener('stalled', onWaitingOrStalled);
    };
  }, [src, videoId]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      setVisibleEnough(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        setVisibleEnough(entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold);
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.1, 0.25, visibilityThreshold, 0.65, 1],
      }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, [rootMargin, visibilityThreshold]);

  useEffect(() => {
    const handleHeavyMotion = (event: Event) => {
      const customEvent = event as CustomEvent<HeavyMotionDetail>;
      setHeavyMotionActive(Boolean(customEvent.detail?.active));
    };

    window.addEventListener(HEAVY_MOTION_EVENT, handleHeavyMotion);

    return () => {
      window.removeEventListener(HEAVY_MOTION_EVENT, handleHeavyMotion);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const shouldPause =
      !visibleEnough ||
      !documentVisible ||
      (pauseDuringHeavyMotion && heavyMotionActive);

    shouldPlayRef.current = !shouldPause;

    if (shouldPause) {
      pauseManagedVideo(videoId);
      return;
    }

    void requestManagedVideoPlayback(videoId);
  }, [documentVisible, heavyMotionActive, pauseDuringHeavyMotion, videoId, visibleEnough]);

  useEffect(() => {
    if (!nearViewport) {
      pauseManagedVideo(videoId);
    }
  }, [nearViewport, videoId]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-500"
          style={{ opacity: videoReady ? 0 : 1 }}
        />
      )}
      <video
        key={videoId}
        ref={videoRef}
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
        className={videoClassName}
        style={{
          opacity: videoReady ? undefined : 0,
          transition: 'opacity 480ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
