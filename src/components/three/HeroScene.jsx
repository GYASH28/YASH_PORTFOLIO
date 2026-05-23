import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

function CodeEditor() {
  const lines = [
    "const lernio = new LernioAI();",
    "await lernio.generateQuiz(topic);",
    "const hints = lernio.smartHints();",
    "lernio.deploy({ platform: 'vercel' });",
    "// shipped in 3.2s",
  ];
  const fullText = lines.join("\n");
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let timeout;
    const type = () => {
      setText(fullText.slice(0, index));
      index += 1;
      if (index <= fullText.length) {
        timeout = setTimeout(type, 28);
      } else {
        timeout = setTimeout(() => {
          index = 0;
          setText("");
          type();
        }, 2000);
      }
    };
    timeout = setTimeout(type, 900);
    return () => clearTimeout(timeout);
  }, [fullText]);

  return (
    <div className="code-editor">
      {text.split("\n").map((line, index) => (
        <div className="code-row" key={`${line}-${index}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <code>
            {line}
            {index === text.split("\n").length - 1 && <b>|</b>}
          </code>
        </div>
      ))}
    </div>
  );
}

function LernioScreen() {
  return (
    <div className="monitor-browser">
      <div className="monitor-chrome">
        <i />
        <i />
        <i />
        <span>lernioai.vercel.app</span>
        <b>LIVE</b>
      </div>
      <div className="monitor-app">
        <aside>
          <strong>Lernio</strong>
          <span />
          <span />
          <span />
        </aside>
        <main>
          <p>AI Quiz</p>
          <h3>Explain transformer losses?</h3>
          <div className="screen-card">
            <span>Smart hint ready</span>
            <button type="button">Reveal hint</button>
          </div>
        </main>
      </div>
    </div>
  );
}

function Keys() {
  const keys = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      keys.push(
        <mesh key={`${row}-${col}`} position={[-0.72 + col * 0.13, 0.045, -0.42 + row * 0.12]}>
          <boxGeometry args={[0.1, 0.015, 0.075]} />
          <meshStandardMaterial color="#111216" metalness={0.75} roughness={0.22} />
        </mesh>,
      );
    }
  }
  return keys;
}

function Laptop() {
  return (
    <group position={[-1.15, 0.11, 0.45]} rotation={[0, 0.18, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.55, 0.06, 1.7]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.75} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0.04, 0.25]}>
        <boxGeometry args={[0.75, 0.014, 0.38]} />
        <meshStandardMaterial color="#0e0f12" metalness={0.7} roughness={0.2} />
      </mesh>
      <Keys />
      <group position={[0, 0.16, -0.82]} rotation={[-1.12, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.55, 0.04, 1.5]} />
          <meshStandardMaterial color="#202124" metalness={0.76} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.025, 0.03]}>
          <planeGeometry args={[2.32, 1.28]} />
          <meshBasicMaterial color="#05070e" />
        </mesh>
        <Html transform center position={[0, 0.036, 0.04]} distanceFactor={1.5} className="screen-html laptop-html">
          <CodeEditor />
        </Html>
        <pointLight color="#00FF88" intensity={1.25} distance={2.4} position={[0, 0.18, 0.5]} />
      </group>
    </group>
  );
}

function Monitor() {
  return (
    <group position={[1.7, 1.02, -0.38]} rotation={[0, -0.26, 0]}>
      <mesh position={[0, -0.72, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.62, 24]} />
        <meshStandardMaterial color="#16181f" metalness={0.8} roughness={0.18} />
      </mesh>
      <mesh position={[0, -1.06, 0]} castShadow>
        <boxGeometry args={[0.78, 0.05, 0.42]} />
        <meshStandardMaterial color="#171920" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow>
        <boxGeometry args={[3.45, 1.95, 0.08]} />
        <meshStandardMaterial color="#141416" metalness={0.72} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[3.2, 1.72]} />
        <meshBasicMaterial color="#05070f" />
      </mesh>
      <Html transform center position={[0, 0, 0.095]} distanceFactor={1.8} className="screen-html monitor-html">
        <LernioScreen />
      </Html>
      <pointLight color="#4F8EF7" intensity={0.9} distance={3.2} position={[0, 0.1, 0.5]} />
    </group>
  );
}

function MugSteam() {
  const group = useRef(null);
  const curves = useMemo(
    () =>
      [0, 1, 2].map((i) => {
        const points = Array.from({ length: 6 }, (_, index) => {
          const y = index * 0.09;
          return new THREE.Vector3(Math.sin(index + i) * 0.025, y, Math.cos(index * 0.6 + i) * 0.018);
        });
        return new THREE.CatmullRomCurve3(points);
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.025;
  });

  return (
    <group ref={group} position={[-3.2, 0.38, 1.38]}>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 18, 0.006, 6, false]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function Mug() {
  return (
    <group position={[-3.2, 0.19, 1.38]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.16, 0.28, 24]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.42} metalness={0.28} />
      </mesh>
      <mesh position={[0.2, 0.02, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <torusGeometry args={[0.12, 0.02, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.42} metalness={0.28} />
      </mesh>
      <MugSteam />
    </group>
  );
}

function Papers() {
  const papers = [
    { position: [-2.7, 0.16, -1.35], rotation: -0.2, color: "#fff06b", text: "Lernio v2.0 ideas" },
    { position: [0.18, 0.162, 1.65], rotation: 0.18, color: "#eef2ff", text: "fix auth bug" },
    { position: [2.8, 0.164, 1.35], rotation: -0.42, color: "#c8dcff", text: "ship by friday" },
  ];

  return papers.map((paper) => (
    <group key={paper.text} position={paper.position} rotation={[Math.PI / -2, 0, paper.rotation]}>
      <mesh receiveShadow>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial color={paper.color} transparent opacity={0.88} side={THREE.DoubleSide} />
      </mesh>
      <Html transform center position={[0, 0, 0.003]} distanceFactor={2.8} className="note-html">
        {paper.text}
      </Html>
    </group>
  ));
}

function Plant() {
  const leaves = [-0.7, -0.35, 0, 0.35, 0.7];
  return (
    <group position={[3.15, 0.23, -1.85]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.22, 18]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.6} />
      </mesh>
      {leaves.map((angle, index) => (
        <mesh key={angle} position={[Math.sin(angle) * 0.12, 0.18 + index * 0.012, Math.cos(angle) * 0.08]} rotation={[0.8, angle, 0]} scale={[0.08, 0.02, 0.22]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial color="#1a4a2e" roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Desk({ mobile }) {
  return (
    <group>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[8, 0.08, 5.5]} />
        <meshStandardMaterial color="#2a1909" roughness={0.86} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.105, 2.82]}>
        <boxGeometry args={[5.8, 0.018, 0.035]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.85} />
      </mesh>
      {[
        [0, 0.06, 2.78, 8.1, 0.06, 0.08],
        [0, 0.06, -2.78, 8.1, 0.06, 0.08],
        [4.05, 0.06, 0, 0.08, 0.06, 5.5],
        [-4.05, 0.06, 0, 0.08, 0.06, 5.5],
      ].map(([x, y, z, w, h, d], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#3a230c" metalness={0.1} roughness={0.72} />
        </mesh>
      ))}
      <Laptop />
      {!mobile && <Monitor />}
      {!mobile && <Mug />}
      {!mobile && <Papers />}
      {!mobile && <Plant />}
    </group>
  );
}

function CameraRig({ mobile }) {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.position.set(mobile ? 5.2 : 6.2, mobile ? 6.4 : 6.8, mobile ? 6.2 : 6.6);
    camera.lookAt(0, mobile ? 0.15 : 0.2, 0);
    camera.zoom = mobile ? 82 : 70;
    camera.updateProjectionMatrix();
  }, [camera, mobile]);

  return null;
}

function SceneContent({ mobile, reducedMotion }) {
  const group = useRef(null);
  const pointer = useThree((state) => state.pointer);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.008;
    group.current.rotation.y += (pointer.x * 0.06 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (pointer.y * -0.03 - group.current.rotation.x) * 0.03;
  });

  return (
    <>
      <OrthographicCamera makeDefault near={0.1} far={100} />
      <CameraRig mobile={mobile} />
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#caffee", "#080407", 0.45]} />
      <pointLight position={[-3, 4, 2]} color="#ffffff" intensity={1.75} />
      <pointLight position={[3, 1.6, -1]} color="#00FF88" intensity={0.6} distance={4.8} />
      <group ref={group} position={[mobile ? 0 : 0.25, -0.58, 0]} rotation={[0, -0.42, 0]}>
        <Desk mobile={mobile} />
      </group>
      <ContactShadows position={[0, -0.64, 0]} opacity={0.4} scale={8} blur={2.2} far={2.6} />
    </>
  );
}

export function HeroScene({ reducedMotion = false }) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-scene-canvas" aria-label="3D developer workstation scene">
      <Canvas
        dpr={mobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        shadows={!mobile}
      >
        <Suspense fallback={null}>
          <SceneContent mobile={mobile} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
