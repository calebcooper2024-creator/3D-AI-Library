import React, { useRef, useState } from 'react';
import { Book } from './Book';
import { motion } from 'motion/react';

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
  coverContent?: React.ReactNode;
  spineContent?: React.ReactNode;
  showAuthorBadge?: boolean;
}

export const Bookshelf = ({ 
  books, 
  onSelectBook,
  isTransitioning = false
}: { 
  books: ShelfBook[];
  onSelectBook: (id: string) => void;
  isTransitioning?: boolean;
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

  // Tracks which specific rendered instance (id-copyIndex) is animating open
  const [openingInstanceKey, setOpeningInstanceKey] = useState<string | null>(null);

  const handleSelectInstance = (id: string, instanceKey: string) => {
    if (isTransitioning || openingInstanceKey) return;

    // Mark this instance as opening (triggers is-opening CSS)
    setOpeningInstanceKey(instanceKey);

    // Play page-turn sound immediately on click
    playPageTurnSound();

    // Let the 3D book opening animation play for ~2s, then notify parent
    // (parent will fire the paper curtain and navigate)
    setTimeout(() => {
      onSelectBook(id);
    }, 2000);
  };

  const spine = 72;
  const projectedFace = 188;
  const gap = 2;
  const step = spine + projectedFace + gap;
  const cycleWidth = books.length * step;
  const displayedBooks = React.useMemo(
    () => Array.from({ length: 3 }, (_, copyIndex) =>
      books.map((book, bookIndex) => ({ book, bookIndex, copyIndex }))
    ).flat(),
    [books]
  );
  
  const shelfRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const offset = React.useRef(0);
  const velocity = React.useRef(0);
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = shelfRef.current;
    const stage = stageRef.current;
    if (!el || cycleWidth === 0) return;

    const applyTransform = () => {
      if (!stage) return;
      const normalizedOffset = ((offset.current % cycleWidth) + cycleWidth) % cycleWidth;
      stage.style.transform = `translate3d(${-cycleWidth - normalizedOffset}px, 0, 0)`;
    };

    const animate = () => {
      offset.current += velocity.current;
      velocity.current *= 0.88;
      applyTransform();

      if (Math.abs(velocity.current) > 0.1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        velocity.current = 0;
        rafId.current = null;
      }
    };

    const handleWheelEvent = (e: WheelEvent) => {
      if (isTransitioning) return;
      const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominantDelta) < 0.01) return;

      e.preventDefault();
      velocity.current += dominantDelta * 0.16;
      velocity.current = Math.max(-32, Math.min(32, velocity.current));

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    applyTransform();
    el.addEventListener('wheel', handleWheelEvent, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheelEvent);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [cycleWidth, isTransitioning]);

  return (
    <div 
      ref={shelfRef}
      className={`min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-transparent hide-scrollbar ${isTransitioning ? 'pointer-events-none' : ''}`}
    >
      
      <div className={`bookshelf-container px-32 flex items-center${openingInstanceKey ? ' has-opening-book' : ''}`}>
          <div ref={stageRef} className="book-stage relative flex transform-gpu will-change-transform" style={{ 
              width: `${displayedBooks.length * step}px`, 
              height: '540px'
          }}>
            {displayedBooks.map(({ book, bookIndex, copyIndex }, index) => {
              const bookLeft = index * step;
              const instanceKey = `${book.id}-${copyIndex}`;
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
    </div>
  );
};
