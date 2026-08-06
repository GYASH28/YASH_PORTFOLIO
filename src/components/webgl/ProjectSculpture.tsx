"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The Project Sculpture
 *
 * A 3D composition built from recognizable materials belonging to the
 * four projects: pages/lesson tiles, voice waveform ribbons, mobile
 * interface planes, QR modules, yarn strands, interface panels.
 *
 * The sculpture slowly reorganizes as the pointer moves, revealing
 * different project identities.
 */

interface SculptureProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  isMobile: boolean;
}

/** A paper-like plane (Lernio material). */
function PaperPlane({ position, rotation, accent }: { position: [number, number, number]; rotation: [number, number, number]; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.04;
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.05;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[1.2, 1.6, 1, 1]} />
      <meshStandardMaterial
        color={accent}
        emissive={accent}
        emissiveIntensity={0.15}
        roughness={0.85}
        metalness={0.05}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

/** A glassy panel (B.R.A.C.E. material — frosted, refractive). */
function GlassPanel({ position, accent }: { position: [number, number, number]; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.2 + position[0]) * 0.1;
  });
  return (
    <mesh ref={ref} position={position} rotation={[0.2, 0, 0.15]}>
      <planeGeometry args={[1.0, 1.4, 1, 1]} />
      <meshPhysicalMaterial
        color={accent}
        emissive={accent}
        emissiveIntensity={0.3}
        roughness={0.15}
        metalness={0.4}
        transmission={0.4}
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** A waveform ribbon (B.R.A.C.E. voice material). */
function WaveformRibbon({ position, accent }: { position: [number, number, number]; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 24 }, (_, i) => {
        const t = i / 23;
        return new THREE.Vector3(
          (t - 0.5) * 2.2,
          Math.sin(t * Math.PI * 4) * 0.15,
          0
        );
      })
    );
    return new THREE.TubeGeometry(curve, 64, 0.025, 8, false);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.05;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.04;
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} roughness={0.3} />
    </mesh>
  );
}

/** A QR-style tile cluster (CampusMate material). */
function QRTiles({ position, accent }: { position: [number, number, number]; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  const tiles = useMemo(() => {
    const cells = [];
    for (let i = 0; i < 16; i++) {
      const seed = (i * 7 + 13) % 17;
      if (seed % 3 === 0) {
        const x = (i % 4) * 0.18 - 0.27;
        const y = Math.floor(i / 4) * 0.18 - 0.27;
        cells.push({ x, y, on: true });
      }
    }
    return cells;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.25) * 0.15;
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0, -0.1]}>
      {tiles.map((tile, i) => (
        <mesh key={i} position={[tile.x, tile.y, 0]}>
          <planeGeometry args={[0.16, 0.16]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} roughness={0.5} />
        </mesh>
      ))}
      {/* Corner markers */}
      {[[ -0.3, 0.3], [0.3, 0.3], [-0.3, -0.3]].map(([x, y], i) => (
        <mesh key={`corner-${i}`} position={[x, y, 0.01]}>
          <ringGeometry args={[0.07, 0.09, 4, 1]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** A yarn strand (Fakhri Mart material). */
function YarnStrand({ position, accent }: { position: [number, number, number]; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 30 }, (_, i) => {
        const t = i / 29;
        return new THREE.Vector3(
          (t - 0.5) * 2.5,
          Math.sin(t * Math.PI * 3) * 0.4 + Math.cos(t * Math.PI * 5) * 0.1,
          (t - 0.5) * 0.6
        );
      })
    );
    return new THREE.TubeGeometry(curve, 80, 0.018, 6, false);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1;
  });

  return (
    <mesh ref={ref} position={position} rotation={[0.1, 0.4, -0.2]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

/** Small floating fragments — interface panel bits. */
function FloatingFragments({ pointer, reducedMotion }: { pointer: SculptureProps["pointer"]; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const fragments = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      ),
      size: 0.04 + Math.random() * 0.05,
      color: ["#f5a85b", "#e9b949", "#7a6bd1", "#1f7ae0", "#2ba87a", "#e89438"][i % 6],
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const f = fragments[i];
      if (!f) return;
      const pulse = reducedMotion ? 1 : 0.7 + Math.sin(t * 1.2 + f.phase) * 0.3;
      const px = pointer.current.x * viewport.width * 0.4;
      const py = pointer.current.y * viewport.height * 0.4;
      const dx = px - f.pos.x;
      const dy = py - f.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = reducedMotion ? 0 : Math.max(0, 1 - dist / 3) * 0.15;
      child.position.x = f.pos.x + dx * pull;
      child.position.y = f.pos.y + dy * pull;
      child.position.z = f.pos.z + Math.sin(t * 0.6 + f.phase) * 0.15;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {fragments.map((f, i) => (
        <mesh key={i} position={f.pos}>
          <boxGeometry args={[f.size, f.size, f.size * 0.3]} />
          <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={0.7} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function SculptureScene({ pointer, reducedMotion, isMobile }: SculptureProps) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = reducedMotion ? -0.3 : -0.3 + t * 0.02;
    if (!reducedMotion) {
      const targetX = pointer.current.y * 0.12;
      const targetZ = pointer.current.x * 0.08;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.35} color="#f3ebdc" />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#f5a85b" />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#7a6bd1" />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#f5a85b" />

      {/* Lernio paper plane */}
      <PaperPlane position={[-1.3, 0.6, 0.2]} rotation={[0.1, 0.4, -0.1]} accent="#e9b949" />

      {/* B.R.A.C.E. glass panel + waveform */}
      <GlassPanel position={[1.4, -0.2, -0.5]} accent="#7a6bd1" />
      <WaveformRibbon position={[1.5, 0.8, 0]} accent="#b8c0cc" />

      {/* CampusMate QR tiles */}
      <QRTiles position={[0.4, -1.2, 0.6]} accent="#1f7ae0" />

      {/* Fakhri Mart yarn strand — sweeping across */}
      <YarnStrand position={[0, 0, -0.4]} accent="#e89438" />

      {/* Floating interface fragments */}
      <FloatingFragments pointer={pointer} reducedMotion={reducedMotion} />

      {/* Central warm core — represents the human at the center */}
      <mesh position={[0, 0, 0.5]}>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial
          color="#f5a85b"
          emissive="#f5a85b"
          emissiveIntensity={1.4}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function ProjectSculpture({ pointer, reducedMotion, isMobile }: SculptureProps) {
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <SculptureScene pointer={pointer} reducedMotion={reducedMotion} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
