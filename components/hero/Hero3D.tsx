"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

const INK = new THREE.Color("#0a0a0a");
const OXBLOOD = new THREE.Color("#6e1014");
const ASH = new THREE.Color("#5a5a5a");

function DisplacedMass() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.42 },
      uFreq: { value: 0.85 },
      uHover: { value: 0 },
      uInk: { value: INK },
      uOxblood: { value: OXBLOOD },
      uFresnelPower: { value: 3.2 },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      const target = Math.min(1, state.pointer.length());
      matRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        matRef.current.uniforms.uHover.value,
        target,
        delta * 2.5
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.z = t * 0.02;
      // Mouse parallax — the mass leans toward the cursor.
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -state.pointer.y * 0.35,
        delta * 2
      );
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        state.pointer.x * 0.25,
        delta * 2
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 48]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function AshField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a soft shell around the mass.
      const r = 2.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = state.pointer.y * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ASH}
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 5.5, 11]} />
      <DisplacedMass />
      <AshField />
    </Canvas>
  );
}
