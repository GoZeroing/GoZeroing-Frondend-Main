'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  isListening: boolean;
  isSpeaking: boolean;
  volume: number;
  frequency: number[];
}

// Define proper types for useFrame state
type FrameState = {
  clock: {
    elapsedTime: number;
  };
};

function InnerSphere({ isListening, isSpeaking, frequency }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!);
  const particleCount = 1500;
  const radius = 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const initialColors = useMemo(() => new Float32Array(particleCount * 3), []);

  useFrame((state: FrameState) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      const audioLevel =
        isListening && frequency.length > 0
          ? frequency.reduce((a, b) => a + b, 0) / frequency.length / 255
          : 0;

      ref.current.scale.setScalar(1 + audioLevel * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05);

      const colorsArray = ref.current.geometry.attributes.color.array as Float32Array;
      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (isSpeaking) {
          color.setRGB(1, 0.84, 0);
        } else if (isListening && audioLevel > 0.15) {
          color.setRGB(1, 0.84, 0);
        } else if (isListening && audioLevel > 0.05) {
          color.setRGB(1, 1, 0);
        } else if (isListening) {
          color.setRGB(0, 0.8, 0);
        } else {
          color.setRGB(1, 1, 1);
        }

        colorsArray[i3] = color.r;
        colorsArray[i3 + 1] = color.g;
        colorsArray[i3 + 2] = color.b;
      }

      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={initialColors}>
      <PointMaterial
        size={0.1}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function OuterSphere({ isListening, isSpeaking, frequency }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!);
  const particleCount = 3500;
  const radius = 8;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const initialColors = useMemo(() => new Float32Array(particleCount * 3), []);

  useFrame((state: FrameState) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      const audioLevel =
        isListening && frequency.length > 0
          ? frequency.reduce((a, b) => a + b, 0) / frequency.length / 255
          : 0;

      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + audioLevel * 0.1);

      const colorsArray = ref.current.geometry.attributes.color.array as Float32Array;
      const color = new THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (isSpeaking) {
          color.setRGB(1, 0.84, 0);
        } else if (isListening && audioLevel > 0.15) {
          color.setRGB(1, 0.84, 0);
        } else if (isListening && audioLevel > 0.05) {
          color.setRGB(1, 1, 0);
        } else if (isListening) {
          color.setRGB(0, 0.8, 0);
        } else {
          color.setRGB(1, 1, 1);
        }

        colorsArray[i3] = color.r;
        colorsArray[i3 + 1] = color.g;
        colorsArray[i3 + 2] = color.b;
      }

      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={initialColors}>
      <PointMaterial
        size={0.08}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function SynapticLines({ isListening, frequency, isSpeaking }: ParticleFieldProps) {
  const ref = useRef<THREE.LineSegments>(null!);
  const numLines = 100;

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numLines * 6);
    
    positions.fill(0);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [numLines]);

  useFrame((state: FrameState) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const audioLevel =
        isListening && frequency.length > 0
          ? frequency.reduce((a, b) => a + b, 0) / frequency.length / 255
          : 0;

      for (let i = 0; i < numLines; i++) {
        if (Math.random() > 0.95 || (isListening && Math.random() > 0.8)) {
          const i6 = i * 6;
          const innerRadius = 3 * (1 + audioLevel * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
          const outerRadius = 8 * (1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + audioLevel * 0.1);

          const theta1 = Math.random() * Math.PI * 2;
          const phi1 = Math.acos(2 * Math.random() - 1);
          positions[i6] = innerRadius * Math.sin(phi1) * Math.cos(theta1);
          positions[i6 + 1] = innerRadius * Math.sin(phi1) * Math.sin(theta1);
          positions[i6 + 2] = innerRadius * Math.cos(phi1);

          const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
          const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
          positions[i6 + 3] = outerRadius * Math.sin(phi2) * Math.cos(theta2);
          positions[i6 + 4] = outerRadius * Math.sin(phi2) * Math.sin(theta2);
          positions[i6 + 5] = outerRadius * Math.cos(phi2);
        } else {
          const i6 = i * 6;
          positions.fill(0, i6, i6 + 6);
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true;

      const material = ref.current.material as THREE.LineBasicMaterial;

      if (isSpeaking) {
        material.color.setRGB(1, 0.84, 0);
      } else if (audioLevel > 0.15) {
        material.color.setRGB(1, 0.84, 0);
      } else if (audioLevel > 0.05) {
        material.color.setRGB(1, 1, 0);
      } else if (isListening) {
        material.color.setRGB(0, 0.8, 0);
      } else {
        material.color.setRGB(1, 1, 1);
      }
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={0x00ff00}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function   (props: ParticleFieldProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <InnerSphere {...props} />
        <OuterSphere {...props} />
        <SynapticLines {...props} />
      </Canvas>
    </div>
  );
}