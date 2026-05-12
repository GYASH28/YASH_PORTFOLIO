import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SubtleHalo = ({ reducedMotion }) => {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    
    // Slow, cinematic rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x -= delta * 0.05;
      ring1Ref.current.rotation.y += delta * 0.08;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.03;
      ring2Ref.current.rotation.y -= delta * 0.04;
      ring2Ref.current.rotation.z -= delta * 0.02;
    }
  });

  return (
    // Anchor explicitly to the right/top to sit behind the portrait's shoulder/head
    <group ref={groupRef} position={[4, 1.5, -3]}>
      <Float speed={reducedMotion ? 0 : 1} rotationIntensity={0.05} floatIntensity={0.1}>
        
        {/* Core Atmospheric Glow (very subtle) */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial 
            color="#00F5FF" 
            transparent 
            opacity={0.03} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Elegant Thin Arc 1 */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.5, 0.005, 16, 100, Math.PI * 1.5]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
        
        {/* Elegant Thin Arc 2 */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[4.2, 0.008, 16, 100, Math.PI * 1.2]} />
          <meshBasicMaterial color="#8B5CFF" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Ambient Data Sphere (faint wireframe) */}
        <mesh scale={1.2} rotation={[0.5, 0.5, 0]}>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial 
            color="#2D7CFF" 
            wireframe 
            transparent 
            opacity={0.02}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

      </Float>
    </group>
  );
};

export const ThreeHeroObject = ({ reducedMotion }) => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <SubtleHalo reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
