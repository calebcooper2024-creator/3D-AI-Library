import React from 'react';
import { motion } from 'motion/react';

interface ControllerProps {
  inputs: {
    ls_x: number;
    ls_y: number;
    rs_x: number;
    rs_y: number;
    lt: number;
    rt: number;
    lb: boolean;
    rb: boolean;
    btn_a: boolean;
    btn_b: boolean;
    btn_x: boolean;
    btn_y: boolean;
    dpad_up: boolean;
    dpad_down: boolean;
    dpad_left: boolean;
    dpad_right: boolean;
    btn_menu: boolean;
    btn_view: boolean;
    btn_ls: boolean;
    btn_rs: boolean;
  };
}

export const ControllerDisplay: React.FC<ControllerProps> = ({ inputs }) => {
  return (
    <div className="relative w-full aspect-[1.5/1] bg-zinc-900 rounded-2xl border border-zinc-800 p-8 flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
        Virtual Hardware Status: Active
      </div>
      
      <svg viewBox="0 0 400 250" className="w-full h-full drop-shadow-2xl">
        {/* Controller Body */}
        <path
          d="M100,50 Q50,50 40,100 Q30,150 50,200 Q70,220 120,210 Q150,200 200,200 Q250,200 280,210 Q330,220 350,200 Q370,150 360,100 Q350,50 300,50 Z"
          fill="#18181b"
          stroke="#3f3f46"
          strokeWidth="2"
        />
        
        {/* Left Stick */}
        <g transform={`translate(${120 + inputs.ls_x * 20}, ${120 - inputs.ls_y * 20})`}>
          <circle cx="0" cy="0" r="25" fill={inputs.btn_ls ? "#3f3f46" : "#27272a"} stroke={inputs.btn_ls ? "#10b981" : "#52525b"} strokeWidth="2" />
          <circle cx="0" cy="0" r="15" fill="#3f3f46" />
        </g>
        
        {/* Right Stick */}
        <g transform={`translate(${240 + inputs.rs_x * 20}, ${160 - inputs.rs_y * 20})`}>
          <circle cx="0" cy="0" r="25" fill={inputs.btn_rs ? "#3f3f46" : "#27272a"} stroke={inputs.btn_rs ? "#10b981" : "#52525b"} strokeWidth="2" />
          <circle cx="0" cy="0" r="15" fill="#3f3f46" />
        </g>

        {/* D-Pad */}
        <g transform="translate(160, 160)">
          <rect x="-10" y="-30" width="20" height="60" rx="2" fill={inputs.dpad_up || inputs.dpad_down ? "#3f3f46" : "#27272a"} />
          <rect x="-30" y="-10" width="60" height="20" rx="2" fill={inputs.dpad_left || inputs.dpad_right ? "#3f3f46" : "#27272a"} />
          <rect x="-10" y="-30" width="20" height="20" fill={inputs.dpad_up ? "#10b981" : "transparent"} />
          <rect x="-10" y="10" width="20" height="20" fill={inputs.dpad_down ? "#10b981" : "transparent"} />
          <rect x="-30" y="-10" width="20" height="20" fill={inputs.dpad_left ? "#10b981" : "transparent"} />
          <rect x="10" y="-10" width="20" height="20" fill={inputs.dpad_right ? "#10b981" : "transparent"} />
        </g>
        
        {/* Face Buttons */}
        <g transform="translate(300, 120)">
          <circle cx="0" cy="20" r="12" fill={inputs.btn_a ? "#22c55e" : "#27272a"} stroke="#22c55e" strokeWidth={inputs.btn_a ? 2 : 1} />
          <circle cx="20" cy="0" r="12" fill={inputs.btn_b ? "#ef4444" : "#27272a"} stroke="#ef4444" strokeWidth={inputs.btn_b ? 2 : 1} />
          <circle cx="-20" cy="0" r="12" fill={inputs.btn_x ? "#3b82f6" : "#27272a"} stroke="#3b82f6" strokeWidth={inputs.btn_x ? 2 : 1} />
          <circle cx="0" cy="-20" r="12" fill={inputs.btn_y ? "#eab308" : "#27272a"} stroke="#eab308" strokeWidth={inputs.btn_y ? 2 : 1} />
        </g>

        {/* Menu & View */}
        <rect x="175" y="110" width="20" height="10" rx="2" fill={inputs.btn_view ? "#10b981" : "#27272a"} />
        <rect x="205" y="110" width="20" height="10" rx="2" fill={inputs.btn_menu ? "#10b981" : "#27272a"} />
        
        {/* Bumpers */}
        <rect x="80" y="35" width="60" height="10" rx="2" fill={inputs.lb ? "#10b981" : "#27272a"} />
        <rect x="260" y="35" width="60" height="10" rx="2" fill={inputs.rb ? "#10b981" : "#27272a"} />

        {/* Triggers */}
        <g transform="translate(80, 10)">
          <rect x="0" y="0" width="60" height="20" rx="2" fill="#27272a" />
          <motion.rect x="0" y="0" width={60 * inputs.lt} height="20" rx="2" fill="#3b82f6" animate={{ width: 60 * inputs.lt }} />
        </g>
        <g transform="translate(260, 10)">
          <rect x="0" y="0" width="60" height="20" rx="2" fill="#27272a" />
          <motion.rect x="0" y="0" width={60 * inputs.rt} height="20" rx="2" fill="#f59e0b" animate={{ width: 60 * inputs.rt }} />
        </g>
      </svg>
      
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
        <div className="flex gap-2">
          <span className="text-[10px] text-zinc-500 font-mono">LS:</span>
          <span className="text-[10px] text-emerald-500 font-mono">{inputs.ls_x.toFixed(1)}, {inputs.ls_y.toFixed(1)}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] text-zinc-500 font-mono">RT:</span>
          <span className="text-[10px] text-amber-500 font-mono">{(inputs.rt * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
