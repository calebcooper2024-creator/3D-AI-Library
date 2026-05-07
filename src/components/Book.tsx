import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { ShelfBook } from './Bookshelf';

export const Book = ({ 
  book, 
  onClick = () => undefined,
  index = 0,
  isOpening = false,
  isHovered = false,
}: { 
  book: ShelfBook; 
  onClick?: () => void;
  index?: number;
  isOpening?: boolean;
  isHovered?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [openingOffset, setOpeningOffset] = useState({ x: 0, y: 0, scale: 1.85 });

  useEffect(() => {
    if (!isOpening || !cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const currentCenterX = rect.left + rect.width / 2;
    const currentCenterY = rect.top + rect.height / 2;
    const scaleX = window.innerWidth / 600;
    const scaleY = window.innerHeight / 640;
    const dynamicScale = Math.min(scaleX, scaleY, 2);
    const targetCenterX = window.innerWidth / 2;
    const targetCenterY = window.innerHeight / 2;

    setOpeningOffset({
      x: targetCenterX - currentCenterX,
      y: targetCenterY - currentCenterY,
      scale: dynamicScale,
    });
  }, [isOpening]);

  return (
    <div 
      ref={cardRef}
      className={`book-card-container group relative perspective-container ${isOpening ? 'is-opening' : ''}`}
      onClick={onClick}
      style={{
        '--dynamic-scale': openingOffset.scale,
        transform: isOpening
          ? `translateX(${openingOffset.x}px) translateY(${openingOffset.y}px)`
          : 'translateX(0px) translateY(0px)',
        transition: 'transform 1.5s cubic-bezier(0.65, 0, 0.35, 1)',
      } as React.CSSProperties}
    >
      <div className="book-card">
        {/* Back Cover & Pages Group (stationary) */}
        <div className="book-back-group">
           <div className="book-face bg-white border-l border-gray-200" style={{ backgroundColor: book.coverColor, opacity: 0.1 }} />
           <div className="book-face bg-[#eaeaea]" style={{ transform: 'translateZ(-1px)' }}>
             <div className="absolute inset-y-0 left-0 right-0 bg-white shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] border-l border-[#eee] flex flex-col pt-16 px-12">
               <div className="book-inside-content opacity-0 flex flex-col gap-6 w-full h-full">
                  <div className="w-1/3 h-4 bg-gray-200 rounded-sm" />
                  <div className="flex flex-col gap-3">
                    <div className="w-full h-2 bg-gray-100 rounded-sm" />
                    <div className="w-5/6 h-2 bg-gray-100 rounded-sm" />
                    <div className="w-full h-2 bg-gray-100 rounded-sm" />
                    <div className="w-4/5 h-2 bg-gray-100 rounded-sm" />
                  </div>
                  
                  <div className="mt-8 flex items-center justify-center flex-grow opacity-50 pb-16">
                     <div className="w-6 h-6 rounded-full border-2 border-black/20 border-t-black" />
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* Spine */}
        <div 
          className={cn("book-spine overflow-hidden", book.textureClass || 'texture-paper')}
          style={{ backgroundColor: book.spineColor, color: book.spineTextColor || book.textColor }}
        >
           <div className="absolute w-[200%] h-[200%] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
           {book.spineContent ? (
              book.spineContent
           ) : (
             <>
               <span 
                  className={cn("text-sm tracking-widest whitespace-nowrap opacity-50 absolute", book.fontTitle)}
                  style={{ top: '4rem', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}
               >
                  No. 0{index + 1}
               </span>
               <h3 
                  className={cn(
                    "text-xl font-bold whitespace-nowrap tracking-wider absolute w-[500px] text-center",
                    book.title.length > 20 ? "text-lg" : "text-xl",
                    book.fontTitle
                  )}
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}
               >
                  {book.title}
               </h3>
               <span 
                  className="w-2 h-2 rounded-full bg-current opacity-50 absolute"
                  style={{ bottom: '3rem', left: '50%', transform: 'translateX(-50%)' }}
               />
             </>
           )}
        </div>

        {/* Flapping pages */}
        <div className="book-page-flap page-flap-1 bg-[#f4f4f4] border-l border-[#eee]" />
        <div className="book-page-flap page-flap-2 bg-[#f9f9f9] border-l border-[#eee]" />

        {/* Front Cover Group (swings open) */}
        <div className="book-cover-group">
          {/* Inside Cover */}
          <div className="book-face book-inside-cover-face bg-[#eaeaea] border-r border-gray-200" style={{ transform: 'translateZ(-1px) rotateY(180deg)' }}>
            <div className="absolute inset-y-1 left-1 right-0 bg-[#f4f4f4] rounded-r-md shadow-sm border-r border-[#eee]" style={{ transform: 'translateZ(1px)' }} />
          </div>

          {/* Front Cover Face */}
          <div 
            className={cn("book-face book-front-cover-face flex flex-col justify-end overflow-hidden", book.textureClass || 'texture-paper')} 
            style={{ backgroundColor: book.coverColor, color: book.textColor, transform: 'translateZ(1px)' }}
          >
             {book.coverImage && (
               <div 
                 className="absolute inset-0 opacity-20 mix-blend-multiply bg-cover bg-center"
                 style={{ backgroundImage: `url(${book.coverImage})` }}
               />
             )}
              {book.coverContent ? (
                book.coverContent
              ) : (
                <div className="relative z-10 p-8">
                   <h2 className={cn(
                     "font-bold leading-tight mb-2 tracking-tight",
                     book.title.length > 20 ? "text-2xl" : "text-4xl",
                     book.fontTitle
                   )}>
                     {book.title}
                   </h2>
                   <p className="text-base opacity-80 mt-2 font-mono">{book.subtitle}</p>
                </div>
              )}
              {!book.coverContent && book.showAuthorBadge !== false && (
                <div className="pointer-events-none absolute bottom-6 right-6 z-20 rounded-sm border border-current/20 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-current backdrop-blur-[2px]">
                  By {book.author}
                </div>
              )}
           </div>
         </div>
      </div>
    </div>
  );
};
