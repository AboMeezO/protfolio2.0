import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  CameraControls,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import { validateScene, logModelError } from "../../utils/modelValidator";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const [isValid, setIsValid] = useState(true);

  // Add validation to ensure the model is properly loaded
  useEffect(() => {
    if (computer.scene) {
      const validation = validateScene(computer.scene);

      if (!validation.isValid) {
        console.warn("Computer model validation failed:", validation.errors);
        setIsValid(false);
        logModelError("Computers", new Error("Invalid geometry detected"));
      }
    }
  }, [computer]);

  // Don't render if model isn't loaded properly or has invalid geometry
  if (!computer.scene || !isValid) {
    return (
      <mesh>
        <hemisphereLight intensity={1} groundColor="black" />
        <spotLight intensity={0.5} />
        <pointLight intensity={0.5} />
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#915EFF" wireframe />
      </mesh>
    );
  }

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor="black" />
      <spotLight intensity={0.5} />
      <pointLight intensity={0.5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Error boundary for 3D rendering
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white">3D Model failed to load</p>
      </div>
    );
  }

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onError={(error) => {
        console.error("Canvas error:", error);
        setHasError(true);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
