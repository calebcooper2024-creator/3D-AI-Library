import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HandwrittenNote = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-['Caveat',_'Comic_Sans_MS',_cursive] text-purple-500 text-xl transform -rotate-2 max-w-xs ${className}`}>
    {children}
  </div>
);

export const BeforeAfter = ({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: React.ReactNode, after: React.ReactNode, beforeLabel?: string, afterLabel?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-12">
    <div className="relative border border-dashed border-gray-300 p-8 flex flex-col items-center bg-white shadow-sm">
      <span className="absolute -top-3 left-8 bg-white px-2 font-mono text-xs text-purple-400 uppercase">{beforeLabel}</span>
      {before}
    </div>
    <div className="relative border border-dashed border-gray-300 p-8 flex flex-col items-center bg-gray-50/50 shadow-sm">
      <span className="absolute -top-3 left-8 bg-white px-2 font-mono text-xs text-purple-400 uppercase">{afterLabel}</span>
      {after}
    </div>
  </div>
);

export const BubbleDiagram = ({ title, items }: { title: string, items: {label: string, size: number, color: string}[] }) => (
  <div className="flex flex-col items-center my-12 w-full">
    {title && <h4 className="font-serif mb-8 text-center text-lg">{title}</h4>}
    <div className="flex flex-wrap justify-center items-end gap-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
           <div 
             className={`rounded-full flex items-center justify-center text-white font-bold transition-all duration-700 hover:scale-110 shadow-lg ${item.color}`}
             style={{ width: `${item.size}px`, height: `${item.size}px` }}
           >
             {item.size > 50 && item.label.substring(0, 1)}
           </div>
           {item.size > 40 && <span className="text-xs font-mono opacity-60 text-center max-w-[80px] leading-tight">{item.label}</span>}
        </div>
      ))}
    </div>
  </div>
);

export const ProcessFlow = ({ steps }: { steps: string[] }) => (
  <div className="flex items-center justify-center w-full my-12 py-8 overflow-x-auto gap-4">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <div className="border border-purple-300 rounded-full px-6 py-3 font-mono text-xs text-purple-800 whitespace-nowrap bg-white shadow-sm">
          {step}
        </div>
        {i < steps.length - 1 && <ArrowRight className="text-purple-300 w-4 h-4 flex-shrink-0" />}
      </React.Fragment>
    ))}
  </div>
);
