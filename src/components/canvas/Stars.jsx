import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    // Generate 1500 points (4500 coordinates)
    const count = 4500;
    const positions = new Float32Array(count);
    const radius = 1.2;

    for (let i = 0; i < count; i += 3) {
      let x, y, z, d2;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        d2 = x * x + y * y + z * z;
      } while (d2 > 1 || d2 === 0);

      const d = Math.sqrt(d2);
      positions[i] = (x / d) * radius;
      positions[i + 1] = (y / d) * radius;
      positions[i + 2] = (z / d) * radius;
    }
    return positions;
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
