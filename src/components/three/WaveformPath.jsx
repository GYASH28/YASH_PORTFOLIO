import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Waveform() {
  const tracer = useRef(null);
  const packets = useRef([]);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.8, -2.2, 0),
        new THREE.Vector3(0.75, -1.2, 0.1),
        new THREE.Vector3(-0.45, -0.2, 0),
        new THREE.Vector3(0.9, 0.85, -0.08),
        new THREE.Vector3(-0.25, 2.05, 0),
      ]),
    [],
  );

  const baseGeometry = useMemo(() => new THREE.TubeGeometry(curve, 96, 0.012, 8, false), [curve]);
  const traceGeometry = useMemo(() => new THREE.TubeGeometry(curve, 96, 0.018, 8, false), [curve]);
  const nodePoints = useMemo(() => [0.02, 0.25, 0.5, 0.74, 0.98].map((t) => curve.getPoint(t)), [curve]);

  useFrame(({ clock }) => {
    const progress = (Math.sin(clock.elapsedTime * 0.45) + 1) / 2;
    if (tracer.current) tracer.current.scale.y = 0.2 + progress * 0.8;
    packets.current.forEach((packet, index) => {
      if (!packet) return;
      const point = curve.getPoint((clock.elapsedTime * 0.09 + index * 0.22) % 1);
      packet.position.copy(point);
    });
  });

  return (
    <group rotation={[0, 0, -0.08]}>
      <mesh geometry={baseGeometry}>
        <meshBasicMaterial color="#00FF88" transparent opacity={0.28} />
      </mesh>
      <mesh ref={tracer} geometry={traceGeometry} scale={[1, 0.2, 1]}>
        <meshBasicMaterial color="#00FF88" transparent opacity={0.78} />
      </mesh>
      {nodePoints.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#00FF88" />
          <pointLight color="#00FF88" intensity={0.4} distance={0.8} />
        </mesh>
      ))}
      {[0, 1, 2].map((packet) => (
        <mesh ref={(node) => (packets.current[packet] = node)} key={packet}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#4F8EF7" />
        </mesh>
      ))}
    </group>
  );
}

export function WaveformPath() {
  return (
    <div className="waveform-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <Waveform />
      </Canvas>
    </div>
  );
}
