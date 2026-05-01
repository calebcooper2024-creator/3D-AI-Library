import React, { useRef } from 'react';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useFactoryStore } from '../store';

export function L3EvidenceNode({ position }: { position: [number, number, number] }) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const setFocusedNodePos = useFactoryStore(state => state.setFocusedNodePos);

  const cardPosition: [number, number, number] = [2.2, -0.5, 0];
  const cardRotation = new THREE.Euler(-Math.PI/6, Math.PI/2, 0, 'YXZ');

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01;
      crystalRef.current.rotation.x += 0.005;
      crystalRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group 
       position={position}
       onClick={(e) => {
         e.stopPropagation();
         
         const euler = new THREE.Euler().copy(cardRotation);
         const normal = new THREE.Vector3(0, 0, 1).applyEuler(euler);
         const distance = 16;
         
         const offX = cardPosition[0] + normal.x * distance;
         const offY = cardPosition[1] + normal.y * distance;
         const offZ = cardPosition[2] + normal.z * distance;
         
         setFocusedNodePos(position, [offX, offY, offZ], cardPosition);
       }}
       onPointerEnter={() => document.body.style.cursor = 'pointer'}
       onPointerLeave={() => document.body.style.cursor = 'auto'}
    >
      {/* Base Foundation (like a small bank block) */}
      <RoundedBox args={[5.0, 0.6, 4.25]} radius={0.4} position={[0, -0.7, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#EAE5E0" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[4.6, 0.8, 3.9]} radius={0.3} position={[0, -0.6, 0]} castShadow>
        <meshStandardMaterial color="#c4b5fd" roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Pyramid structure */}
      <mesh position={[0, 0.8, 0]} castShadow>
        {/* radius=2.2, height=2, radialSegments=4 for 4-sided pyramid */}
        <coneGeometry args={[2.2, 2, 4]} />
        <meshPhysicalMaterial 
           color="#ffffff"
           transmission={1} 
           roughness={0.1} 
           thickness={0.5}
           ior={1.5} 
           transparent 
           opacity={0.7} 
        />
      </mesh>

      <group position={[0, 0.2, 0]}>
         <mesh ref={crystalRef}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} roughness={0.1} metalness={0.8} />
         </mesh>
         <pointLight color="#8b5cf6" intensity={1} distance={8} />
      </group>

      {/* Invisible mesh to catch clicks on the card */}
      <mesh position={cardPosition} rotation={cardRotation} visible={false}>
        <planeGeometry args={[4, 2]} />
      </mesh>

      <Html position={cardPosition} transform rotation={cardRotation} center className="pointer-events-none z-10 w-44 select-none">
        <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center">
          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 mb-2 shadow-inner">
            4
          </div>
          <div className={`text-sm font-bold uppercase tracking-wider mb-1 leading-tight text-slate-800`}>L3 EVIDENCE</div>
          <div className="text-[11px] text-slate-500 font-medium">Raw data / work orders</div>
        </div>
      </Html>
    </group>
  );
}
