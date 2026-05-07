import React from 'react';
import { cn } from '../lib/utils';

export interface LibraryShelfBookLink {
  id: string;
  title: string;
  subtitle: string;
  coverImage?: string;
  author?: string;
}

const wrinkledPaperStyle: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.34), transparent 26%)",
    "radial-gradient(circle at 82% 14%, rgba(191,106,59,0.08), transparent 24%)",
    "linear-gradient(180deg, rgba(246,241,233,0.96), rgba(214,206,196,0.94))",
    "url('/paper-texture.jpg')",
    "url('/assets/img/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2-910a4fce28.jpg')",
  ].join(', '),
  backgroundSize: 'auto, auto, auto, 340px auto, 760px auto',
  backgroundPosition: 'center, center, center, center, center',
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat, repeat',
  backgroundBlendMode: 'normal, normal, normal, multiply, multiply',
};

const wrinkledPaperSoftStyle: React.CSSProperties = {
  backgroundImage: [
    "linear-gradient(180deg, rgba(250,246,240,0.92), rgba(235,229,221,0.94))",
    "url('/paper-texture.jpg')",
    "url('/assets/img/614f353f1e11a6a7afdd8b74_6059a3e2b9ae6d2bd508685c_pt-texture-2-910a4fce28.jpg')",
  ].join(', '),
  backgroundSize: 'auto, 320px auto, 700px auto',
  backgroundPosition: 'center, center, center',
  backgroundRepeat: 'no-repeat, repeat, repeat',
  backgroundBlendMode: 'normal, multiply, multiply',
};

interface LibraryShelfPickProps {
  book: LibraryShelfBookLink;
  onNavigate: (id: string) => void;
  className?: string;
}

export const LibraryShelfPick: React.FC<LibraryShelfPickProps> = ({
  book,
  onNavigate,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-black/10 px-6 py-7 shadow-[0_20px_60px_rgba(29,29,27,0.08)] md:px-8 md:py-8',
        className
      )}
      style={wrinkledPaperStyle}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.32em] text-black/55">
            Next Shelf Pick
          </div>
          <h2
            className="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9] text-[#1d1d1b]"
            style={{ fontFamily: "'Canopee', sans-serif" }}
          >
            Keep moving through the library.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-black/65 md:text-base">
            Jump straight into the next book on the shelf without backing out of the current page.
          </p>
        </div>

        <button
          onClick={() => onNavigate(book.id)}
          className="group flex w-full items-center gap-5 rounded-[22px] border border-black/10 p-4 text-left transition-transform duration-300 hover:-translate-y-1 hover:border-black/20 md:max-w-xl"
          aria-label={`Open next shelf book: ${book.title}`}
          style={wrinkledPaperSoftStyle}
        >
          <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/10 bg-black/5 shadow-sm">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="h-full w-full bg-[#cdc6be]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/45">
              Shelf Order
            </div>
            <div className="mt-2 text-2xl leading-tight text-[#1d1d1b] md:text-[2rem]">
              {book.title}
            </div>
            <div className="mt-2 text-sm leading-6 text-black/60 md:text-[0.95rem]">
              {book.subtitle}
            </div>
          </div>

          <div className="shrink-0 font-mono text-2xl text-black/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black/65">
            -&gt;
          </div>
        </button>
      </div>
    </div>
  );
};

export default LibraryShelfPick;
