type ManagedVideoRecord = {
  id: string;
  video: HTMLVideoElement;
};

const managedVideos = new Map<string, ManagedVideoRecord>();
let activeVideoId: string | null = null;

export function registerManagedVideo(id: string, video: HTMLVideoElement) {
  managedVideos.set(id, { id, video });

  return () => {
    const existing = managedVideos.get(id);

    if (existing?.video === video) {
      existing.video.pause();
      managedVideos.delete(id);
    }

    if (activeVideoId === id) {
      activeVideoId = null;
    }
  };
}

export function pauseManagedVideo(id: string) {
  const record = managedVideos.get(id);
  if (!record) return;

  record.video.pause();

  if (activeVideoId === id) {
    activeVideoId = null;
  }
}

export function pauseAllManagedVideos() {
  for (const record of managedVideos.values()) {
    record.video.pause();
  }

  activeVideoId = null;
}

export async function requestManagedVideoPlayback(id: string) {
  const target = managedVideos.get(id);
  if (!target) return;

  if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
    pauseManagedVideo(id);
    return;
  }

  for (const [otherId, record] of managedVideos) {
    if (otherId !== id) {
      record.video.pause();
    }
  }

  activeVideoId = id;

  try {
    await target.video.play();
  } catch {
    // Decorative video must never break navigation or rendering.
  }
}

export function getActiveManagedVideoId() {
  return activeVideoId;
}
