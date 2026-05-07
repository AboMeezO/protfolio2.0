import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Moon = ({ radius, speed, offset = 0, tilt = 0.2 }) => {
  const ref = useRef();

  // High-fidelity textures from the provided example
  const [moonTexture, displacementMap] = useTexture([
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg",
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;

    // Elliptical orbit
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t) * (radius * tilt);

    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y += 0.002;
      ref.current.rotation.x += 0.0001;

      // Dynamic depth scaling
      const zFactor = (z + radius) / (2 * radius);
      const scaleFactor = 0.85 + zFactor * 0.45;
      ref.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.35, 64, 64]} />
      {/* Implementing the exact material settings from the example */}
      <meshPhongMaterial
        map={moonTexture}
        displacementMap={displacementMap}
        displacementScale={0.06}
        bumpMap={displacementMap}
        bumpScale={0.04}
        reflectivity={0}
        shininess={0}
        color={0xffffff}
      />
      {/* Subtle point light attached to the moon for that "lunar glow" */}
      <pointLight intensity={0.5} distance={3} color="#ffffff" />
    </mesh>
  );
};

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
      gl={{ preserveDrawingBuffer: true, antialias: true }}
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

        {/* The Moon - Closer radius and procedural realism */}
        {/* <Moon radius={2.2} speed={0.3} tilt={0.15} /> */}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
