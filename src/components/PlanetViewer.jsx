import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const PlanetModel = ({ planet }) => {
  const modelPath = `/src/assets/3d-models/${planet.name.toLowerCase()}.glb`;
  const { scene } = useGLTF(modelPath);
  const planetTexture = useLoader(TextureLoader, planet.texture);
  const meshRef = useRef();

  // Apply the texture to the model if it exists
  if (scene.children[0]?.material) {
    scene.children[0].material.map = planetTexture;
  }

  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
      position={[0, 0, 0]}
    />
  );
};

const LoadingSpinner = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#444444" wireframe />
    </mesh>
  );
};

const PlanetViewer = ({ planet }) => {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<LoadingSpinner />}>
        <PlanetModel planet={planet} />
      </Suspense>
      <OrbitControls 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={true}
        autoRotateSpeed={1}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
};

// Pre-load all models
const modelNames = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
modelNames.forEach(name => {
  useGLTF.preload(`/src/assets/3d-models/${name}.glb`);
});

export default PlanetViewer; 