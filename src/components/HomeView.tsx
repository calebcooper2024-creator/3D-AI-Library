import React, { useRef, useState } from 'react';
import { Book } from './Book';
import { ShelfBook } from './Bookshelf';
import { aboutMeBook } from '../data/aboutMe';
import { aiLibraryBook } from '../data/aiLibraryBook';
import { projects } from '../data/portfolio';
import { works } from '../data/works';
import { motion, AnimatePresence } from 'motion/react';

export const HomeView = ({
  onSelectBook,
  isTransitioning = false,
}: {
  onSelectBook: (id: string) => void;
  isTransitioning?: boolean;
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const cellcoreBook = projects.find(p => p.id === 'cellcore') || projects[0];
  const summitHealthBook = projects.find(p => p.id === 'summit-health') || projects[0];
  const resumeWork = works.find(w => w.id === 'resume');

  const featuredBooks = [
    { ...aboutMeBook },
    { ...aiLibraryBook },
    { ...cellcoreBook },
    { ...summitHealthBook },
    ...(resumeWork ? [{ ...resumeWork }] : []),
  ];

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
        for (let i = 0; i < frameCount; i++) {
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
      // audio is decorative
    }
  };

  const handleBookClick = (id: string) => {
    if (openingId || isTransitioning) return;
    setOpeningId(id);
    playPageTurnSound();
    window.requestAnimationFrame(() => {
      onSelectBook(id);
    });
  };

  const step = 262; // Matches Bookshelf.tsx
  const totalWidth = featuredBooks.length * step;

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center bg-transparent relative overflow-hidden ${
        isTransitioning ? 'pointer-events-none' : ''
      }`}
    >
      {/* Ambient decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] border border-[#c9a04e]/5 rounded-full" />
        <div className="absolute w-[600px] h-[600px] border border-[#c9a04e]/5 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-[#c9a04e]/5 rounded-full" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        {/* Using the same structure as Bookshelf.tsx for consistent hover and spacing */}
        <div 
          className={`bookshelf-container flex items-center justify-center ${openingId ? 'has-opening-book' : ''}`}
          style={{ width: '100%', height: '540px' }}
        >
          <div 
            className="book-stage relative flex transform-gpu will-change-transform" 
            style={{ width: `${totalWidth}px`, height: '100%' }}
          >
            {featuredBooks.map((book, idx) => {
              const isOpening = openingId === book.id;
              return (
                <div
                  key={book.id}
                  className="book-item-wrapper absolute top-0 transition-transform duration-500 ease-out transform-gpu z-10 hover:z-[60]"
                  style={{ 
                    left: `${idx * step}px`, 
                    height: '100%',
                    zIndex: isOpening ? 200 : featuredBooks.length - idx 
                  }}
                  onMouseEnter={() => setHoveredId(book.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <Book 
                      book={book as ShelfBook} 
                      isOpening={isOpening}
                      isHovered={hoveredId === book.id}
                    />
                  </div>

                  <div className="absolute -bottom-16 h-6 w-full flex justify-center pointer-events-none">
                    <AnimatePresence>
                      {hoveredId === book.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="font-mono text-[9px] text-[#c9a04e] tracking-[0.3em] uppercase whitespace-nowrap"
                        >
                          Open to Explore
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-1/2 bottom-0 w-[1px] h-20 bg-gradient-to-t from-[#c9a04e]/10 to-transparent -translate-x-1/2" />
    </div>
  );
};
