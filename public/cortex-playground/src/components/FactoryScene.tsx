import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProcessGraph } from './ProcessGraph';
import { useFactoryStore } from '../store';

export function FactoryScene() {
  const { isSidePanelMode, focusedNodePos } = useFactoryStore();
  const controlsRef = useRef<any>(null);

  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();

  const [modeChanged, setModeChanged] = React.useState(false);
  const [isFocusing, setIsFocusing] = React.useState(false);
  const [isReturning, setIsReturning] = React.useState(false);

  useEffect(() => {
    setModeChanged(true);
    const timeout = setTimeout(() => setModeChanged(false), 1000);
    return () => clearTimeout(timeout);
  }, [isSidePanelMode]);

  useEffect(() => {
    if (focusedNodePos) {
      setIsFocusing(true);
      setIsReturning(false);
      const timeout = setTimeout(() => setIsFocusing(false), 1500);
      return () => clearTimeout(timeout);
    } else {
      setIsFocusing(false);
      setIsReturning(true);
      const timeout = setTimeout(() => setIsReturning(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [focusedNodePos]);

  useFrame((state, delta) => {
    const aspect = state.viewport.width / state.viewport.height;
    const targetFov = aspect < 1 ? 42 + (1 - aspect) * 30 : 42;
    const camera = state.camera as THREE.PerspectiveCamera;
    if (Math.abs(camera.fov - targetFov) > 0.1) {
       camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 5);
       camera.updateProjectionMatrix();
    }

    if (isFocusing && focusedNodePos && controlsRef.current) {
        const offset = useFactoryStore.getState().focusedNodeOffset || [0, 10, 10];
        const lookOffset = useFactoryStore.getState().focusedNodeLookOffset || [0, 0, 0];
        
        targetPos.set(focusedNodePos[0] + offset[0], focusedNodePos[1] + offset[1], focusedNodePos[2] + offset[2]);
        targetLook.set(focusedNodePos[0] + lookOffset[0], focusedNodePos[1] + lookOffset[1], focusedNodePos[2] + lookOffset[2]);
        
        state.camera.position.lerp(targetPos, delta * 4);
        const currentLook = controlsRef.current.target as THREE.Vector3;
        currentLook.lerp(targetLook, delta * 4);
        state.camera.lookAt(currentLook);
    } else if ((isReturning || modeChanged) && controlsRef.current) {
       if (isSidePanelMode) {
          targetPos.set(2, 34, 18);
          targetLook.set(2, 0, 0);
       } else {
          targetPos.set(2, 42, 22);
          targetLook.set(2, 0, 0);
       }
       state.camera.position.lerp(targetPos, delta * 3);
       const currentLook = controlsRef.current.target as THREE.Vector3;
       currentLook.lerp(targetLook, delta * 3);
       state.camera.lookAt(currentLook);
    }
  });

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        makeDefault
        minDistance={5}
        maxDistance={80}
        target={[2, 0, 0]}
        maxPolarAngle={Math.PI / 2 - 0.1}
        enableDamping
        dampingFactor={0.05}
      />
      
      <ProcessGraph />

      <EffectComposer>
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.4} levels={8} radius={0.5} />
      </EffectComposer>
    </>
  );
}
