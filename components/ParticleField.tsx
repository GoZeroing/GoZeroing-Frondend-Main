'use client';

  import { useRef, useMemo, useState, useEffect } from 'react';
  import { Canvas, useFrame } from '@react-three/fiber';
  import { Points, PointMaterial, Text } from '@react-three/drei';
  import * as THREE from 'three';
  import { motion } from 'framer-motion';
  import { Mic, MicOff, Settings, Brain, Send } from 'lucide-react';

  interface ParticleFieldProps {
    isListening: boolean;
    isSpeaking: boolean;
    volume: number;
    frequency: number[];
    isVoiceActive?: boolean;
    voiceMessage?: string;
    onVoiceMessageChange?: (message: string) => void;
    onVoiceSubmit?: () => void;
    isMuted?: boolean;
    onMuteToggle?: () => void;
    showVoiceUI?: boolean;
    aiText?: string;
    setAiText?: (text: string) => void;
  }

  type FrameState = {
    clock: {
      elapsedTime: number;
    };
  };

  function InnerSphere({ isListening, isSpeaking, frequency, showVoiceUI }: ParticleFieldProps) {
    const ref = useRef<THREE.Points>(null!);
    const particleCount = 1500;
    const radius = 3.0;

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

  function OuterSphere({ isListening, isSpeaking, frequency, showVoiceUI }: ParticleFieldProps) {
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

  function SynapticLines({ isListening, frequency, isSpeaking, showVoiceUI }: ParticleFieldProps) {
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

        const innerRadius = 3;
        const outerRadius = 8;

        for (let i = 0; i < numLines; i++) {
          if (Math.random() > 0.95 || (isListening && Math.random() > 0.8)) {
            const i6 = i * 6;
            const scaledInnerRadius = innerRadius * (1 + audioLevel * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
            const scaledOuterRadius = outerRadius * (1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + audioLevel * 0.1);

            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.acos(2 * Math.random() - 1);
            positions[i6] = scaledInnerRadius * Math.sin(phi1) * Math.cos(theta1);
            positions[i6 + 1] = scaledInnerRadius * Math.sin(phi1) * Math.sin(theta1);
            positions[i6 + 2] = scaledInnerRadius * Math.cos(phi1);

            const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
            const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
            positions[i6 + 3] = scaledOuterRadius * Math.sin(phi2) * Math.cos(theta2);
            positions[i6 + 4] = scaledOuterRadius * Math.sin(phi2) * Math.sin(theta2);
            positions[i6 + 5] = scaledOuterRadius * Math.cos(phi2);
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

  function AITextResponse({ response, isTyping }: { response: string; isTyping: boolean }) {
    return null;
  }

  export default function ParticleField(props: ParticleFieldProps) {
    const {
      isVoiceActive = false,
      voiceMessage = '',
      onVoiceMessageChange,
      onVoiceSubmit,
      isMuted = false,
      onMuteToggle,
      showVoiceUI = false,
      aiText = '',
      setAiText,
    } = props;

    const [localAiText, setLocalAiText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (!showVoiceUI) {
        setLocalAiText('');
        setIsTyping(false);
        return;
      }

      const sentences = [
        "Welcome to the voice interface. You can speak naturally and I will listen to everything you say with full attention and understanding of your needs.",
        "This is an advanced AI system designed to understand complex queries. I can comprehend and respond to your questions with detailed explanations and helpful guidance.",
        "Feel free to ask me anything you'd like to know about any topic. I'm here to help you with information, creative solutions, technical assistance, and thoughtful conversation.",
        "You can have natural conversations with me just like talking to a friend. Just speak or type your thoughts and questions and I will provide comprehensive answers.",
        "I can assist with a wide variety of topics ranging from science and mathematics to creative writing, problem solving, coding assistance, and general knowledge questions.",
        "This interface is designed for seamless interaction with beautiful visuals. Your experience is our top priority and we focus on making every conversation meaningful and productive.",
        "The particle system you see represents neural connections and information flow. Each sphere contains thousands of particles that respond dynamically to voice input and system activity.",
        "I'm constantly learning and adapting to provide better responses over time. My goal is to understand your intent accurately and deliver answers that are both informative and easy to understand.",
        "Whether you need help with homework, professional projects, or personal questions, I'm equipped to assist. My knowledge spans across multiple domains including technology, arts, sciences, and humanities.",
        "The visual feedback changes color based on different states of operation. Green indicates listening mode, yellow shows active processing, and golden hues represent when I'm speaking back to you."
      ];
      
      let sentenceIndex = 0;
      let animationFrameId: number;
      let timeoutId: NodeJS.Timeout;
      let isActive = true;

      const typeText = (text: string, startTime: number, wordIndex: number = 0) => {
        if (!isActive) return;

        const now = performance.now();
        const elapsed = now - startTime;

        const words = text.split(' ');
        // Words appear every 80-120ms for natural reading pace
        const wordsToShow = Math.floor(elapsed / 100);

        if (wordsToShow > wordIndex && wordIndex < words.length) {
          const displayedText = words.slice(0, wordsToShow).join(' ');
          setLocalAiText(displayedText);
          if (setAiText) setAiText(displayedText);

          animationFrameId = requestAnimationFrame(() =>
            typeText(text, startTime, wordsToShow)
          );
        } else if (wordIndex >= words.length) {
          setIsTyping(false);

          // Pause before next sentence
          timeoutId = setTimeout(() => {
            if (isActive) {
              sentenceIndex = (sentenceIndex + 1) % sentences.length;
              setIsTyping(true);
              typeText(sentences[sentenceIndex], performance.now());
            }
          }, 1500);
        } else {
          animationFrameId = requestAnimationFrame(() =>
            typeText(text, startTime, wordIndex)
          );
        }
      };

      timeoutId = setTimeout(() => {
        if (isActive) {
          setIsTyping(true);
          typeText(sentences[0], performance.now());
        }
      }, 2000);

      return () => {
        isActive = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (timeoutId) clearTimeout(timeoutId);
        setLocalAiText('');
        setIsTyping(false);
      };
    }, [showVoiceUI, setAiText]);

    const displayText = aiText || localAiText;

    return (
      <>
        {/* Canvas Layer - Background, non-interactive */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas 
            camera={{ position: [0, 0, 20], fov: 75 }} 
            gl={{ antialias: true, alpha: true }}
            style={{ pointerEvents: 'none' }}
          >
            <ambientLight intensity={0.5} />
            <InnerSphere {...props} />
            <OuterSphere {...props} />
            <SynapticLines {...props} />
          </Canvas>
        </div>

    
      </>
    );
  }