import React from 'react';

export function ChatInterface() {
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans border-r border-slate-100/50 relative">
      
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">N</div>
            <span className="font-bold text-slate-800">Nova</span>
         </div>
         <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 bg-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
               Local first
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-green-200 text-xs font-semibold text-green-700 bg-green-50">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Live
            </div>
         </div>
      </div>
      
      {/* Sidebar Navigation */}
      <div className="absolute left-0 top-16 bottom-0 w-20 border-r border-slate-100 bg-white flex flex-col items-center py-6 gap-8">
         {['Nova', 'Runs', 'Memory', 'Scribe', 'Settings'].map(item => (
            <div key={item} className={`flex flex-col items-center gap-1.5 cursor-pointer ${item === 'Nova' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item === 'Nova' ? 'bg-[#f4ebe1] text-amber-900' : ''}`}>
                  {item === 'Nova' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>}
                  {item === 'Runs' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                  {item === 'Memory' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>}
                  {item === 'Scribe' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="m14 2 6 6"/><path d="M9 13.5a2.5 2.5 0 0 0 5 0v-5a2.5 2.5 0 0 0-5 0v5Z"/></svg>}
                  {item === 'Settings' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
               </div>
               <span className="text-[10px] font-bold tracking-wide">{item}</span>
            </div>
         ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 ml-20 p-8 overflow-y-auto flex flex-col items-center">
         <div className="w-full max-w-2xl flex flex-col gap-8">
            
            {/* Operator Message */}
            <div className="flex gap-4 w-full">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-800 shrink-0">OW</div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="font-bold text-slate-800 text-sm">Operator</span>
                     <span className="text-slate-400 text-xs">10:42 AM</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm text-slate-700 text-sm leading-relaxed shadow-sm">
                     Please refine the Nova page UI. Focus on clarity, hierarchy, and inspectability. Keep it minimal and highly usable.
                  </div>
               </div>
            </div>

            {/* Run Lens Section Divider */}
            <div className="flex items-center gap-4 py-2 w-full max-w-xl mx-auto">
               <div className="h-px bg-slate-200 flex-1"></div>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Execution lens</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Current Run Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-w-2xl mx-auto w-full">
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m5 17 5 3 5-3"/></svg>
                     Current run
                  </div>
                  <div className="flex items-center gap-4">
                     <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Open Run Lens <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     </button>
                     <button className="text-slate-400 hover:text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                  </div>
               </div>
               <div className="flex gap-8">
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Run ID</div>
                     <div className="text-sm font-semibold text-slate-700">7c4e2a9b</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Started</div>
                     <div className="text-sm font-semibold text-slate-700">10:42 AM</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Operator intent</div>
                     <div className="text-sm font-semibold text-slate-700">refine Nova page UI</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status</div>
                     <div className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Truth run active
                     </div>
                  </div>
               </div>
            </div>

            {/* Nova Message */}
            <div className="flex gap-4 w-full">
               <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white shrink-0">N</div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="font-bold text-slate-800 text-sm">Nova</span>
                     <span className="text-slate-400 text-xs">10:42 AM</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl rounded-tl-sm text-slate-700 text-sm leading-relaxed mb-3">
                     I'm delegating across the system to gather evidence and synthesize options aligned to your intent.<br/><br/>
                     L2 lanes are engaged and L3 evidence is streaming in. I'll return with validated refinements once synthesis is complete.
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-500 shadow-sm animate-pulse">
                     <span className="w-3 h-3 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin"></span>
                     Waiting on synthesis...
                  </div>
               </div>
            </div>
            
         </div>
      </div>
      
      {/* Bottom Composer */}
      <div className="p-4 ml-20 border-t border-slate-100 bg-white">
         <div className="max-w-2xl mx-auto w-full border border-slate-200 rounded-3xl p-3 bg-white shadow-sm flex flex-col focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100 transition-all">
            <input type="text" placeholder="Message Nova..." className="w-full bg-transparent border-none outline-none resize-none min-h-[40px] text-sm text-slate-800 px-2 py-1 placeholder:text-slate-400" />
            <div className="flex justify-between items-center mt-2 px-2">
               <div className="flex gap-3 text-slate-400">
                  <button className="hover:text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg></button>
                  <button className="hover:text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></button>
                  <button className="hover:text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></button>
               </div>
               <div className="flex gap-2 items-center">
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50">
                     Operator intent <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
