import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Terminal, Cpu, Database, Command, Send } from 'lucide-react';

export default function App() {
  const [input, setInput]] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'SYSTEM ONLINE. BYC2W NEURAL NET INITIALIZED.' },
    { role: 'ai', content: 'READY FOR INPUT. WHAT DO WE BUILD TODAY?' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: `GENERATING CONSTRUCT: "${userMsg.toUpperCase()}"... SYNTHESIS COMPLETE.` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#cdc6be] font-mono selection:bg-[#96B59F] selection:text-[#0f0f0f] flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-[#2a2a2a] flex justify-between items-center backdrop-blur-md sticky top-0 z-10 bg-[#0f0f0f]/80">
        <div className="flex items-center gap-4">
          <a href="/?tab=project&project=byc2w" className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors group">
            <ArrowLeft className="w-5 h-5 text-[#96B59F] group-hover:-translate-x-1 transition-transform" />
          </a>
          <div>
            <h1 className="text-xl tracking-widest font-bold text-[#96B59F]">BYC2W PLAYGROUND</h1>
            <p className="text-xs text-[#69645f] uppercase tracking-[0.2em]">Neural Synthesis Engine v1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#69645f] uppercase tracking-widest hidden md:flex">
          <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-[#96B59F]" /> Core Active</div>
          <div className="flex items-center gap-2"><Database className="w-4 h-4 text-[#96B59F]" /> Mem: 99%</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col md:flex-row gap-6 max-w-7xl w-full mx-auto">
        
        {/* Chat / Terminal Interface */}
        <div className="flex-1 flex flex-col bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl relative">
          <div className="bg-[#2a2a2a] py-2 px-4 flex items-center justify-between text-xs tracking-widest text-[#96B59F]">
            <div className="flex items-center gap-2"><Terminal className="w-4 h-4" /> TERMINAL.EXE</div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`text-xs mb-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.role === 'user' ? 'USER' : 'SYSTEM'}
                </div>
                <div className={`px-4 py-3 max-w-[80%] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-l-lg rounded-tr-lg' 
                    : 'bg-[#96B59F]/10 border border-[#96B59F]/20 text-[#96B59F] rounded-r-lg rounded-tl-lg'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#96B59F]/10 border border-[#96B59F]/20 text-[#96B59F] rounded-r-lg rounded-tl-lg px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 bg-[#96B59F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[#96B59F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[#96B59F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#1a1a1a] border-t border-[#2a2a2a]">
            <form onSubmit={handleSend} className="relative flex items-center">
              <Command className="w-5 h-5 absolute left-4 text-[#69645f]" />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter prompt to build..." 
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-[#cdc6be] rounded-lg py-4 pl-12 pr-14 focus:outline-none focus:border-[#96B59F] focus:ring-1 focus:ring-[#96B59F] transition-all"
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-3 p-2 bg-[#96B59F] text-[#0f0f0f] rounded-md hover:bg-[#a7c5b0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Output Visualization */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 shadow-2xl flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#96B59F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            {messages.length > 2 ? (
              <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-48 h-48 border-2 border-[#96B59F] rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute w-40 h-40 border border-[#cdc6be] rounded-full animate-spin-reverse-slow" style={{ animationDuration: '15s' }}></div>
                </div>
                <div className="z-10 text-center space-y-4">
                  <Sparkles className="w-12 h-12 text-[#96B59F] mx-auto animate-pulse" />
                  <p className="text-[#96B59F] tracking-widest text-sm uppercase">Construct Generated</p>
                  <p className="text-xs text-[#69645f] max-w-[200px] mx-auto">Neural pathways aligned based on latest input vector.</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-50">
                <div className="w-24 h-24 border border-dashed border-[#69645f] rounded-lg mx-auto flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#69645f] rounded-full animate-ping"></div>
                </div>
                <p className="text-xs tracking-widest uppercase">Awaiting Input</p>
              </div>
            )}
          </div>
          
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 shadow-2xl">
            <h3 className="text-xs uppercase tracking-widest text-[#96B59F] mb-4 flex items-center gap-2"><Database className="w-4 h-4" /> System Logs</h3>
            <div className="space-y-3 font-mono text-[10px] text-[#69645f]">
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <span>[SYS] Initialization</span>
                <span className="text-[#27c93f]">OK</span>
              </div>
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <span>[NET] Child Protocol</span>
                <span className="text-[#27c93f]">LOADED</span>
              </div>
              <div className="flex justify-between border-b border-[#2a2a2a] pb-2">
                <span>[MEM] Image Buffer</span>
                <span className="text-[#ffbd2e]">ALLOCATING</span>
              </div>
              <div className="flex justify-between">
                <span>[UPL] Synapse Link</span>
                <span className="text-[#27c93f]">STABLE</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
