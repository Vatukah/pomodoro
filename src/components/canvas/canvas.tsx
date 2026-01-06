import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { memo, useEffect, useRef } from "react";
import cameraStore from "../../store/cameraStore";
import { a, useSpring, useSpringRef, animated } from "@react-spring/three";

const CanvasContainer: React.FC<{ children: THREE.Object3D }> = ({
  children,
}) => {
  
  return (
    <div className="canvasContainer">
      <Canvas>
        <CameraBinder />
        {/* === 3-Point Lighting Setup === */}
        {/* Key Light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          color="#ffffff"
          castShadow
        />

        {/* Fill Light */}
        <directionalLight
          position={[-5, 2, 3]}
          intensity={0.5}
          color="#ffd6a5"
        />

        {/* Rim / Back Light */}
        <directionalLight
          position={[0, 3, -5]}
          intensity={0.8}
          color="#9ecfff"
        />

        {/* Soft ambient */}
        <ambientLight intensity={0.3} color="#ffffff" />

        {/* === Model === */}

        {children}

        {/* Environment & Controls */}
       <Environment preset="sunset" background={false} /> 
      </Canvas>
    </div>
  );
};

function CameraBinder() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [spring, api] = useSpring(() => ({
    position: [0, 0, 5],
    lookAtX: 0,
    lookAtY: 0,
    lookAtz: 0,
    config: { mass: 1, tension: 90, friction: 18 },
  }));

  useEffect(() => {
    if (cameraRef.current) {
      cameraStore.setCamera(cameraRef.current);
      cameraStore.setApi(api);
    }
  }, []);

  const AnimatedCamera = animated(PerspectiveCamera);

  return (
    <AnimatedCamera
      position={spring.position}
      makeDefault
      ref={cameraRef}
      fov={60}
    ></AnimatedCamera>
  );
}

export default memo(CanvasContainer);
