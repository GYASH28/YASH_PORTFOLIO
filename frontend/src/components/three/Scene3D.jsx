import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Icosahedron, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Subtle background 3D scene that lives behind all content (z-0).
 * - Lazy loaded after boot.
 * - Reduced complexity on mobile + reduced motion.
 */
export const Scene3D = ({ reducedMotion = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)");
    setIsMobile(m.matches);
    const cb = (e) => setIsMobile(e.matches);
    m.addEventListener?.("change", cb);
    return () => m.removeEventListener?.("change", cb);
  }, []);

  if (reducedMotion) {
    // Render a static dim gradient div instead
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 30% 30%, rgba(45,124,255,0.10), transparent 70%), radial-gradient(50% 30% at 80% 70%, rgba(0,245,255,0.10), transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      data-testid="scene-3d-root"
    >
      <Canvas
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 6, 5]} intensity={1.1} color={"#ffffff"} />
        <pointLight position={[-6, -3, 4]} intensity={0.6} color={"#00F5FF"} />
        <pointLight position={[5, -4, -2]} intensity={0.35} color={"#8B5CFF"} />

        {/* Stars far away */}
        <Stars
          radius={60}
          depth={50}
          count={isMobile ? 1500 : 3500}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />

        {/* Floating glass-like orb (AI brain) */}
        <Float speed={1.0} rotationIntensity={0.6} floatIntensity={1.0}>
          <BrainOrb position={[3.2, 1.2, -2]} scale={isMobile ? 0.7 : 1} />
        </Float>

        {/* Wireframe code cube */}
        <Float speed={1.3} rotationIntensity={0.8} floatIntensity={1.4}>
          <CodeCube position={[-3.2, -1.0, -1.5]} scale={isMobile ? 0.65 : 0.85} />
        </Float>

        {/* Glowing torus rings */}
        <Float speed={0.7} rotationIntensity={0.5} floatIntensity={0.8}>
          <Rings position={[0, -2.4, -3]} scale={isMobile ? 0.7 : 1} />
        </Float>
      </Canvas>
    </div>
  );
};

const BrainOrb = ({ position, scale }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <Icosahedron args={[1.05, 1]}>
        <MeshDistortMaterial
          color={"#0A0F1A"}
          emissive={"#00F5FF"}
          emissiveIntensity={0.18}
          roughness={0.18}
          metalness={0.55}
          distort={0.35}
          speed={1.2}
          opacity={0.9}
          transparent
        />
      </Icosahedron>
      <Icosahedron args={[1.18, 1]}>
        <meshBasicMaterial color={"#00F5FF"} wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
};

const CodeCube = ({ position, scale }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.25;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color={"#070A10"}
          emissive={"#2D7CFF"}
          emissiveIntensity={0.06}
          roughness={0.35}
          metalness={0.55}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial color={"#7AE7FF"} wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
};

const Rings = ({ position, scale }) => {
  const a = useRef();
  const b = useRef();
  const c = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (a.current) {
      a.current.rotation.x = t * 0.25;
      a.current.rotation.y = t * 0.18;
    }
    if (b.current) {
      b.current.rotation.x = -t * 0.32;
      b.current.rotation.z = t * 0.22;
    }
    if (c.current) {
      c.current.rotation.y = t * 0.16;
      c.current.rotation.z = -t * 0.18;
    }
  });
  return (
    <group position={position} scale={scale}>
      <group ref={a}>
        <Torus args={[1.7, 0.012, 16, 120]}>
          <meshBasicMaterial color={"#00F5FF"} transparent opacity={0.55} />
        </Torus>
      </group>
      <group ref={b}>
        <Torus args={[2.1, 0.01, 16, 120]}>
          <meshBasicMaterial color={"#2D7CFF"} transparent opacity={0.45} />
        </Torus>
      </group>
      <group ref={c}>
        <Torus args={[2.6, 0.008, 16, 120]}>
          <meshBasicMaterial color={"#8B5CFF"} transparent opacity={0.35} />
        </Torus>
      </group>
    </group>
  );
};
