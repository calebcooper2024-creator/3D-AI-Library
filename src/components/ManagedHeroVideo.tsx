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
  // Default to true to prevent the hero video from pausing for 1 frame while waiting for observer
  const [nearViewport, setNearViewport] = useState(true);
  const [visibleEnough, setVisibleEnough] = useState(true);
  const [heavyMotionActive, setHeavyMotionActive] = useState(() => isHeavyMotionActive());
  const [videoReady, setVideoReady] = useState(() => {
    const snap = getVideoReadinessSnapshot(src);
    return snap ? (snap.canPlay || snap.isPlaying) : false;
  });
  const [documentVisible, setDocumentVisible] = useState(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  );

  const videoId = useMemo(() => {
    return `managed-video-${safeId(idSeed)}-${safeId(src)}`;
  }, [idSeed, src]);

  useEffect(() => {
    const snap = getVideoReadinessSnapshot(src);
    setVideoReady(snap ? (snap.canPlay || snap.isPlaying) : false);
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

    const onPlaying = () => {
      setVideoReady(true);
      markManagedVideoPlaying(src);
    };

    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('playing', onPlaying);
    markReady();

    return () => {
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('playing', onPlaying);
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
