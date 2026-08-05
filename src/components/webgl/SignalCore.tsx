"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Signal Core — composed of:                                          */
/*   - Y-shaped structural frame                                       */
/*   - G-shaped signal loop                                            */
/*   - Inner organic membrane (warm pulse)                             */
/*   - Outer engineered ribs                                           */
/*   - Signal nodes                                                    */
/*   - Traces                                                          */
/* ------------------------------------------------------------------ */

interface SignalCoreProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  isMobile: boolean;
}

/** Inner organic membrane — warm amber glow inside the core. */
function InnerMembrane({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const breath = reducedMotion ? 1 : 1 + Math.sin(t * 0.6) * 0.05;
    ref.current.scale.setScalar(breath);
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.7, 4]} />
      <meshStandardMaterial
        color="#ffb672"
        emissive="#ff9a3c"
        emissiveIntensity={0.65}
        transparent
        opacity={0.55}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

/** Y-shaped structural frame. */
function YFrame({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.15) * 0.04;
  });

  const arms: THREE.Vector3[] = useMemo(() => {
    return [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.1, 1.4, 0),
      new THREE.Vector3(-1.1, 1.4, 0),
      new THREE.Vector3(0, -1.6, 0),
    ];
  }, []);

  const points = useMemo(() => {
    return [
      [arms[1], arms[0], arms[3]],
      [arms[2], arms[0]],
    ];
  }, [arms]);

  return (
    <group ref={ref}>
      {points.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(line.flatMap((v) => [v.x, v.y, v.z])),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#6b5bff" transparent opacity={0.7} />
        </line>
      ))}
      {/* Y endpoint nodes */}
      {arms.slice(1).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#8b7fff"
            emissive="#6b5bff"
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/** G-shaped signal loop — a torus that hints at the G of Y/G. */
function GLoop({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = reducedMotion ? 0 : t * 0.18;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.1;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.025, 16, 100, Math.PI * 1.5]} />
      <meshStandardMaterial
        color="#6b5bff"
        emissive="#6b5bff"
        emissiveIntensity={1.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/** Outer engineered ribs — three slender rings suggesting machine structure. */
function OuterRibs({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = reducedMotion ? 0 : t * 0.05;
    ref.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.08) * 0.05;
  });

  return (
    <group ref={ref}>
      {[1.8, 2.0, 2.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.1, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.008, 8, 80]} />
          <meshStandardMaterial
            color="#3a3a4a"
            emissive="#6b5bff"
            emissiveIntensity={0.08}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Luminous nodes floating around the core. */
function SignalNodes({
  pointer,
  reducedMotion,
  count = 24,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  count?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const nodes = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.7;
      return {
        basePos: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.6,
          (Math.random() - 0.5) * 1.5
        ),
        size: 0.04 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = reducedMotion ? 0 : t * 0.04;

    group.current.children.forEach((child, i) => {
      const node = nodes[i];
      if (!node) return;
      const pulse = reducedMotion ? 1 : 0.7 + Math.sin(t * 1.5 + node.phase) * 0.3;
      // Pointer attraction — only on capable devices.
      const px = pointer.current.x * viewport.width * 0.5;
      const py = pointer.current.y * viewport.height * 0.5;
      const dx = px - node.basePos.x;
      const dy = py - node.basePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = reducedMotion ? 0 : Math.max(0, 1 - dist / 4) * 0.3;
      child.position.x = node.basePos.x + dx * pull;
      child.position.y = node.basePos.y + dy * pull;
      child.position.z = node.basePos.z + Math.sin(t * 0.8 + node.phase) * 0.2;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.basePos}>
          <sphereGeometry args={[n.size, 12, 12]} />
          <meshStandardMaterial
            color="#8b7fff"
            emissive="#6b5bff"
            emissiveIntensity={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Subtle particle field — represents the signal medium itself. */
function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = reducedMotion ? 0 : t * 0.02;
    ref.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8b7fff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Signal traces — animated lines flowing around the core. */
function SignalTraces({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);

  const traces = useMemo(() => {
    return new Array(3).fill(0).map((_, i) => {
      const pts: THREE.Vector3[] = [];
      const segments = 60;
      const radius = 1.6 + i * 0.3;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const angle = t * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * radius * 0.4
          )
        );
      }
      return { pts, speed: 0.3 + i * 0.15, offset: i };
    });
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const trace = traces[i];
      if (!trace) return;
      child.rotation.y = reducedMotion ? 0 : t * trace.speed + trace.offset;
      child.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.1 + i) * 0.1;
    });
  });

  return (
    <group ref={ref}>
      {traces.map((trace, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  trace.pts.flatMap((v) => [v.x, v.y, v.z])
                ),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#6b5bff"
            transparent
            opacity={0.35 - i * 0.07}
          />
        </line>
      ))}
    </group>
  );
}

function SignalCoreScene({ pointer, reducedMotion, isMobile }: SignalCoreProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Subtle overall rotation, never aggressive.
    group.current.rotation.y = reducedMotion ? 0 : t * 0.03;
    // Pointer parallax — gentle, never scroll-jacking.
    if (!reducedMotion) {
      const targetX = pointer.current.y * 0.15;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
      group.current.position.x += (pointer.current.x * 0.3 - group.current.position.x) * 0.04;
      group.current.position.y += (pointer.current.y * 0.2 - group.current.position.y) * 0.04;
    }
  });

  const nodeCount = isMobile ? 14 : 28;

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2.2} color="#ffb672" />
      <pointLight position={[4, 2, 3]} intensity={1.2} color="#6b5bff" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#8b7fff" />

      <InnerMembrane reducedMotion={reducedMotion} />
      <YFrame reducedMotion={reducedMotion} />
      <GLoop reducedMotion={reducedMotion} />
      <OuterRibs reducedMotion={reducedMotion} />
      <SignalTraces reducedMotion={reducedMotion} />
      <SignalNodes pointer={pointer} reducedMotion={reducedMotion} count={nodeCount} />
      {!isMobile && <ParticleField reducedMotion={reducedMotion} />}
    </group>
  );
}

/** Default export — the full Canvas wrapper. */
export default function SignalCore({
  pointer,
  reducedMotion,
  isMobile,
}: SignalCoreProps) {
  const dpr = useMemo<[number, number]>(() => {
    if (isMobile) return [1, 1.5];
    return [1, 2];
  }, [isMobile]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <SignalCoreScene
          pointer={pointer}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      </Suspense>
    </Canvas>
  );
}
