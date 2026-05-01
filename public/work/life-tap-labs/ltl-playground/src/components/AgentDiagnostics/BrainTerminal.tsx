import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, ChevronRight } from 'lucide-react';

interface BrainTerminalProps {
  agent: any;
  isSystemHalted?: boolean;
}

export const BrainTerminal: React.FC<BrainTerminalProps> = ({ agent, isSystemHalted }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockThoughts = [
    "Analyzing context window for brand alignment...",
    "Retrieving embedded design patterns from vector store...",
    "Validating JSON schema for downstream transmission...",
    "Synthesizing creative variance with temperature 0.3...",
    "Cross-referencing brand_manifesto.pdf for compliance...",
    "Optimizing reasoning path for efficiency...",
    "A2A handshake initiated with A03...",
    "Memory pruning complete: 12% context recovered.",
    "Evaluating first-pass acceptance probability: 0.72",
    "Applying self-correction logic for viewport constraints...",
    "Generating completion tokens: 850K target...",
    "Context caching hit: Reusing DESIGN.md structure.",
    "Monitoring tool success rate: 99.8% stable.",
    "Executing validate_color_contrast_wcag_aaa()...",
  ];

  useEffect(() => {
    setLogs([]);
    if (isSystemHalted) return;

    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, mockThoughts[Math.floor(Math.random() * mockThoughts.length)]];
        return next.slice(-12);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [agent, isSystemHalted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-full bg-slate-950 rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-blue-400" />
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Cognition Trace: {agent.id}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 font-mono text-[10px] space-y-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2"
            >
              <span className="text-blue-500/50 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className="text-blue-400/30 shrink-0">SYS_LOG:</span>
              <span className="text-slate-300 leading-relaxed">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isSystemHalted && (
          <div className="flex items-center gap-2 text-blue-400 animate-pulse">
            <ChevronRight size={12} />
            <span className="w-2 h-4 bg-blue-400/50" />
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/5 bg-white/[0.02] flex items-center gap-3">
        <div className="flex-1 h-6 bg-black/50 rounded-lg border border-white/5 px-2 flex items-center">
          <span className="text-[9px] font-mono text-blue-400/50">Override command...</span>
        </div>
        <button className="p-1 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 transition-all">
          <Send size={12} />
        </button>
      </div>
    </div>
  );
};
