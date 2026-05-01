import React, { useRef } from 'react';
import { RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useFactoryStore } from '../store';

export function ProcessNode({ 
  position, 
  color, 
  glowColor, 
  label, 
  sublabel, 
  step,
  domeType = 'dome',
  children,
  cardPosition = [0, -0.5, 2.0],
  cardRotation = [-Math.PI/6, 0, 0],
  labelColor = "text-slate-800"
}: any) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const setFocusedNodePos = useFactoryStore(state => state.setFocusedNodePos);

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01;
      crystalRef.current.rotation.x += 0.005;
      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group 
      position={position} 
      onClick={(e) => {
        e.stopPropagation();
        
        let euler: THREE.Euler;
        if (cardRotation instanceof THREE.Euler) {
          euler = new THREE.Euler().copy(cardRotation);
        } else if (Array.isArray(cardRotation)) {
          euler = new THREE.Euler(cardRotation[0], cardRotation[1], cardRotation[2]);
        } else {
          euler = new THREE.Euler(-Math.PI/6, 0, 0);
        }
        
        const normal = new THREE.Vector3(0, 0, 1).applyEuler(euler);
        const distance = 16;
        
        const offX = cardPosition[0] + normal.x * distance;
        const offY = cardPosition[1] + normal.y * distance;
        const offZ = cardPosition[2] + normal.z * distance;
        
        setFocusedNodePos(position, [offX, offY, offZ], cardPosition as [number, number, number]);
      }}
      onPointerEnter={() => document.body.style.cursor = 'pointer'}
      onPointerLeave={() => document.body.style.cursor = 'auto'}
    >
      <RoundedBox args={[3.2, 1.8, 3.2]} radius={0.4} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </RoundedBox>
      
      <RoundedBox args={[2.7, 1.9, 2.7]} radius={0.3} smoothness={4} position={[0, 0.1, 0]} castShadow>
         <meshStandardMaterial color={color} roughness={0.1} metalness={0.1} />
      </RoundedBox>

      {domeType === 'dome' && (
        <group position={[0, 1.2, 0]}>
          <mesh castShadow position={[0, 0.6, 0]}>
             <cylinderGeometry args={[0.9, 0.9, 1.2, 32]} />
             <meshPhysicalMaterial 
               transmission={1} roughness={0.05} thickness={0.5}
               ior={1.5} transparent opacity={0.6} color="#ffffff"
             />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
             <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]} />
             <meshPhysicalMaterial 
               transmission={1} roughness={0.05} thickness={0.5}
               transparent opacity={0.6}
             />
          </mesh>
          
          <group position={[0, 0.5, 0]}>
             <mesh ref={crystalRef}>
                <icosahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1} roughness={0.1} metalness={0.8} />
             </mesh>
             <pointLight color={glowColor} intensity={1} distance={8} />
          </group>
        </group>
      )}

      {children}

      {/* Invisible mesh to catch clicks on the card */}
      <mesh position={cardPosition} rotation={cardRotation as THREE.Euler | [number, number, number]} visible={false}>
        <planeGeometry args={[4, 2]} />
      </mesh>

      <Html position={cardPosition} transform rotation={cardRotation} center className="pointer-events-none z-10 w-44 select-none">
        <div className="bg-white/95 backdrop-blur-md rounded-[1.2rem] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center">
          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 mb-2 shadow-inner">
            {step}
          </div>
          <div className={`text-sm font-bold uppercase tracking-wider mb-1 leading-tight ${labelColor}`}>{label}</div>
          <div className="text-[11px] text-slate-500 font-medium">{sublabel}</div>
        </div>
      </Html>
    </group>
  )
}
