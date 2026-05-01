import React, { useRef, useMemo } from 'react';
import { ProcessNode } from './ProcessNode';
import { L2LanesNode } from './L2LanesNode';
import { L3EvidenceNode } from './L3EvidenceNode';
import { TubePath } from './TubePath';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function ProcessGraph() {
  const laneCoords = Array.from({ length: 6 }).map((_, i) => {
     const row = Math.floor(i / 2);
     const col = i % 2;
     const xOff = col === 0 ? -2.3 : 2.3;
     const zOff = -2.5 + row * 2.5;
     return { xOff, zOff };
  });
  const laneColors = ["#f43f5e", "#8b5cf6", "#f97316", "#10b981", "#f59e0b", "#3b82f6"];

  const n1: [number, number, number] = [-21, 0, 0];
  const n2: [number, number, number] = [-14, 0, 0];
  const nLanes: [number, number, number] = [-4, 0, 0];
  
  const n4: [number, number, number] = [6, 0, -8]; // L3 Evidence sidecar chamber
  const nAdj = [10, 0, 0]; // L2 Adjudication / Merge
  const n5 = [17, 0, 0]; // L2 Synthesis
  const n6 = [25, 0, 0]; // Nova Composition
  const n7 = [25, 0, 8]; // Answer Review
  const n8 = [17, 0, 8]; // Final Readiness
  
  const nScribe = [17, 0, -8];
  const nBrokie = [25, 0, -8];

  const RingProgress = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const domeRef = useRef<THREE.Group>(null);
    
    // Confetti particles
    const particleCount = 120;
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const confettiColors = useMemo(() => [
       new THREE.Color('#f43f5e'), new THREE.Color('#8b5cf6'),
       new THREE.Color('#f97316'), new THREE.Color('#10b981'),
       new THREE.Color('#3b82f6'), new THREE.Color('#fbbf24')
    ], []);
    
    const confettiData = useMemo(() => Array.from({ length: particleCount }, () => ({
       position: new THREE.Vector3(0, 0, 0),
       velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 8 + 4,
          (Math.random() - 0.5) * 8
       ),
       rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
       rotVelocity: new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
       color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
       active: false
    })), [particleCount, confettiColors]);

    const cycleDuration = 120; // 2 minutes
    const holdDuration = 6;
    const climbDuration = cycleDuration - holdDuration;

    const getGradientColor = (progress: number) => {
        const stops = [
            { p: 0, c: [239, 68, 68] },
            { p: 0.33, c: [249, 115, 22] },
            { p: 0.66, c: [234, 179, 8] },
            { p: 1, c: [34, 197, 94] }
        ];
        let i = 0;
        while (i < stops.length - 1 && progress >= stops[i + 1].p) {
            i++;
        }
        if (i === stops.length - 1) return new THREE.Color(`rgb(${stops[i].c.join(',')})`);
        
        const s1 = stops[i];
        const s2 = stops[i+1];
        const t = (progress - s1.p) / (s2.p - s1.p);
        const r = Math.round(s1.c[0] + t * (s2.c[0] - s1.c[0]));
        const g = Math.round(s1.c[1] + t * (s2.c[1] - s1.c[1]));
        const b = Math.round(s1.c[2] + t * (s2.c[2] - s1.c[2]));
        return new THREE.Color(`rgb(${r},${g},${b})`);
    };
    
    // Web audio API for the luxurious instrumental song
    const playReadySound = () => {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;

      // Master output & delay effects
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);

      const delay = ctx.createDelay();
      delay.delayTime.value = 0.4; // 8th note delay for space
      const delayFeedback = ctx.createGain();
      delayFeedback.gain.value = 0.35; // feedback tail
      delay.connect(delayFeedback);
      delayFeedback.connect(delay);
      
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 2500;
      delay.connect(delayFilter);
      delayFilter.connect(masterGain);

      // 1. LUSH AMBIENT PAD (Sawtooth + Filter sweep)
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(200, now);
      padFilter.frequency.exponentialRampToValueAtTime(1500, now + 3);
      padFilter.frequency.exponentialRampToValueAtTime(200, now + 6);
      padFilter.connect(masterGain);
      padFilter.connect(delay);

      // (Cmaj9 pad frequencies)
      const padFrequencies = [65.41, 130.81, 196.00, 329.63, 493.88]; 
      padFrequencies.forEach(freq => {
         const osc = ctx.createOscillator();
         osc.type = 'sawtooth';
         osc.frequency.value = freq;
         
         const oscGain = ctx.createGain();
         oscGain.gain.setValueAtTime(0, now);
         oscGain.gain.linearRampToValueAtTime(0.04, now + 2.5); // swell slowly
         oscGain.gain.exponentialRampToValueAtTime(0.001, now + 6); // fade out
         
         osc.connect(oscGain);
         oscGain.connect(padFilter);
         osc.start(now);
         osc.stop(now + 6);
      });

      // 2. SPARKLING CHIME MELODY (Sine + high harmonics)
      const playPluck = (freq: number, startTime: number) => {
         const osc = ctx.createOscillator();
         osc.type = 'sine';
         osc.frequency.value = freq;
         
         const pGain = ctx.createGain();
         pGain.gain.setValueAtTime(0, startTime);
         pGain.gain.linearRampToValueAtTime(0.25, startTime + 0.03); // punchy attack
         pGain.gain.exponentialRampToValueAtTime(0.001, startTime + 3.5); // long decay
         
         osc.connect(pGain);
         pGain.connect(masterGain);
         pGain.connect(delay); // send to echo
         
         osc.start(startTime);
         osc.stop(startTime + 4);
      };

      // Fast arpeggio intro (sparkles up)
      [
         {f: 523.25, t: 0.0},   // C5
         {f: 659.25, t: 0.15},  // E5
         {f: 783.99, t: 0.30},  // G5
         {f: 987.77, t: 0.45},  // B5
         {f: 1174.66, t: 0.60}, // D6
         {f: 1318.51, t: 0.75}, // E6 (holds)
      ].forEach(n => playPluck(n.f, now + n.t));

      // Slow emotional melody response completing the song
      [
         {f: 1396.91, t: 2.2},  // F6
         {f: 1318.51, t: 2.8},  // E6
         {f: 1046.50, t: 3.4},  // C6
         {f: 1174.66, t: 4.4},  // D6 (resolves)
      ].forEach(n => playPluck(n.f, now + n.t));
    };

    const soundPlayed = useRef(false);
    const explosionStartTime = useRef(0);

    useFrame((state) => {
       const time = state.clock.elapsedTime;
       const cycleTime = time % cycleDuration;
       const dt = 0.016; // approx delta
       
       let progress = 0;
       let pct = 0;
       
       if (cycleTime < climbDuration) {
          progress = cycleTime / climbDuration;
          pct = Math.floor(progress * 100);
          soundPlayed.current = false;
          explosionStartTime.current = 0;
          
          if (domeRef.current) {
             domeRef.current.position.y = 0;
             domeRef.current.scale.set(1, 1, 1);
             ((domeRef.current.children[0] as THREE.Mesh).material as THREE.MeshPhysicalMaterial).opacity = 0.6;
             ((domeRef.current.children[0] as THREE.Mesh).material as THREE.MeshPhysicalMaterial).transparent = true;
          }
          if (particlesRef.current) {
             particlesRef.current.visible = false;
          }
       } else {
          progress = 1;
          pct = 100;
          if (!soundPlayed.current) {
             playReadySound();
             soundPlayed.current = true;
             explosionStartTime.current = time;
             
             // Activate confetti
             if (particlesRef.current) {
                particlesRef.current.visible = true;
             }
             confettiData.forEach(p => {
                 p.position.set(0, 0.5, 0);
                 p.velocity.set(
                    (Math.random() - 0.5) * 8,
                    Math.random() * 8 + 4,
                    (Math.random() - 0.5) * 8
                 );
                 p.active = true;
             });
          }
          
          const timeSinceExplosion = time - explosionStartTime.current;
          
          // Animate dome break open (pop up and fade out)
          if (domeRef.current && timeSinceExplosion < 1.0) {
             domeRef.current.position.y += dt * 4;
             domeRef.current.scale.multiplyScalar(1 + dt * 2);
             const mat = (domeRef.current.children[0] as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
             mat.opacity = Math.max(0, 0.6 - timeSinceExplosion * 0.8);
          } else if (domeRef.current) {
             domeRef.current.visible = false;
          }
          
          // Animate confetti
          if (particlesRef.current) {
             confettiData.forEach((p, i) => {
                if (p.active) {
                   p.velocity.y -= 9.8 * dt; // gravity
                   p.position.addScaledVector(p.velocity, dt);
                   p.rotation.x += p.rotVelocity.x * dt;
                   p.rotation.y += p.rotVelocity.y * dt;
                   p.rotation.z += p.rotVelocity.z * dt;
                   
                   dummy.position.copy(p.position);
                   dummy.rotation.copy(p.rotation);
                   dummy.scale.set(1, 1, 1);
                   dummy.updateMatrix();
                   particlesRef.current!.setMatrixAt(i, dummy.matrix);
                   particlesRef.current!.setColorAt(i, p.color);
                   
                   if (p.position.y < -5) {
                      p.active = false;
                   }
                } else {
                   dummy.scale.set(0, 0, 0); // Hide completely
                   dummy.updateMatrix();
                   particlesRef.current!.setMatrixAt(i, dummy.matrix);
                }
             });
             particlesRef.current.instanceMatrix.needsUpdate = true;
             if (particlesRef.current.instanceColor) particlesRef.current.instanceColor.needsUpdate = true;
          }
       }
       
       const color = getGradientColor(progress);
       
       if (textRef.current) {
          textRef.current.innerHTML = `${pct}<span class="text-xl">%</span>`;
          textRef.current.style.color = color.getStyle();
       }
       
       if (ringRef.current) {
          const geom = new THREE.RingGeometry(0.8, 1.1, 64, 1, 0, Math.PI * 2 * progress);
          ringRef.current.geometry.dispose();
          ringRef.current.geometry = geom;
          
          const mat = ringRef.current.material as THREE.MeshStandardMaterial;
          mat.color.copy(color);
          mat.emissive.copy(color);
       }
    });

    return (
      <group position={[0, 1.2, 0]}>
         <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,0.01,0]}>
           <ringGeometry args={[0.8, 1.1, 64]} />
           <meshStandardMaterial color="#e2e8f0" />
         </mesh>
         <mesh ref={ringRef} rotation={[-Math.PI/2, 0, 0]} position={[0,0.02,0]}>
           <ringGeometry args={[0.8, 1.1, 64, 1, 0, 0]} />
           <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
         </mesh>
         <Html transform rotation={[-Math.PI/2, 0, 0]} position={[0, 0.1, 0]} center>
            <div ref={textRef} className="text-3xl font-black tracking-tighter" style={{ color: '#ef4444' }}>0<span className="text-xl">%</span></div>
         </Html>
         
         <group ref={domeRef}>
           <mesh castShadow position={[0, 0, 0]}>
              <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]} />
              <meshPhysicalMaterial 
                transmission={1} roughness={0.05} thickness={0.5}
                ior={1.5} transparent opacity={0.6} color="#ffffff"
              />
           </mesh>
         </group>
         
         <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshBasicMaterial side={THREE.DoubleSide} />
         </instancedMesh>
      </group>
    );
  };

  return (
    <group position={[0, 0, -2]}>
      <ProcessNode position={n1} color="#f4f5f1" glowColor="#93c5fd" label="OPERATOR INTENT" sublabel="Captured" step="1" />
      <ProcessNode position={n2} color="#1e293b" glowColor="#475569" label="NOVA PLAN" sublabel="Planning complete" step="2" />
      
      <L2LanesNode position={nLanes} />

      <L3EvidenceNode position={n4} />
      <ProcessNode position={nAdj} color="#a7f3d0" glowColor="#34d399" label="L2 ADJUDICATION" sublabel="Lane merge & score" step="5" />
      <ProcessNode position={n5} color="#3b82f6" glowColor="#60a5fa" label="L2 SYNTHESIS" sublabel="Synthesizing" step="6" />
      <ProcessNode position={n6} color="#1e293b" glowColor="#475569" label="NOVA COMPOSITION" sublabel="Composing" step="7" cardPosition={[2.2, -0.5, 0]} cardRotation={new THREE.Euler(-Math.PI/6, Math.PI/2, 0, 'YXZ')} />
      <ProcessNode position={n7} color="#fca5a5" glowColor="#ff2222" label="ANSWER REVIEW" sublabel="Final Check" step="8" />
      <ProcessNode position={n8} color="#f4f5f1" glowColor="#10b981" label="FINAL READINESS" sublabel={<span className="text-emerald-500 font-bold"><span className="text-slate-500 font-medium whitespace-nowrap">ready</span></span>} step="9" domeType="none">
         <RingProgress />
      </ProcessNode>
      
      <ProcessNode position={nScribe} color="#e0e7ff" glowColor="#818cf8" label="SCRIBE / SETTLEMENT" sublabel="Write Review" step="S" cardPosition={[-2.2, -0.5, 0]} cardRotation={new THREE.Euler(-Math.PI/6, -Math.PI/2, 0, 'YXZ')} />
      <ProcessNode position={nBrokie} color="#f3e8ff" glowColor="#c084fc" label="BROKIE TRUTH / MEMORY" sublabel="Durable State" step="B" cardPosition={[2.2, -0.5, 0]} cardRotation={new THREE.Euler(-Math.PI/6, Math.PI/2, 0, 'YXZ')} />

      {/* 1. Intent -> Plan */}
      <TubePath points={[
         [n1[0] + 1.6, 0.5, n1[2]],
         [n2[0] - 1.6, 0.5, n2[2]]
      ]} color="#bfdbfe" speed={0.04} particleCount={3} />

      {/* 2. Plan -> Lanes (3 Hopping Pipes) */}
      {[0, 1, 2].map((row) => (
         <React.Fragment key={`in-${row}`}>
            {/* Main pipe reaches the L2 bank entrance */}
            <TubePath points={[
               [n2[0] + 1.6, 0.5, n2[2]],
               [n2[0] + 3.5, 0.5, -2.5 + row * 2.5],
               [-9.5, 0.5, -2.5 + row * 2.5],
               [-8.4, 0.5, -2.5 + row * 2.5]
            ]} color={laneColors[row * 2]} speed={0.05} particleCount={3} />
            
            {/* Hop over the left card to feed the right card */}
            <TubePath points={[
               [-9.5, 0.5, -2.5 + row * 2.5],
               [-6.3, 1.2, -2.5 + row * 2.5],
               [-3.8, 0.5, -2.5 + row * 2.5]
            ]} color={laneColors[row * 2 + 1]} speed={0.05} particleCount={3} />
         </React.Fragment>
      ))}

      {/* 3. Lanes to L3 Outbound (Right/Around) */}
      {laneCoords.map((coord, i) => (
         <TubePath key={`out3-${i}`} points={[
            [nLanes[0] + coord.xOff + 2.1, 0.5, coord.zOff],
            [2, 0.5, coord.zOff],
            [2, 0.5, n4[2] - 0.5 + i * 0.3],
            [n4[0] - 1.6, 0.5, n4[2] - 0.5 + i * 0.3]
         ]} color={laneColors[i]} speed={0.06} particleCount={5} />
      ))}

      {/* 4. L3 Return to Lanes (Middle Return) */}
      {laneCoords.map((coord, i) => (
         <TubePath key={`ret3-${i}`} points={[
            [n4[0] - 0.6 + i * 0.4, 0.8, n4[2] + 1.6],
            [n4[0] - 0.6 + i * 0.4, 0.8, -4.5 + i * 0.2],
            [1.5 + i * 0.2, 0.8, -4.5 + i * 0.2],
            [1.5 + i * 0.2, 0.8, coord.zOff],
            [nLanes[0] + coord.xOff + 2.1, 0.8, coord.zOff]
         ]} color={laneColors[i]} speed={0.06} particleCount={4} />
      ))}

      {/* 5. Lanes to L2 Adjudication (Left/Inside) */}
      {laneCoords.map((coord, i) => (
         <TubePath key={`outAdj-${i}`} points={[
            [nLanes[0] + coord.xOff + 2.1, 0.1, coord.zOff],
            [3.5, 0.1, coord.zOff],
            [nAdj[0] - 3.5, 0.1, nAdj[2] + (i - 2.5) * 0.3],
            [nAdj[0] - 1.6, 0.1, nAdj[2] + (i - 2.5) * 0.3]
         ]} color={laneColors[i]} speed={0.06} particleCount={4} />
      ))}

      {/* 6. L2 Adjudication to L2 Synthesis */}
      <TubePath points={[
         [nAdj[0]+1.6, 0.5, nAdj[2]],
         [n5[0]-1.6, 0.5, n5[2]]
      ]} color="#6ee7b7" speed={0.04} particleCount={3} />

      {/* 7. L2 Synthesis to Nova Composition */}
      <TubePath points={[
         [n5[0]+1.6, 0.5, n5[2]],
         [n6[0]-1.6, 0.5, n6[2]]
      ]} color="#fcd34d" speed={0.04} particleCount={3} />

      {/* 7.5 L2 Synthesis to Scribe (Secondary Branch) */}
      <TubePath points={[
         [n5[0], 0.5, n5[2] - 1.6],
         [nScribe[0], 0.5, nScribe[2] + 1.6]
      ]} color="#818cf8" speed={0.04} particleCount={3} />
      
      {/* 7.6 Scribe to Brokie */}
      <TubePath points={[
         [nScribe[0] + 1.6, 0.5, nScribe[2]],
         [nBrokie[0] - 1.6, 0.5, nBrokie[2]]
      ]} color="#c084fc" speed={0.04} particleCount={3} />

      {/* 8. Nova Composition to Answer Review (Single Rainbow Ball) */}
      <TubePath points={[
         [n6[0], 0.5, n6[2] + 1.2],
         [n6[0], 0.5, n6[2] + 2.5],
         [n6[0], 0.5, n7[2] - 2.5],
         [n7[0], 0.5, n7[2] - 1.2]
      ]} color={laneColors} speed={0.04} particleCount={12} isRainbowCluster />

      {/* 9. Answer Review to Final Readiness (Single Rainbow Ball) */}
      <TubePath points={[
         [n7[0]-1.6, 0.5, n7[2]],
         [n8[0]+1.6, 0.5, n8[2]]
      ]} color={laneColors} speed={0.04} particleCount={12} isRainbowCluster />

      {/* 10. Optional Revision Loop: Answer Review -> Nova Plan */}
      <DashedPath points={[
         [n7[0], 0.2, n7[2] + 1.6],
         [n7[0], 0.2, 13],
         [n2[0], 0.2, 13],
         [n2[0], 0.2, n2[2] + 1.6]
      ]} color="#cbd5e1" speed={0.02} particleCount={4} />

    </group>
  );
}

const DashedPath = ({ points, color, speed, particleCount }: { points: number[][], color: string, speed: number, particleCount: number }) => {
   const curve = React.useMemo(() => {
     return new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p)), 
        false, 'catmullrom', 0.2
     );
   }, [points]);
 
   const ref = React.useRef<THREE.Line>(null);
   const particlesRef = React.useRef<THREE.InstancedMesh>(null);
   const dummy = React.useMemo(() => new THREE.Object3D(), []);
 
   React.useEffect(() => {
     if (ref.current) {
        ref.current.computeLineDistances();
     }
   }, [curve]);
 
   useFrame((state) => {
     if (!particlesRef.current) return;
     const time = state.clock.getElapsedTime() * speed;
     for (let i = 0; i < particleCount; i++) {
        const t = ((time + (i / particleCount)) % 1);
        if (t < 0) continue;
        const pos = curve.getPointAt(t);
        dummy.position.copy(pos);
        dummy.scale.setScalar(0.4);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
     }
     particlesRef.current.instanceMatrix.needsUpdate = true;
   });
 
   return (
     <group>
       <line ref={ref as any}>
         <bufferGeometry>
           <float32BufferAttribute 
              attach="attributes-position"
              count={50}
              array={new Float32Array(curve.getSpacedPoints(50).flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
           />
         </bufferGeometry>
         <lineDashedMaterial color="#cbd5e1" dashSize={0.5} gapSize={0.3} linewidth={2} transparent opacity={0.6} />
       </line>
 
       <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
         <sphereGeometry args={[0.15, 16, 16]} />
         <meshBasicMaterial color={color} transparent opacity={0.8} />
       </instancedMesh>
     </group>
   );
 };
