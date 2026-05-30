import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  const [isValid, setIsValid] = useState(true);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (earth.scene && earth.scene !== sceneRef.current) {
      sceneRef.current = earth.scene;

      let foundNaN = false;
      earth.scene.traverse((child) => {
        if (child.geometry && child.geometry.attributes.position) {
          const positions = child.geometry.attributes.position.array;
          let hasNaNInChild = false;
          for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) {
              foundNaN = true;
              hasNaNInChild = true;
              break;
            }
          }
          if (!hasNaNInChild) {
            try {
              child.geometry.computeBoundingSphere();
            } catch (e) {
              console.warn("Could not compute bounding sphere for child", child.name);
            }
          }
        }
      });

      if (foundNaN) {
        console.warn("Found NaN in Earth geometry, skipping render");
        setIsValid(false);
      }
    }
  }, [earth.scene]);

  if (!earth.scene || !isValid) {
    return null;
  }

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white text-center">
          Earth model encountered an error.
          <br />
          Please refresh or check the console.
        </p>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: false, antialias: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onError={(error) => {
        console.error("Earth Canvas error:", error);
        setHasError(true);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
