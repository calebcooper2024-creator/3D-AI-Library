const DEBUG_ENTRY_GATE = false;

export type VideoReadinessPhase =
  | 'idle'
  | 'metadata'
  | 'buffering'
  | 'canplay'
  | 'playing'
  | 'timeout'
  | 'error';

export type VideoReadinessSnapshot = {
  src: string;
  phase: VideoReadinessPhase;
  progress: number; // 0 to 100
  readyState: number;
  bufferedSeconds: number;
  duration: number | null;
  canPlay: boolean;
  isPlaying: boolean;
  timedOut: boolean;
  error?: string;
};

type ReadinessRecord = {
  src: string;
  video: HTMLVideoElement | null;
  snapshot: VideoReadinessSnapshot;
  listeners: Set<(s: VideoReadinessSnapshot) => void>;
  resolve: (s: VideoReadinessSnapshot) => void;
  settled: boolean;
  timer: number | null;
  cleanupListeners: (() => void) | null;
};

const records = new Map<string, ReadinessRecord>();

function computeBufferedRatio(video: HTMLVideoElement): number {
  const dur = video.duration;
  if (!isFinite(dur) || dur <= 0) return 0;
  const ct = video.currentTime;
  let maxEnd = 0;
  for (let i = 0; i < video.buffered.length; i++) {
    if (video.buffered.start(i) <= ct + 0.5) {
      maxEnd = Math.max(maxEnd, video.buffered.end(i));
    }
  }
  return Math.min(maxEnd / dur, 1);
}

function computeProgress(video: HTMLVideoElement, phase: VideoReadinessPhase): number {
  const buf = computeBufferedRatio(video);
  switch (phase) {
    case 'idle':      return 5;
    case 'metadata':  return Math.max(15, Math.min(34, 15 + buf * 19));
    case 'buffering': return Math.max(35, Math.min(74, 35 + buf * 39));
    case 'canplay':   return Math.max(75, Math.min(89, 75 + buf * 14));
    case 'playing':   return 100;
    case 'timeout':   return 100;
    case 'error':     return 100;
  }
}

function notifyListeners(record: ReadinessRecord) {
  for (const listener of record.listeners) {
    try {
      listener(record.snapshot);
    } catch {
      // ignore listener errors
    }
  }
}

function settleRecord(
  record: ReadinessRecord,
  phase: VideoReadinessPhase,
  extra: Partial<VideoReadinessSnapshot> = {}
) {
  if (record.settled) return;
  record.settled = true;

  if (record.timer !== null) {
    window.clearTimeout(record.timer);
    record.timer = null;
  }

  record.cleanupListeners?.();
  record.cleanupListeners = null;

  if (record.video) {
    try {
      record.video.pause();
    } catch {
      // best-effort
    }
  }

  record.snapshot = {
    ...record.snapshot,
    phase,
    progress: 100,
    ...extra,
  };

  notifyListeners(record);
  record.resolve(record.snapshot);

  if (DEBUG_ENTRY_GATE) {
    console.log('[VideoReadiness] settled:', phase, record.src);
  }
}

export function prepareVideoForEntry(
  src: string,
  opts: { maxWaitMs: number }
): Promise<VideoReadinessSnapshot> {
  const existing = records.get(src);
  if (existing) return existing.promise;

  let resolveRecord!: (s: VideoReadinessSnapshot) => void;
  const promise = new Promise<VideoReadinessSnapshot>((res) => {
    resolveRecord = res;
  });

  const initialSnapshot: VideoReadinessSnapshot = {
    src,
    phase: 'idle',
    progress: 5,
    readyState: 0,
    bufferedSeconds: 0,
    duration: null,
    canPlay: false,
    isPlaying: false,
    timedOut: false,
  };

  const record: ReadinessRecord = {
    src,
    video: null,
    snapshot: initialSnapshot,
    listeners: new Set(),
    resolve: resolveRecord,
    settled: false,
    timer: null,
    cleanupListeners: null,
  };

  records.set(src, record);

  if (typeof document === 'undefined') {
    settleRecord(record, 'error', { error: 'No document' });
    return promise;
  }

  const video = document.createElement('video');
  record.video = video;

  const updateSnapshot = (phase?: VideoReadinessPhase) => {
    if (record.settled) return;
    const p = phase ?? record.snapshot.phase;
    const progress = computeProgress(video, p);
    const dur = isFinite(video.duration) ? video.duration : null;
    const buf = video.buffered.length > 0
      ? video.buffered.end(video.buffered.length - 1)
      : 0;
    record.snapshot = {
      ...record.snapshot,
      phase: p,
      progress,
      readyState: video.readyState,
      bufferedSeconds: buf,
      duration: dur,
    };
    notifyListeners(record);

    if (DEBUG_ENTRY_GATE) {
      console.log('[VideoReadiness]', p, Math.round(progress) + '%', src);
    }
  };

  const onMetadata = () => {
    if (record.settled || record.snapshot.phase !== 'idle') return;
    updateSnapshot('metadata');
  };

  const onData = () => {
    if (record.settled) return;
    const cur = record.snapshot.phase;
    if (cur === 'idle' || cur === 'metadata') {
      updateSnapshot('buffering');
    } else {
      updateSnapshot();
    }
  };

  const onProgressEvent = () => {
    if (!record.settled) updateSnapshot();
  };

  const onCanPlay = () => {
    if (record.settled) return;
    const cur = record.snapshot.phase;
    if (cur !== 'playing') {
      updateSnapshot('canplay');
      record.snapshot = { ...record.snapshot, canPlay: true };
      notifyListeners(record);
    }
    // Do NOT call video.play() here. The warmup element is for buffering only.
    // The gate waits for the managed (visible) video to fire playing via markManagedVideoPlaying.
  };

  const onPlaying = () => {
    if (record.settled) return;
    if (DEBUG_ENTRY_GATE) console.log('[VideoReadiness] playing 100%', src);
    settleRecord(record, 'playing', { isPlaying: true, canPlay: true, progress: 100 });
  };

  const onError = () => {
    if (!record.settled) {
      settleRecord(record, 'error', { error: 'Video failed to load' });
    }
  };

  const onWaiting = () => { if (!record.settled) updateSnapshot(); };
  const onStalled = () => { if (!record.settled) updateSnapshot(); };

  video.addEventListener('loadedmetadata', onMetadata);
  video.addEventListener('loadeddata', onData);
  video.addEventListener('progress', onProgressEvent);
  video.addEventListener('canplay', onCanPlay);
  video.addEventListener('canplaythrough', onCanPlay);
  video.addEventListener('playing', onPlaying);
  video.addEventListener('waiting', onWaiting);
  video.addEventListener('stalled', onStalled);
  video.addEventListener('error', onError);

  record.cleanupListeners = () => {
    video.removeEventListener('loadedmetadata', onMetadata);
    video.removeEventListener('loadeddata', onData);
    video.removeEventListener('progress', onProgressEvent);
    video.removeEventListener('canplay', onCanPlay);
    video.removeEventListener('canplaythrough', onCanPlay);
    video.removeEventListener('playing', onPlaying);
    video.removeEventListener('waiting', onWaiting);
    video.removeEventListener('stalled', onStalled);
    video.removeEventListener('error', onError);
  };

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = src;

  record.timer = window.setTimeout(() => {
    settleRecord(record, 'timeout', { timedOut: true });
  }, opts.maxWaitMs);

  try {
    video.load();
    // Fast-path: if browser already has data cached, advance phase immediately
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onData();
    }
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      onCanPlay();
    }
  } catch {
    settleRecord(record, 'error', { error: 'video.load() failed' });
  }

  return promise;
}

export function getVideoReadinessSnapshot(src: string): VideoReadinessSnapshot | null {
  return records.get(src)?.snapshot ?? null;
}

export function subscribeVideoReadiness(
  src: string,
  listener: (snapshot: VideoReadinessSnapshot) => void
): () => void {
  const record = records.get(src);
  if (!record) return () => undefined;
  record.listeners.add(listener);
  // Immediately notify with current state
  try {
    listener(record.snapshot);
  } catch {
    // ignore
  }
  return () => {
    record.listeners.delete(listener);
  };
}

export function markManagedVideoPlaying(src: string): void {
  const record = records.get(src);
  if (!record) return;

  if (record.settled) {
    // Already settled (e.g., timeout) — update snapshot for informational purposes only
    record.snapshot = { ...record.snapshot, isPlaying: true };
    notifyListeners(record);
    return;
  }

  settleRecord(record, 'playing', { isPlaying: true, canPlay: true, progress: 100 });
}

export function clearVideoReadiness(src: string): void {
  const record = records.get(src);
  if (!record) return;
  if (record.timer !== null) window.clearTimeout(record.timer);
  record.cleanupListeners?.();
  if (record.video) {
    try {
      record.video.pause();
    } catch {
      // best-effort
    }
  }
  records.delete(src);
}
