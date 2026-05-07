export const HEAVY_MOTION_EVENT = 'portfolio:heavy-motion';

export type HeavyMotionDetail = {
  active: boolean;
  source?: string;
  reason?: string;
  activeSources: string[];
  timestamp: number;
};

const activeSources = new Set<string>();

function dispatchHeavyMotion(source?: string, reason?: string) {
  if (typeof window === 'undefined') return;

  const detail: HeavyMotionDetail = {
    active: activeSources.size > 0,
    source,
    reason,
    activeSources: Array.from(activeSources),
    timestamp: Date.now(),
  };

  window.dispatchEvent(new CustomEvent<HeavyMotionDetail>(HEAVY_MOTION_EVENT, { detail }));
}

export function setHeavyMotion(source: string, active: boolean, reason?: string) {
  if (!source) return;

  if (active) {
    activeSources.add(source);
  } else {
    activeSources.delete(source);
  }

  dispatchHeavyMotion(source, reason);
}

export function clearAllHeavyMotion(reason = 'clear-all') {
  activeSources.clear();
  dispatchHeavyMotion(undefined, reason);
}

export function createHeavyMotionSettler(source: string, idleMs = 650) {
  let idleTimer: number | null = null;
  let disposed = false;

  const clearTimer = () => {
    if (idleTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(idleTimer);
      idleTimer = null;
    }
  };

  const markActive = (reason = 'active') => {
    if (disposed || typeof window === 'undefined') return;

    setHeavyMotion(source, true, reason);
    clearTimer();

    idleTimer = window.setTimeout(() => {
      idleTimer = null;
      setHeavyMotion(source, false, 'settled');
    }, idleMs);
  };

  const end = (reason = 'end') => {
    if (disposed) return;
    clearTimer();
    setHeavyMotion(source, false, reason);
  };

  const dispose = () => {
    disposed = true;
    clearTimer();
    setHeavyMotion(source, false, 'dispose');
  };

  return {
    markActive,
    end,
    dispose,
  };
}
