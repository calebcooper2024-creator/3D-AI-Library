import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BookProject } from '../data/portfolio';
import { cn } from '../lib/utils';
import { WebflowNav } from './Navigation';

export const CaseStudyDetail: React.FC<{
  book: BookProject;
  onClose: () => void;
  onExploreLibrary?: () => void;
}> = ({
  book,
  onClose,
  onExploreLibrary,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#e2dedb] relative"
    >
      <WebflowNav onBack={onClose} backLabel="Back To Library" hideUntilScroll={false} revealOnHover />

      <main className="w-full">
        {book.sections.map((section, idx) => {
          if (section.fullWidthContent) {
            return (
              <div
                key={section.id}
                className={cn(
                  'w-full min-h-[50vh] flex flex-col border-b split-border relative',
                  section.bgColorLeft && section.bgColorLeft,
                  section.textColorLeft && section.textColorLeft
                )}
              >
                {section.fullWidthContent}
              </div>
            );
          }

          return (
            <div
              key={section.id}
              className="w-full min-h-[90vh] flex flex-col md:flex-row border-b split-border"
            >
              <div
                className={cn(
                  'w-full md:w-1/2 p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r split-border',
                  'flex flex-col relative overflow-hidden',
                  section.bgColorLeft && section.bgColorLeft,
                  section.textColorLeft && section.textColorLeft
                )}
              >
                <div className="md:sticky md:top-24 w-full h-full flex flex-col justify-between">
                  {section.leftTitle && (
                    <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] opacity-72">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <span className="inline-block w-8 border-t border-current opacity-40" />
                      <span>{section.leftTitle}</span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    {section.leftContent}
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'w-full md:w-1/2 p-8 md:p-16 lg:p-24 relative',
                  section.bgColorRight && section.bgColorRight,
                  section.textColorRight && section.textColorRight
                )}
              >
                <div className="w-full max-w-2xl mx-auto h-full flex flex-col justify-center">
                  {section.rightContent}
                </div>
              </div>
            </div>
          );
        })}

        {book.id === 'ai-library' && onExploreLibrary && (
          <section className="w-full border-b split-border bg-[#f3ede5] px-8 py-16 text-[#171312] md:px-16 lg:px-24">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-8 border border-black/10 bg-white/70 p-8 shadow-[0_18px_48px_rgba(0,0,0,0.04)]">
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9f6b12]">
                  Library Navigation
                </p>
                <p className="font-serif text-2xl leading-tight text-[#171312]">
                  Explore the Library
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreLibrary}
                className="shrink-0 border border-black/15 bg-[#171312] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-black"
              >
                Explore the Library
              </button>
            </div>
          </section>
        )}
      </main>
    </motion.div>
  );
};
