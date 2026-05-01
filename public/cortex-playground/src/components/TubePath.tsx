import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface TubePathProps {
  points: number[][];
  color?: string | string[];
  speed?: number;
  particleCount?: number;
  isRainbowCluster?: boolean;
}

export function TubePath({ points, color = "#a0c0ff", speed = 0.1, particleCount = 4, isRainbowCluster = false }: TubePathProps) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
       points.map(p => new THREE.Vector3(...p)), 
       false, 'catmullrom', 0.2
    );
  }, [points]);

  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const colorArray = useMemo(() => Array.isArray(color) ? color.map(c => new THREE.Color(c).multiplyScalar(4.0)) : null, [color]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    for (let i = 0; i < particleCount; i++) {
       const offset = isRainbowCluster ? (i * 0.005) : (i / particleCount);
       const t = ((time + offset) % 1);
       if (t < 0) continue;
       const pos = curve.getPointAt(t);
       
       if (isRainbowCluster) {
           // Add slight scatter for the cluster
           const theta = i * Math.PI * 2 * 0.618;
           const radius = 0.15;
           pos.x += Math.cos(theta) * radius;
           pos.y += Math.sin(theta) * radius;
           pos.z += Math.sin(theta * 2) * radius;
       }

       dummy.position.copy(pos);
       const scale = 0.7 + Math.sin(t * Math.PI * 20 - time * 5) * 0.15;
       
       dummy.rotation.x = time * 10 + i;
       dummy.rotation.y = time * 15 + i;
       
       dummy.scale.setScalar(scale);
       dummy.updateMatrix();
       particlesRef.current.setMatrixAt(i, dummy.matrix);
       if (colorArray) {
           particlesRef.current.setColorAt(i, colorArray[i % colorArray.length]);
       }
    }
    particlesRef.current.instanceMatrix.needsUpdate = true;
    if (colorArray && particlesRef.current.instanceColor) {
        particlesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 128, 0.45, 16, false]} />
        <meshPhysicalMaterial 
          transmission={1} roughness={0.05} thickness={0.5} ior={1.3} color="#ffffff"
          transparent opacity={0.3} depthWrite={false} side={THREE.DoubleSide}
          clearcoat={1} clearcoatRoughness={0.05}
        />
      </mesh>
      
      <mesh>
        <tubeGeometry args={[curve, 128, 0.15, 6, false]} />
        <meshStandardMaterial color="#ffffff" opacity={0.6} transparent depthWrite={false} />
      </mesh>

      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshBasicMaterial toneMapped={false} color={Array.isArray(color) ? "#ffffff" : new THREE.Color(color as string).multiplyScalar(2.0)} />
      </instancedMesh>
    </group>
  );
}
