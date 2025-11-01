import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      // Generate sphere with validation
      const positions = random.inSphere(new Float32Array(5000), {
        radius: 1.2,
      });

      // Validate positions to prevent NaN values
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i])) {
          console.warn("Found NaN in star positions, using fallback");
          // Return a simple fallback sphere
          return new Float32Array(5000).map(() => (Math.random() - 0.5) * 2.4);
        }
      }

      return positions;
    } catch (error) {
      console.error("Error generating star positions:", error);
      // Fallback to simple random positions
      return new Float32Array(5000).map(() => (Math.random() - 0.5) * 2.4);
    }
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [hasError, setHasError] = useState(false);

  // Error boundary for 3D rendering
  if (hasError) {
    return (
      <div className="w-full h-auto absolute inset-0 z-[-1] flex items-center justify-center">
        <p className="text-white">Stars failed to load</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        onError={(error) => {
          console.error("Stars Canvas error:", error);
          setHasError(true);
        }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
