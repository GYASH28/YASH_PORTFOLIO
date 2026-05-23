import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";

function BrowserModel() {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.55) * 0.12;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2.7, 1.55, 0.08]} />
        <meshStandardMaterial color="#111628" metalness={0.4} roughness={0.26} />
      </mesh>
      <Html transform center position={[0, 0, 0.07]} distanceFactor={1.35} className="floating-browser-html">
        <div className="floating-browser-mini">
          <span />
          <span />
          <span />
          <b>Lernio AI</b>
          <i />
        </div>
      </Html>
    </group>
  );
}

export function FloatingBrowser() {
  return (
    <div className="floating-browser-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.55} />
        <pointLight color="#00FF88" position={[1.8, 1.4, 2]} intensity={1.2} />
        <pointLight color="#4F8EF7" position={[-2, -1, 1]} intensity={0.6} />
        <BrowserModel />
      </Canvas>
    </div>
  );
}
