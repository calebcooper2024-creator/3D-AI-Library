import React from 'react';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFactoryStore } from '../store';

export function L2LanesNode({ position }: { position: [number, number, number] }) {
  const lanes = [
    { color: '#f43f5e', name: 'Brand & Strategy', tasks: 12, icon: 'B' },
    { color: '#8b5cf6', name: 'Creative Production', tasks: 8, icon: 'C' },
    { color: '#f97316', name: 'Marketing & Growth', tasks: 15, icon: 'M' },
    { color: '#10b981', name: 'Supply Chain & Finance', tasks: 6, icon: 'S' },
    { color: '#f59e0b', name: 'Customer Experience', tasks: 11, icon: 'E' },
    { color: '#3b82f6', name: 'Software Engineering', tasks: 24, icon: '</>' }
  ];
  
  const setFocusedNodePos = useFactoryStore(state => state.setFocusedNodePos);

  return (
    <group 
       position={position}
       onClick={(e) => {
         e.stopPropagation();
         
         const euler = new THREE.Euler(-Math.PI/6, 0, 0);
         const normal = new THREE.Vector3(0, 0, 1).applyEuler(euler);
         const distance = 24;
         
         const offX = 0 + normal.x * distance;
         const offY = -0.5 + normal.y * distance;
         const offZ = 4.8 + normal.z * distance;
         
         setFocusedNodePos(position, [offX, offY, offZ], [0, -0.5, 4.8]);
       }}
       onPointerEnter={() => document.body.style.cursor = 'pointer'}
       onPointerLeave={() => document.body.style.cursor = 'auto'}
    >
      <RoundedBox args={[10, 0.6, 8.5]} radius={0.8} position={[0, -0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#EAE5E0" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[9.4, 0.8, 7.9]} radius={0.6} position={[0, -0.6, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.2} opacity={0.6} transparent />
      </RoundedBox>

      {/* Invisible mesh to catch clicks on the card */}
      <mesh position={[0, -0.5, 4.8]} rotation={[-Math.PI/6, 0, 0]} visible={false}>
        <planeGeometry args={[10, 2]} />
      </mesh>

      <Html position={[0, -0.5, 4.8]} transform rotation={[-Math.PI/6, 0, 0]} center className="pointer-events-none z-10 select-none">
         <div className="bg-white/95 backdrop-blur-md rounded-full px-8 py-3 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between w-[26rem]">
            <div className="flex items-center gap-4">
               <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 shadow-inner">6</div>
               <div className="text-lg font-bold text-slate-800 uppercase tracking-widest">L2 Supervisor Bank</div>
            </div>
            <div className="bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-sm font-bold px-4 py-1 rounded-full">Active</div>
         </div>
      </Html>

      {lanes.map((lane, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const xOff = col === 0 ? -2.3 : 2.3;
        const zOff = -2.5 + row * 2.5;

        return (
          <group key={i} position={[xOff, 0.5, zOff]}>
             <RoundedBox args={[4.2, 1.4, 2.0]} radius={0.4} castShadow>
               <meshStandardMaterial color={lane.color} roughness={0.3} />
             </RoundedBox>
             <RoundedBox args={[4.0, 1.45, 1.8]} position={[0, 0.05, 0]} radius={0.3}>
                <meshStandardMaterial color="#ffffff" roughness={0.1} />
             </RoundedBox>
             
             <mesh position={[1.5, 0.7, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={2} />
             </mesh>
             
             <Html position={[0, 0.76, 0]} transform rotation={[-Math.PI/2, 0, 0]} center>
                <div className="w-[180px] flex items-center px-2">
                   <div className="flex flex-1 items-center gap-2">
                      <div className="w-7 h-7 rounded border border-slate-100 bg-white shadow-sm flex items-center justify-center text-sm font-bold shrink-0" style={{color: lane.color}}>
                        {lane.icon}
                      </div>
                      <div className="text-left overflow-hidden">
                        <div className="text-[10px] font-bold text-slate-800 tracking-wide leading-tight truncate">{lane.name}</div>
                        <div className="text-[9px] text-slate-500 font-medium">{lane.tasks} tasks</div>
                      </div>
                   </div>
                </div>
             </Html>
          </group>
        )
      })}
    </group>
  )
}
