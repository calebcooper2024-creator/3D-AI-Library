import React from 'react';
import { Book } from './Book';
import type { ShelfBook } from './Bookshelf';

const placeholderBook: ShelfBook = {
  id: '404-under-construction',
  title: '404',
  subtitle: 'Under Construction',
  author: 'Caleb Cooper',
  spineColor: '#1e40af',
  coverColor: '#2563eb',
  textColor: '#ffffff',
  spineTextColor: '#dbeafe',
  fontTitle: 'font-sans',
  textureClass: 'texture-paper',
  coverContent: (
    <div className="absolute inset-0 bg-cover bg-center overflow-hidden shadow-[inset_0_0_90px_rgba(8,47,116,0.52)]" style={{ backgroundImage: "url('/images/books/404_cover.jpg')" }}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(37,99,235,0.4)_50%,rgba(30,64,175,0.88)_100%)]" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-blue-100/86">Reserved</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-blue-100/70">LifeTapLabs</span>
        </div>
        <div>
          <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.32em] text-blue-100/90 drop-shadow-md">Under Construction</p>
          <h2 className="font-sans font-black text-6xl tracking-[-0.08em] leading-none drop-shadow-lg">404</h2>
          <div className="mt-4 h-px w-12 bg-blue-100/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-blue-50/90 drop-shadow-md">
            This page is being built.
          </p>
        </div>
      </div>
    </div>
  ),
  spineContent: (
    <div className="absolute inset-0 bg-[#1e40af] flex flex-col items-center justify-between py-10 overflow-hidden border-r border-blue-900/30">
      <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[7px] uppercase tracking-[0.3em] text-blue-100/68 mt-3">
        Under Construction
      </span>
      <span className="[writing-mode:vertical-rl] rotate-180 font-sans font-black text-[24px] tracking-[0.16em] text-white uppercase">
        404
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-blue-100/48 rotate-90 mb-4">
        Reserved
      </span>
    </div>
  ),
};

export function Placeholder404Page() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] pt-28">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center justify-center px-10">
        <div className="flex flex-col items-center gap-10">
          <div className="pointer-events-none scale-[1.12]">
            <Book book={placeholderBook} />
          </div>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2563eb]">
              This Page Is Being Built. Check Back Soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
