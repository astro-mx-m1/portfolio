import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail, Sphere, OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetData {
  name: string;
  description: string;
  position: [number, number, number];
  size: number;
  color: string;
  ringColor?: string;
  hasRing?: boolean;
  speed?: number;
  orbitRadius?: number;
}

// Planet info card shown when focused
const PlanetInfo = ({ planet, onClose }: { planet: PlanetData; onClose: () => void }) => {
  return (
    <Html center distanceFactor={3}>
      <div className="bg-card/90 backdrop-blur-md border border-primary/30 rounded-xl p-4 min-w-[200px] transform -translate-y-24 animate-fade-in">
        <h3 className="text-lg font-bold text-foreground glow-text mb-1">{planet.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{planet.description}</p>
        <button 
          onClick={onClose}
          className="text-xs bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-full px-3 py-1 transition-colors"
        >
          Exit View
        </button>
      </div>
    </Html>
  );
};

// Interactive Planet
const Planet = ({ 
  data,
  isFocused,
  onFocus,
  onUnfocus
}: { 
  data: PlanetData;
  isFocused: boolean;
  onFocus: (pos: THREE.Vector3) => void;
  onUnfocus: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const currentPosRef = useRef(new THREE.Vector3(...data.position));

  useFrame((state) => {
    if (groupRef.current && data.orbitRadius && data.orbitRadius > 0 && !isFocused) {
      const t = state.clock.elapsedTime * (data.speed || 1) * 0.2;
      groupRef.current.position.x = Math.cos(t) * data.orbitRadius;
      groupRef.current.position.z = Math.sin(t) * data.orbitRadius;
      currentPosRef.current.copy(groupRef.current.position);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 * (data.speed || 1);
      const scale = hovered ? data.size * 1.2 : data.size;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  const handleClick = () => {
    if (isFocused) {
      onUnfocus();
    } else {
      onFocus(currentPosRef.current.clone());
    }
  };

  return (
    <group ref={groupRef} position={data.position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered || isFocused ? 0.6 : 0.2}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
      {data.hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[1.3 * data.size, 1.8 * data.size, 64]} />
          <meshStandardMaterial
            color={data.ringColor || data.color}
            emissive={data.ringColor || data.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {isFocused && <PlanetInfo planet={data} onClose={onUnfocus} />}
      {hovered && !isFocused && (
        <Sphere args={[data.size * 2, 16, 16]}>
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
            wireframe
          />
        </Sphere>
      )}
    </group>
  );
};

// Spiral Galaxy
const Galaxy = ({ position, size = 1, rotation = 0 }: { position: [number, number, number]; size?: number; rotation?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 8;
      const radius = (i / count) * 2 * size;
      const spiral = angle + (Math.random() - 0.5) * 0.5;
      
      positions[i * 3] = Math.cos(spiral) * radius + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 2] = Math.sin(spiral) * radius + (Math.random() - 0.5) * 0.3;
      
      const t = i / count;
      colors[i * 3] = 0 + t * 0.55;
      colors[i * 3 + 1] = 0.83 - t * 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, [size]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05 + rotation;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[Math.PI / 3, 0, 0]}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
      <mesh>
        <sphereGeometry args={[0.15 * size, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Nebula Cloud
const Nebula = ({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.01;
      const scale = size + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.15} wireframe />
    </mesh>
  );
};

// Shooting Comet
const Comet = ({ delay = 0 }: { delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime + delay) % 8);
      if (t < 2) {
        setActive(true);
        meshRef.current.position.x = -5 + t * 5;
        meshRef.current.position.y = 3 - t * 1.5;
        meshRef.current.position.z = -2 + t * 2;
      } else {
        setActive(false);
      }
    }
  });

  if (!active) return null;

  return (
    <Trail width={0.1} length={8} color="#00d4ff" attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={2} />
      </mesh>
    </Trail>
  );
};

// Asteroid Belt
const AsteroidBelt = ({ radius, count = 100 }: { radius: number; count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const asteroids = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.5;
      return {
        position: [Math.cos(angle) * r, (Math.random() - 0.5) * 0.2, Math.sin(angle) * r] as [number, number, number],
        size: 0.02 + Math.random() * 0.03
      };
    });
  }, [radius, count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position}>
          <dodecahedronGeometry args={[asteroid.size]} />
          <meshStandardMaterial color="#888888" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

// Star Cluster
const StarCluster = ({ position, count = 50 }: { position: [number, number, number]; count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const stars = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      pos: [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5] as [number, number, number],
      size: 0.01 + Math.random() * 0.02
    }));
  }, [count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const scale = hovered ? 1.3 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.pos}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshStandardMaterial color={hovered ? "#ffffff" : "#00d4ff"} emissive={hovered ? "#ffffff" : "#00d4ff"} emissiveIntensity={hovered ? 2 : 1} />
        </mesh>
      ))}
    </group>
  );
};

// Wormhole
const Wormhole = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.scale.setScalar(hovered ? pulse * 1.2 : pulse);
    }
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {[0.3, 0.4, 0.5, 0.6, 0.7].map((size, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size, 0.02, 16, 64]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00d4ff" : "#8b5cf6"}
            emissive={i % 2 === 0 ? "#00d4ff" : "#8b5cf6"}
            emissiveIntensity={hovered ? 1.5 : 0.8}
            transparent
            opacity={0.8 - i * 0.1}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#000000" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Central Sun
const CentralSun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      coronaRef.current.scale.setScalar(hovered ? pulse * 1.2 : pulse);
      coronaRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={hovered ? 1 : 0.6} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
        <mesh ref={coronaRef}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} transparent opacity={0.1} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[0.02, 1.5, 0.02]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Camera Controller for focus mode
const CameraController = ({ focusTarget, isFocused }: { focusTarget: THREE.Vector3 | null; isFocused: boolean }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current && focusTarget && isFocused) {
      controlsRef.current.target.copy(focusTarget);
    }
  }, [focusTarget, isFocused]);

  useFrame(() => {
    if (controlsRef.current && !isFocused) {
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={isFocused ? 1 : 3}
      maxDistance={isFocused ? 5 : 20}
      autoRotate={!isFocused}
      autoRotateSpeed={0.3}
      dampingFactor={0.05}
      enableDamping
    />
  );
};

// Planets data
const planetsData: PlanetData[] = [
  { name: "Terra Nova", description: "A habitable world with lush forests", position: [0, 0, 0], size: 0.15, color: "#4ade80", orbitRadius: 2, speed: 1 },
  { name: "Pyros", description: "Volcanic planet with ring system", position: [0, 0.5, 0], size: 0.25, color: "#f97316", orbitRadius: 3, speed: 0.7, hasRing: true, ringColor: "#fbbf24" },
  { name: "Aquarius", description: "Ocean world covered in water", position: [0, -0.3, 0], size: 0.12, color: "#06b6d4", orbitRadius: 4, speed: 0.5 },
  { name: "Nebulox", description: "Gas giant with mysterious rings", position: [0, 0.2, 0], size: 0.35, color: "#a855f7", orbitRadius: 5.5, speed: 0.3, hasRing: true, ringColor: "#c084fc" },
  { name: "Crystallis", description: "Ice world with crystalline surface", position: [0, 0, 0], size: 0.18, color: "#38bdf8", orbitRadius: 7, speed: 0.2 },
];

// Main scene
const Scene = () => {
  const [focusedPlanet, setFocusedPlanet] = useState<number | null>(null);
  const [focusTarget, setFocusTarget] = useState<THREE.Vector3 | null>(null);

  const handleFocus = useCallback((index: number, position: THREE.Vector3) => {
    setFocusedPlanet(index);
    setFocusTarget(position);
  }, []);

  const handleUnfocus = useCallback(() => {
    setFocusedPlanet(null);
    setFocusTarget(null);
  }, []);

  return (
    <>
      <CameraController focusTarget={focusTarget} isFocused={focusedPlanet !== null} />
      
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#00d4ff" />
      
      <Stars radius={80} depth={60} count={5000} factor={4} saturation={0} fade speed={0.5} />
      
      <CentralSun />
      
      {planetsData.map((planet, index) => (
        <Planet 
          key={index}
          data={planet}
          isFocused={focusedPlanet === index}
          onFocus={(pos) => handleFocus(index, pos)}
          onUnfocus={handleUnfocus}
        />
      ))}
      
      <Galaxy position={[-6, 3, -8]} size={2} rotation={0} />
      <Galaxy position={[7, -2, -10]} size={1.5} rotation={Math.PI / 4} />
      
      <Nebula position={[4, 2, -5]} color="#8b5cf6" size={1.5} />
      <Nebula position={[-4, -2, -6]} color="#00d4ff" size={1.2} />
      
      <StarCluster position={[3, 3, -4]} count={40} />
      <StarCluster position={[-4, 2, -3]} count={30} />
      
      <Wormhole position={[-3, -1, -2]} />
      
      <AsteroidBelt radius={7} count={150} />
      
      <Comet delay={0} />
      <Comet delay={3} />
      <Comet delay={6} />
    </>
  );
};

const NeuralScene3D = () => {
  return (
    <div className="w-full h-full min-h-[600px] rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        style={{ background: 'linear-gradient(180deg, hsl(220, 20%, 4%) 0%, hsl(220, 25%, 8%) 50%, hsl(260, 20%, 6%) 100%)' }}
      >
        <Scene />
      </Canvas>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-muted-foreground text-sm bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
          Click planets to focus • Drag to orbit • Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default NeuralScene3D;
