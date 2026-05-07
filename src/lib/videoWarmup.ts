export type VideoWarmupStatus = 'pending' | 'warm' | 'timeout' | 'error';

export type VideoWarmupResult = {
  src: string;
  ready: boolean;
  status: VideoWarmupStatus;
  timedOut: boolean;
  readyState: number;
  startedAt: number;
  completedAt: number;
  error?: string;
};

type VideoWarmupState = {
  src: string;
  status: VideoWarmupStatus;
  promise: Promise<VideoWarmupResult>;
  video: HTMLVideoElement | null;
  result?: VideoWarmupResult;
  startedAt: number;
  lastAccessedAt: number;
};

const DEFAULT_TIMEOUT_MS = 1800;
const MAX_WARMUP_CACHE_SIZE = 12;
const WARMUP_TTL_MS = 10 * 60 * 1000;
const warmups = new Map<string, VideoWarmupState>();

function now() {
  return Date.now();
}

function finalizeVideo(video: HTMLVideoElement | null) {
  if (!video) return;

  try {
    video.pause();
  } catch {
    // Best-effort cleanup only.
  }
}

function disposeWarmup(state: VideoWarmupState) {
  finalizeVideo(state.video);
  state.video = null;
}

function trimWarmups() {
  const cutoff = now() - WARMUP_TTL_MS;

  for (const [src, state] of warmups) {
    if (state.lastAccessedAt < cutoff && state.status !== 'pending') {
      disposeWarmup(state);
      warmups.delete(src);
    }
  }

  if (warmups.size <= MAX_WARMUP_CACHE_SIZE) return;

  const removable = Array.from(warmups.values())
    .filter((state) => state.status !== 'pending')
    .sort((a, b) => a.lastAccessedAt - b.lastAccessedAt);

  while (warmups.size > MAX_WARMUP_CACHE_SIZE && removable.length > 0) {
    const state = removable.shift();
    if (!state) break;
    disposeWarmup(state);
    warmups.delete(state.src);
  }
}

export function getVideoWarmupState(src: string) {
  const state = warmups.get(src);
  if (!state) return null;

  state.lastAccessedAt = now();

  return {
    src: state.src,
    status: state.status,
    startedAt: state.startedAt,
    lastAccessedAt: state.lastAccessedAt,
    result: state.result,
  };
}

export function warmVideo(src: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<VideoWarmupResult> {
  const existing = warmups.get(src);
  if (existing) {
    existing.lastAccessedAt = now();
    return existing.promise;
  }

  const startedAt = now();
  const video = typeof document !== 'undefined' ? document.createElement('video') : null;

  const state: VideoWarmupState = {
    src,
    status: 'pending',
    video,
    startedAt,
    lastAccessedAt: startedAt,
    promise: Promise.resolve({
      src,
      ready: false,
      status: 'error',
      timedOut: false,
      readyState: 0,
      startedAt,
      completedAt: startedAt,
      error: 'Video warmup not initialized.',
    }),
  };

  state.promise = new Promise<VideoWarmupResult>((resolve) => {
    if (!video) {
      const result: VideoWarmupResult = {
        src,
        ready: false,
        status: 'error',
        timedOut: false,
        readyState: 0,
        startedAt,
        completedAt: now(),
        error: 'Document is unavailable.',
      };
      state.status = result.status;
      state.result = result;
      resolve(result);
      return;
    }

    let settled = false;
    let timer = 0;

    const finish = (result: VideoWarmupResult) => {
      if (settled) return;
      settled = true;

      if (timer) {
        window.clearTimeout(timer);
      }

      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('error', handleError);

      state.status = result.status;
      state.result = result;
      state.lastAccessedAt = now();
      trimWarmups();
      resolve(result);
    };

    const handleReady = () => {
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) return;

      finish({
        src,
        ready: true,
        status: 'warm',
        timedOut: false,
        readyState: video.readyState,
        startedAt,
        completedAt: now(),
      });
    };

    const handleError = () => {
      finish({
        src,
        ready: false,
        status: 'error',
        timedOut: false,
        readyState: video.readyState,
        startedAt,
        completedAt: now(),
        error: 'Video failed to warm.',
      });
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = src;
    video.crossOrigin = 'anonymous';

    video.addEventListener('canplay', handleReady);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('error', handleError);

    timer = window.setTimeout(() => {
      finish({
        src,
        ready: false,
        status: 'timeout',
        timedOut: true,
        readyState: video.readyState,
        startedAt,
        completedAt: now(),
      });
    }, timeoutMs);

    try {
      video.load();
      handleReady();
    } catch {
      handleError();
    }
  });

  warmups.set(src, state);
  trimWarmups();
  return state.promise;
}
