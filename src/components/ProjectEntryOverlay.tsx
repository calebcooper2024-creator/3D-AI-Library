import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

const PHASE_MESSAGES: Record<string, string> = {
  starting:               'Your book is loading, please be patient',
  'loading-content':      'Your book is loading, please be patient',
  'loading-video':        'Your book is loading, please be patient',
  'waiting-for-playback': 'Almost ready, hang tight',
  ready:                  'Opening now',
  timeout:                'Opening now',
  error:                  'Opening now',
};

type ProjectEntryOverlayProps = {
  visible: boolean;
  title?: string | null;
  progress?: number; // 0–100
  phase?: string;
};

export function ProjectEntryOverlay({
  visible,
  title,
  progress = 0,
  phase = 'starting',
}: ProjectEntryOverlayProps) {
  const statusText = PHASE_MESSAGES[phase] ?? 'Opening case study';
  const pct = Math.round(Math.max(0, Math.min(100, progress)));

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="project-entry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgba(20,18,16,0.58)] px-6 backdrop-blur-md"
          aria-live="polite"
          aria-label={statusText}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.992 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md border border-[#dac9b7]/22 bg-[linear-gradient(180deg,rgba(249,243,235,0.96),rgba(238,229,219,0.96))] px-8 py-7 text-[#1f1a17] shadow-[0_24px_120px_rgba(0,0,0,0.28)]"
          >
            {/* Status line */}
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6e6258]">
              {statusText}
            </p>

            {/* Project title */}
            <h2 className="mt-2 font-serif text-[28px] leading-none tracking-[-0.02em] text-[#1b1714]">
              {title ?? 'Case Study'}
            </h2>

            {/* Divider */}
            <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(31,26,23,0.16),rgba(31,26,23,0.03))]" />

            {/* Progress bar */}
            <div
              className="mt-5 relative h-[3px] w-full overflow-hidden rounded-full bg-[rgba(31,26,23,0.10)]"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-[#2a2420] origin-left"
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
                }
                aria-hidden="true"
              />
            </div>

            {/* Percentage */}
            <div className="mt-3 flex justify-end">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7d7065]">
                {pct}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
