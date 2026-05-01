import React, { useRef, useState } from 'react';
import { Book } from './Book';
import { ShelfBook } from './Bookshelf';
import { aboutMeBook } from '../data/aboutMe';
import { motion } from 'motion/react';

export const HomeView = ({
  onSelectBook,
  isTransitioning = false,
}: {
  onSelectBook: (id: string) => void;
  isTransitioning?: boolean;
}) => {
  const [isOpening, setIsOpening] = useState(false);
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

  const handleClick = () => {
    if (isOpening || isTransitioning) return;
    setIsOpening(true);
    playPageTurnSound();
    setTimeout(() => {
      onSelectBook(aboutMeBook.id);
    }, 2000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-transparent relative overflow-hidden pt-20 ${
        isTransitioning ? 'pointer-events-none' : ''
      }`}
    >
      {/* Ambient concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[720px] h-[720px] border border-black/[0.028] rounded-full absolute" />
        <div className="w-[520px] h-[520px] border border-black/[0.038] rounded-full absolute" />
        <div className="w-[320px] h-[320px] border border-black/[0.048] rounded-full absolute" />
      </div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -8 : 0 }}
        transition={{ duration: 0.55, delay: 0.9 }}
        className="mb-14 text-center"
      >
        <p className="font-mono text-[10px] tracking-[0.55em] uppercase" style={{ color: 'rgba(0,0,0,0.2)' }}>
          Caleb Cooper · Portfolio · 2026
        </p>
      </motion.div>

      {/* The single book */}
      <div
        className={`bookshelf-container flex justify-center items-end${isOpening ? ' has-opening-book' : ''}`}
        style={{ height: '540px' }}
      >
        <div
          className="book-item-wrapper relative transition-transform duration-500 ease-out transform-gpu"
          style={{ height: '100%', zIndex: isOpening ? 200 : 10 }}
        >
          <Book
            book={aboutMeBook as unknown as ShelfBook}
            onClick={handleClick}
            index={0}
            isOpening={isOpening}
          />
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? 8 : 0 }}
        transition={{ duration: 0.55, delay: 1.1 }}
        className="mt-14 text-center"
      >
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(0,0,0,0.17)' }}>
          Open to Explore
        </p>
      </motion.div>
    </div>
  );
};
