import {
  prepareVideoForEntry,
  subscribeVideoReadiness,
  type VideoReadinessSnapshot,
} from './videoReadinessTracker';

export type { VideoReadinessSnapshot };

export type ProjectEntryPhase =
  | 'starting'
  | 'loading-content'
  | 'loading-video'
  | 'waiting-for-playback'
  | 'ready'
  | 'timeout'
  | 'error';

export type ProjectEntryProgress = {
  overallProgress: number;
  contentProgress: number;
  videoProgress: number;
  phase: ProjectEntryPhase;
  message: string;
  videoSnapshot?: VideoReadinessSnapshot;
};

export type ProjectEntryResult = {
  projectId: string;
  projectReady: boolean;
  videoWarm: boolean;
  releasedBy: 'ready' | 'max-wait';
  elapsedMs: number;
};

type PrepareProjectEntryInput = {
  projectId: string;
  videoSrc?: string | null;
  loadProject: () => Promise<unknown>;
  minDurationMs?: number;
  maxDurationMs?: number;
  onProgress?: (progress: ProjectEntryProgress) => void;
  // Called as soon as content is loaded so the caller can render the page behind
  // the overlay. The gate continues waiting for the managed video to play.
  onContentReady?: () => void;
};

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth < 768
  );
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function getPhaseMessage(phase: ProjectEntryPhase): string {
  switch (phase) {
    case 'starting':             return 'Opening case study';
    case 'loading-content':      return 'Loading project brief';
    case 'loading-video':        return 'Preparing hero video';
    case 'waiting-for-playback': return 'Starting video';
    case 'ready':                return 'Opening now';
    case 'timeout':              return 'Opening case study';
    case 'error':                return 'Opening case study';
  }
}

function derivePhase(
  contentReady: boolean,
  videoSnap: VideoReadinessSnapshot | null,
  hasVideo: boolean
): ProjectEntryPhase {
  if (!contentReady) return 'loading-content';
  if (!hasVideo) return 'loading-content';
  if (!videoSnap || videoSnap.phase === 'idle') return 'loading-video';
  if (videoSnap.phase === 'metadata' || videoSnap.phase === 'buffering') return 'loading-video';
  if (videoSnap.phase === 'canplay') return 'waiting-for-playback';
  if (videoSnap.phase === 'playing') return 'ready';
  if (videoSnap.phase === 'timeout') return 'timeout';
  if (videoSnap.phase === 'error') return 'error';
  return 'loading-video';
}

export async function prepareProjectEntry({
  projectId,
  videoSrc,
  loadProject,
  minDurationMs = 900,
  maxDurationMs,
  onProgress,
  onContentReady,
}: PrepareProjectEntryInput): Promise<ProjectEntryResult> {
  const mobile = isMobile();
  const effectiveMaxMs = maxDurationMs ?? (mobile ? 3500 : 6000);

  const startedAt = Date.now();
  let projectReady = false;
  let done = false;
  let lastVideoSnap: VideoReadinessSnapshot | null = null;
  let rafId: number | null = null;
  const hasVideo = Boolean(videoSrc);
  let contentReadyAt: number | null = null;

  const reportProgress = (finalOverride?: Partial<ProjectEntryProgress>) => {
    if (!onProgress) return;
    const elapsed = Date.now() - startedAt;
    const minFraction = Math.min(1, elapsed / minDurationMs);
    const contentFraction = projectReady ? 1 : 0;

    // Raw video fraction from tracker milestones (0–89% max until playing)
    const rawVideoFraction = lastVideoSnap
      ? lastVideoSnap.progress / 100
      : hasVideo ? 0 : 1;

    // Once content is ready and we're waiting for the managed video to play,
    // slowly creep the bar from its current position toward 99% so the user
    // sees steady per-second movement instead of a frozen number.
    let videoFraction = rawVideoFraction;
    if (
      contentReadyAt !== null &&
      lastVideoSnap !== null &&
      (lastVideoSnap.phase === 'canplay' || lastVideoSnap.phase === 'buffering') &&
      rawVideoFraction >= 0.35 // only creep once buffering is underway
    ) {
      const waitedMs = Date.now() - contentReadyAt;
      const creepDuration = Math.max(3000, effectiveMaxMs * 0.5);
      const creepFraction = Math.min(1, waitedMs / creepDuration);
      // Ease-in: starts slow, accelerates gently
      const eased = creepFraction * creepFraction;
      videoFraction = rawVideoFraction + (0.99 - rawVideoFraction) * eased;
    }

    const overall = contentFraction * 0.25 + videoFraction * 0.65 + minFraction * 0.10;
    const phase = derivePhase(projectReady, lastVideoSnap, hasVideo);

    onProgress({
      overallProgress: Math.round(Math.min(done ? 100 : 99, overall * 100)),
      contentProgress: Math.round(contentFraction * 100),
      videoProgress: Math.round(videoFraction * 100),
      phase,
      message: getPhaseMessage(phase),
      videoSnapshot: lastVideoSnap ?? undefined,
      ...finalOverride,
    });
  };

  const scheduleRaf = () => {
    if (done || typeof window === 'undefined') return;
    rafId = window.requestAnimationFrame(() => {
      reportProgress();
      scheduleRaf();
    });
  };

  // Emit initial progress immediately
  reportProgress();
  scheduleRaf();

  const projectPromise = Promise.resolve()
    .then(loadProject)
    .then(() => {
      projectReady = true;
      reportProgress();
    })
    .catch(() => {
      // Treat content error as ready so the gate never stalls on a module failure
      projectReady = true;
    });

  // unsubVideo is assigned synchronously inside the Promise constructor below
  let unsubVideo: () => void = () => undefined;

  const videoReadyPromise: Promise<boolean> = hasVideo && videoSrc
    ? new Promise<boolean>((resolve) => {
        // Start the tracker (no-op if already started for this src).
        // The warmup video buffers only — it never calls play().
        prepareVideoForEntry(videoSrc, { maxWaitMs: effectiveMaxMs });

        // Subscribe once: drives both progress reporting and gate resolution.
        // We resolve on isPlaying (set by markManagedVideoPlaying from the visible
        // ManagedHeroVideo element) rather than on phase === 'playing' (which the
        // warmup element would have set). This ensures the overlay stays up until
        // the video the user can actually see has started playing.
        const unsub = subscribeVideoReadiness(videoSrc, (snap) => {
          lastVideoSnap = snap;
          reportProgress();
          if (snap.isPlaying) {
            resolve(true);
          } else if (snap.phase === 'timeout' || snap.phase === 'error') {
            resolve(false);
          }
        });
        unsubVideo = unsub;
      })
    : Promise.resolve(true);

  const readyPromise = (async () => {
    await projectPromise;
    // Content is ready — fire the callback so the caller can render the page
    // behind the overlay. The gate continues waiting for the managed video.
    contentReadyAt = Date.now();
    onContentReady?.();
    await videoReadyPromise;
    return 'ready' as const;
  })();

  const releasedBy = await Promise.race([
    readyPromise,
    delay(effectiveMaxMs).then(() => 'max-wait' as const),
  ]);

  // Enforce minimum overlay duration
  const elapsed = Date.now() - startedAt;
  if (elapsed < minDurationMs) {
    await delay(minDurationMs - elapsed);
  }

  done = true;
  if (rafId !== null) window.cancelAnimationFrame(rafId);
  unsubVideo();

  // Final report at 100%
  const finalPhase: ProjectEntryPhase = releasedBy === 'max-wait' ? 'timeout' : 'ready';
  onProgress?.({
    overallProgress: 100,
    contentProgress: 100,
    videoProgress: lastVideoSnap ? lastVideoSnap.progress : hasVideo ? 0 : 100,
    phase: finalPhase,
    message: getPhaseMessage(finalPhase),
    videoSnapshot: lastVideoSnap ?? undefined,
  });

  return {
    projectId,
    projectReady,
    videoWarm: lastVideoSnap?.isPlaying ?? false,
    releasedBy,
    elapsedMs: Date.now() - startedAt,
  };
}
