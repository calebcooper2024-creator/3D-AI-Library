export const BOOK_OPENING_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
export const BOOK_OPENING_TRANSFORM_DURATION_MS = 1500;
export const BOOK_OPENING_HANDOFF_DELAY_MS = 2000;
export const BOOK_OPENING_TRANSFORM_TRANSITION = `transform ${BOOK_OPENING_TRANSFORM_DURATION_MS}ms ${BOOK_OPENING_EASE}`;

type AudioContextRef = {
  current: AudioContext | null;
};

export const playBookOpeningSound = (audioContextRef: AudioContextRef) => {
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

    if (context.state === 'suspended') {
      void context.resume().then(scheduleSound).catch(() => undefined);
    } else {
      scheduleSound();
    }
  } catch {
    // Decorative audio should never block opening a book.
  }
};
