import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, SoftShadows, ContactShadows } from '@react-three/drei';
import { FactoryScene } from './components/FactoryScene';
import { UIManager } from './components/UIManager';
import { ChatInterface } from './components/ChatInterface';
import { useFactoryStore } from './store';
import { cn } from './lib/utils';

export default function App() {
  const { isSidePanelMode, chatWidth, setChatWidth } = useFactoryStore();
  const resizerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const [isDraggingState, setIsDraggingState] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newWidth = Math.max(30, Math.min(70, (e.clientX / window.innerWidth) * 100));
      setChatWidth(newWidth);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      setIsDraggingState(false);
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setChatWidth]);

  return (
    <div className="w-full h-screen bg-[#faf8f5] overflow-hidden relative font-sans flex text-slate-800">
      
      {/* Left Chat Interface (only visible in side panel mode) */}
      <div 
        className={cn(
          "h-full overflow-hidden shrink-0",
          isSidePanelMode ? "opacity-100" : "w-0 opacity-0"
        )}
        style={{ 
           width: isSidePanelMode ? `${chatWidth}%` : '0%',
           transition: isDraggingState ? 'none' : 'width 700ms ease-in-out, opacity 700ms ease-in-out'
        }}
      >
        <ChatInterface />
      </div>

      {isSidePanelMode && (
        <div 
           ref={resizerRef}
           className="w-1.5 hover:w-2 bg-transparent hover:bg-slate-200 cursor-col-resize z-50 shrink-0 h-full"
           onMouseDown={() => {
              isDragging.current = true;
              setIsDraggingState(true);
              document.body.style.cursor = 'col-resize';
           }}
        />
      )}

      {/* Main 3D Canvas / Side Panel */}
      <div 
        className={cn(
          "h-full relative overflow-y-auto overflow-x-hidden shrink-0 flex flex-col pt-2 select-none",
          isSidePanelMode && "bg-white border text-slate-800"
        )}
        style={{ 
           width: isSidePanelMode ? `calc(${100 - chatWidth}% - 1.5rem)` : '100%',
           transition: isDraggingState ? 'none' : 'width 700ms ease-in-out, margin 700ms ease-in-out'
        }}
      >
        {isSidePanelMode && (
          <div className="flex-none p-4 pb-0 flex justify-between items-center z-10 w-full mb-2" style={{ transition: isDraggingState ? 'none' : 'opacity 700ms ease-in-out' }}>
             <h2 className="text-[14px] font-bold text-slate-800">Run Lens</h2>
             <button 
                onClick={() => useFactoryStore.getState().setIsSidePanelMode(false)}
                className="text-[12px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
             >
               Collapse 
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
             </button>
          </div>
        )}

        {isSidePanelMode && (
           <div className="flex-none px-4 text-[13px] font-semibold text-slate-800 mb-3 z-10 w-full flex items-center justify-between" style={{ transition: isDraggingState ? 'none' : 'opacity 700ms ease-in-out' }}>
              <div>Operator intent: <span className="font-normal text-slate-600">refine Nova page UI</span></div>
           </div>
        )}

        <div className={cn("relative w-full transition-all select-none origin-top shrink-0", isSidePanelMode ? "h-[50vh] min-h-[400px] bg-[#faf8f5] rounded-2xl mx-4 w-[calc(100%-2rem)] shadow-inner" : "h-full flex-1")}>
           <Canvas 
              shadows 
              camera={{ position: [2, 42, 22], fov: 42 }} 
              className="w-full h-full outline-none" 
              style={{ userSelect: 'none' }}
              onPointerMissed={() => useFactoryStore.getState().setFocusedNodePos(null)}
           >
              <SoftShadows size={15} samples={20} focus={0.5} />
              <color attach="background" args={isSidePanelMode ? ['#faf8f5'] : ['#faf8f5']} />
              
              <ambientLight intensity={1.0} color="#ffffff" />
              <directionalLight
                castShadow
                position={[10, 30, 20]}
                intensity={1.2}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
              />
              <pointLight position={[-15, 15, 5]} intensity={0.5} color="#ffffff" />
              <pointLight position={[15, 15, -5]} intensity={0.5} color="#ffffff" />

              <ContactShadows position={[0, -0.6, 0]} opacity={0.3} scale={80} blur={2.5} far={10} color="#6a6560" />
              
              <Environment preset="city" environmentIntensity={0.5} />
              
              <FactoryScene />
           </Canvas>
           
           {isSidePanelMode && (
               <RunLensOverlay />
           )}
        </div>

        {isSidePanelMode && (
           <div className="flex-none p-4 grid grid-cols-1 xl:grid-cols-3 gap-6 w-full h-auto xl:h-[180px] shrink-0" style={{ transition: isDraggingState ? 'none' : 'opacity 700ms ease-in-out' }}>
               {/* L2 lanes */}
               <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
                  <h3 className="text-xs font-bold text-slate-800 mb-4">L2 lanes</h3>
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center text-[11px] font-semibold">
                        <div className="flex items-center gap-2 text-slate-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Engineering
                        </div>
                        <span className="text-blue-500">synthesizing</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px] font-semibold">
                        <div className="flex items-center gap-2 text-slate-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Research
                        </div>
                        <span className="text-emerald-500">complete</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px] font-semibold">
                        <div className="flex items-center gap-2 text-slate-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Evaluation
                        </div>
                        <span className="text-red-500">blocked</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px] font-semibold">
                        <div className="flex items-center gap-2 text-slate-700">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Memory
                        </div>
                        <span className="text-blue-500">active</span>
                     </div>
                  </div>
               </div>

               {/* Approvals & Issues */}
               <div className="flex flex-col gap-3">
                  <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex justify-between items-center cursor-pointer hover:border-slate-200 transition-colors">
                     <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Pending approvals: 2
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div className="bg-red-50/50 rounded-xl border border-red-100 p-3 shadow-sm flex justify-between items-center cursor-pointer hover:border-red-200 transition-colors">
                     <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Blocked decisions: 1
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div className="flex-1 bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex flex-col justify-center">
                     <h3 className="text-[11px] font-bold text-slate-800 mb-2">System issues</h3>
                     <div className="flex flex-col gap-1 text-[11px] font-semibold text-slate-600">
                        <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Scribe: ingestion lag</div>
                        <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Watcher: endpoint drift</div>
                     </div>
                  </div>
               </div>

               {/* Final readiness */}
               <div className="flex flex-col gap-3">
                  <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between">
                     <div>
                        <div className="flex justify-between items-center mb-1">
                           <h3 className="text-xs font-bold text-slate-800">Final readiness: 72%</h3>
                           <span className="text-[10px] font-bold text-slate-400">72%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                           <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500">
                           Confidence posture: <span className="text-blue-500 font-bold">medium-high</span>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex justify-between items-center cursor-pointer hover:border-slate-200 transition-colors mt-auto">
                     <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                        Run history
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
               </div>
               
               <div className="xl:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
                   <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-3">
                       <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg> Brokie Truth / Memory </h3>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">Resolving contradictions in durable state. Grounding claims with canonical truth.</div>
                       <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-50">
                           <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded text-[10px] font-bold">12 Entities updated</span>
                           <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded text-[10px] font-bold">Truth alignment stable</span>
                       </div>
                   </div>

                   <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-3">
                       <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/></svg> Scribe / Settlement </h3>
                       <div className="text-[11px] text-slate-500 font-medium leading-relaxed">Executive review of composed answer payload against organizational guidelines.</div>
                       <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-50">
                           <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-[10px] font-bold">Review active</span>
                           <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded text-[10px] font-bold">Policy gap detected</span>
                       </div>
                   </div>
               </div>
           </div>
        )}

        {!isSidePanelMode && <UIManager />}
      </div>
    </div>
  );
}

function RunLensOverlay() {
  const [open, setOpen] = React.useState(true);
  
  return (
     <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
       <button 
          onClick={() => setOpen(!open)}
          className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 text-xs font-bold text-slate-700 border border-slate-200/50 shadow-sm flex items-center gap-2 hover:bg-white transition-colors pointer-events-auto"
       >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m5 17 5 3 5-3"/></svg>
          Run Lens
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform text-slate-400", open ? "rotate-0" : "rotate-180")}><path d="m6 9 6 6 6-6"/></svg>
       </button>
       {open && (
         <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-200/50 w-52 pointer-events-auto origin-top transition-all">
             <div className="flex flex-col gap-2.5">
                 {[
                   { id: 1, label: "Intent capture", status: "green" },
                   { id: 2, label: "Nova plan", status: "green" },
                   { id: 3, label: "L2 lanes", status: "blue" },
                   { id: 4, label: "L3 evidence", status: "purple" },
                   { id: 5, label: "L2 synthesis", status: "green" },
                   { id: 6, label: "Nova composition", status: "amber" },
                   { id: 7, label: "Review", status: "red" },
                   { id: 8, label: "Final readiness", status: "green", ready: true }
                 ].map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-[11px] font-semibold">
                       <div className="flex items-center gap-2.5 text-slate-700">
                          <span className="text-slate-400 w-2 text-right shrink-0">{item.id}</span>
                          {item.ready ? (
                             <div className="flex flex-col leading-tight">
                                <span className="mb-0.5">{item.label}</span>
                                <span className="text-slate-800 text-[13px] font-bold">72%</span>
                             </div>
                          ) : (
                             <span>{item.label}</span>
                          )}
                       </div>
                       <div className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          item.status === "green" ? "bg-emerald-500" :
                          item.status === "blue" ? "bg-blue-500" :
                          item.status === "purple" ? "bg-purple-500" :
                          item.status === "amber" ? "bg-amber-500" :
                          item.status === "red" ? "bg-red-500" : "bg-slate-300"
                       )} />
                    </div>
                 ))}
             </div>
         </div>
       )}
     </div>
  );
}