import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function IntelligenceCore({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const particles = useMemo(() => {
    const count = reduced ? 36 : 90;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.399963;
      const radius = 2.2 + ((i * 17) % 19) * 0.035;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = ((i % 23) / 22 - 0.5) * 4.2;
      values[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, [reduced]);

  useFrame(({ pointer }, delta) => {
    if (!group.current || reduced) return;
    const dt = Math.min(delta, 0.05);
    group.current.rotation.y += dt * 0.12;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * 0.12, 4, dt);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -pointer.x * 0.08, 4, dt);
    if (shell.current) shell.current.rotation.y -= dt * 0.2;
  });

  return (
    <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={group} rotation={[0.12, -0.2, 0]}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.78, reduced ? 3 : 5]} />
          <MeshTransmissionMaterial
            thickness={0.7}
            chromaticAberration={0.025}
            anisotropy={0.15}
            distortion={0.13}
            distortionScale={0.22}
            temporalDistortion={reduced ? 0 : 0.035}
            transmission={1}
            roughness={0.12}
            ior={1.35}
            color="#b9c7d8"
            samples={reduced ? 2 : 5}
            resolution={reduced ? 128 : 256}
          />
        </mesh>
        <mesh scale={0.94}>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshPhysicalMaterial color="#141923" metalness={0.9} roughness={0.19} clearcoat={1} clearcoatRoughness={0.12} />
        </mesh>
        <mesh scale={0.66}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial color="#7096cd" emissive="#45679c" emissiveIntensity={1.3} metalness={0.55} roughness={0.28} wireframe />
        </mesh>
        <mesh scale={0.28}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#dbe7f7" emissive="#8bb6ee" emissiveIntensity={2.3} roughness={0.08} />
        </mesh>
        {[0, 1, 2].map((ring) => (
          <mesh key={ring} rotation={[ring === 0 ? Math.PI / 2 : 0.65 + ring * 0.35, ring * 0.7, 0]}>
            <torusGeometry args={[2.05 + ring * 0.17, 0.012 + ring * 0.004, 10, reduced ? 64 : 128]} />
            <meshStandardMaterial color={ring === 1 ? "#8e80b8" : "#b8c8db"} metalness={0.92} roughness={0.2} emissive="#526784" emissiveIntensity={0.25} />
          </mesh>
        ))}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#b8cbed" size={0.025} transparent opacity={0.62} sizeAttenuation />
        </points>
      </group>
    </Float>
  );
}

export function CoreScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 7.2], fov: 42 }} dpr={reduced ? 1 : [1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.42} />
      <pointLight position={[4, 4, 5]} intensity={22} color="#afcdf6" />
      <pointLight position={[-4, -2, 2]} intensity={14} color="#8b74b8" />
      <spotLight position={[0, 5, 4]} intensity={18} angle={0.45} penumbra={1} color="#ffffff" />
      <Suspense fallback={null}>
        <IntelligenceCore reduced={reduced} />
        <Environment resolution={128}>
          <Lightformer intensity={2.2} position={[0, 5, 0]} scale={[10, 4, 1]} />
          <Lightformer intensity={1.4} color="#89a8d0" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
          <Lightformer intensity={1} color="#8f77ac" position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
