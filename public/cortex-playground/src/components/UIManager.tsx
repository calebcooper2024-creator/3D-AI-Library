import React from 'react';
import { Camera, Maximize } from 'lucide-react';
import { useFactoryStore } from '../store';
import { cn } from '../lib/utils';

export function UIManager() {
  const { cameraMode, setCameraMode } = useFactoryStore();
  const [showRunLens, setShowRunLens] = React.useState(false);
  const [showCameraMode, setShowCameraMode] = React.useState(false);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6 flex flex-col justify-between font-sans">
      
      {/* Top Bar */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-2">
           {!showCameraMode ? (
              <button 
                 onClick={() => setShowCameraMode(true)}
                 className="bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 text-xs font-bold text-slate-700 border border-slate-200/50 shadow-sm flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-colors"
              >
                 <Camera size={14} />
                 Camera Perspective
              </button>
           ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-200/50 flex flex-col gap-2 w-64 relative">
                <button onClick={() => setShowCameraMode(false)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <h1 className="text-sm font-bold text-slate-800 tracking-wider">WINTER HAVEN</h1>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">L1/L2 Execution Trace</p>
                
                <div className="h-px bg-slate-200 my-1" />
                
                <div className="text-[10px] font-bold mb-1 text-slate-400 tracking-wider uppercase">Camera Perspective</div>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button 
                    onClick={() => setCameraMode('free')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 px-3 pl-2 rounded-md transition-all text-xs font-semibold",
                      cameraMode === 'free' ? "bg-white text-slate-800 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <Maximize size={14} />
                    Free
                  </button>
                  <button 
                    onClick={() => setCameraMode('follow')}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 px-3 pr-2 rounded-md transition-all text-xs font-semibold",
                      cameraMode === 'follow' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <Camera size={14} />
                    Follow
                  </button>
                </div>
              </div>
           )}
        </div>

        {/* Right side Run Lens Tabs and Button */}
        <div className="flex flex-col gap-2 pointer-events-auto items-end">
           {/* Open Side Panel Button */}
           <button 
             onClick={() => useFactoryStore.getState().setIsSidePanelMode(true)}
             className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-bold text-slate-700 border border-slate-200/50 shadow-sm flex items-center gap-2 hover:bg-white hover:text-slate-900 transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M15 3v18"/></svg>
             Open Chat View
           </button>

           <div className="flex gap-2 relative mt-2">
              <button 
                 onClick={() => setShowRunLens(!showRunLens)}
                 className="bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 text-xs font-bold text-slate-700 border border-slate-200/50 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                 title="Run Status"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform", showRunLens ? "rotate-180" : "")}><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {showRunLens && (
                 <div className="absolute right-0 top-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/50 w-64 overflow-hidden">
                    <div className="flex border-b border-slate-200/50 bg-slate-50/50">
                       {['Run', 'Evidence', 'Graph'].map((tab, i) => (
                          <button key={tab} className={cn(
                            "flex-1 py-3 text-xs font-bold transition-colors",
                            i === 0 ? "text-slate-800 border-b-2 border-slate-800" : "text-slate-400 hover:text-slate-600"
                          )}>
                            {tab}
                          </button>
                       ))}
                     </div>
                     <div className="p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                           <span className="text-[11px] font-bold text-slate-500 uppercase">Run Status</span>
                           <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ACTIVE</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[11px] font-bold text-slate-500 uppercase">Current Stage</span>
                           <span className="text-[11px] font-bold text-slate-800">L2 Synthesis</span>
                        </div>
                     </div>
                  </div>
              )}
           </div>
        </div>
      </div>
      
      {/* Bottom Chat Input */}
      <div className="w-full flex justify-center pointer-events-auto mt-auto pb-4">
         <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_4px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center p-2 pr-3">
            <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <input 
               type="text" 
               placeholder="Message Nova..." 
               className="flex-1 bg-transparent border-none focus:outline-none px-2 text-[15px] placeholder:text-slate-400 text-slate-700 h-10"
            />
            <button className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full transition-colors shadow-sm ml-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
         </div>
      </div>
    </div>
  );
}
