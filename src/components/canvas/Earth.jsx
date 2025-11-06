import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const [isValid, setIsValid] = useState(true);
  const hasValidatedRef = useRef(false);
  const sceneRef = useRef(null);

  // Add validation to ensure the model is properly loaded - only run once per scene
  useEffect(() => {
    if (earth.scene && earth.scene !== sceneRef.current) {
      // Only validate if this is a new scene object
      sceneRef.current = earth.scene;
      
      if (!hasValidatedRef.current) {
        hasValidatedRef.current = true;
        // Validate the geometry to prevent NaN errors
        earth.scene.traverse((child) => {
          if (child.geometry && child.geometry.attributes.position) {
            const positions = child.geometry.attributes.position.array;
            // Check for NaN values in positions
            for (let i = 0; i < positions.length; i++) {
              if (isNaN(positions[i])) {
                console.warn(
                  "Found NaN in Earth geometry positions, skipping render"
                );
                setIsValid(false);
                return;
              }
            }
          }
        });
      }
    }
  }, [earth.scene]);

  // Don't render if model isn't loaded properly or has invalid geometry
  if (!earth.scene || !isValid) {
    return null;
  }

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const [hasError, setHasError] = useState(false);

  // Error boundary for 3D rendering
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white">Earth model failed to load</p>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
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
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
