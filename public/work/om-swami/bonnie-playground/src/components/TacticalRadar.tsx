import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Car, User, ShieldAlert } from 'lucide-react';

interface Detection {
  box_2d: [number, number, number, number];
  label: string;
}

interface TacticalRadarProps {
  detections: Detection[];
}

export const TacticalRadar: React.FC<TacticalRadarProps> = ({ detections }) => {
  // Center of the radar is (50, 50) in percentage
  // We map the 2D bounding boxes to a top-down perspective
  // This is a simulation: objects at the bottom of the screen are "closer"
  
  const getRadarPosition = (box: [number, number, number, number]) => {
    const [ymin, xmin, ymax, xmax] = box;
    const centerX = (xmin + xmax) / 2;
    const centerY = (ymin + ymax) / 2;
    
    // Map X (0-1000) to (-40 to 40) relative to center
    const rx = ((centerX - 500) / 500) * 40;
    
    // Map Y (0-1000) to distance (0 to 40)
    // Objects at y=1000 (bottom) are close (distance 5)
    // Objects at y=0 (top) are far (distance 40)
    const ry = ((1000 - centerY) / 1000) * 40;
    
    return { x: 50 + rx, y: 90 - ry };
  };

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('car') || l.includes('vehicle') || l.includes('truck')) return <Car size={10} />;
    if (l.includes('person') || l.includes('pedestrian')) return <User size={10} />;
    if (l.includes('police') || l.includes('cop')) return <ShieldAlert size={10} className="text-red-500" />;
    return <MapPin size={10} />;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Navigation size={16} className="text-emerald-500" />
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Tactical Radar</h3>
      </div>

      <div className="flex-1 relative bg-black/40 rounded-full border border-zinc-800/50 aspect-square mx-auto w-full max-w-[200px]">
        {/* Radar Rings */}
        <div className="absolute inset-0 border border-zinc-800/30 rounded-full scale-[0.75]" />
        <div className="absolute inset-0 border border-zinc-800/30 rounded-full scale-[0.5]" />
        <div className="absolute inset-0 border border-zinc-800/30 rounded-full scale-[0.25]" />
        
        {/* Grid Lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800/30" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-800/30" />

        {/* Scanning Sweep */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full origin-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
        />

        {/* Agent Position */}
        <div className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>

        {/* Detections */}
        {detections.map((det, i) => {
          const pos = getRadarPosition(det.box_2d);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className={`p-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 shadow-lg`}>
                  {getIcon(det.label)}
                </div>
                <span className="text-[6px] font-mono text-zinc-500 uppercase whitespace-nowrap bg-black/60 px-1 rounded">
                  {det.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <span>RANGE: 50m</span>
        <span className="text-emerald-500 animate-pulse">SCANNING...</span>
      </div>
    </div>
  );
};
