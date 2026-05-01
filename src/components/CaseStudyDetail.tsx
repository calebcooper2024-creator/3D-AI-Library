import React, { useEffect } from 'react';
import { BookProject } from '../data/portfolio';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { WebflowNav } from './Navigation';

export const CaseStudyDetail: React.FC<{ 
  book: BookProject;
  onClose: () => void;
}> = ({ 
  book,
  onClose
}) => {

  // Simple scroll to top on mount
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
      <WebflowNav onBack={onClose} />
      
      <main className="w-full">
        {book.sections.map((section, idx) => {
          if (section.fullWidthContent) {
            return (
              <div 
                key={section.id} 
                className={cn(
                  "w-full min-h-[50vh] flex flex-col border-b split-border relative",
                  section.bgColorLeft && section.bgColorLeft, // we can use bgColorLeft for full width bg
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
              {/* Left Section - fixed position feeling on desktop */}
              <div 
                className={cn(
                  "w-full md:w-1/2 p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r split-border",
                  "flex flex-col relative overflow-hidden",
                  section.bgColorLeft && section.bgColorLeft,
                  section.textColorLeft && section.textColorLeft
                )}
              >
                <div className="md:sticky md:top-24 w-full h-full flex flex-col justify-between">
                   {section.leftTitle && (
                      <div className="font-mono text-xs tracking-widest uppercase mb-12 opacity-80">
                        — {String(idx + 1).padStart(2, '0')} — <br/>
                        {section.leftTitle}
                      </div>
                   )}
                   <div className="flex-1 flex flex-col justify-center">
                     {section.leftContent}
                   </div>
                </div>
              </div>

              {/* Right Section - scrolling content */}
              <div 
                className={cn(
                  "w-full md:w-1/2 p-8 md:p-16 lg:p-24 relative",
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
      </main>
    </motion.div>
  );
};
