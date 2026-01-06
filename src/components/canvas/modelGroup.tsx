import { useRef, useEffect, type ReactElement } from "react";
import { a, useSpring } from "@react-spring/three";
import * as THREE from "three";

interface ModelGroupProps {
  children: ReactElement<THREE.Object3D>;
}

export default function ModelGroup({ children }: ModelGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [spring, api] = useSpring(() => ({
    positionY: 2,
    topOffset: 0,
    config: { mass: 1, tension: 120, friction: 10 },
  }));

  useEffect(() => {
    api.start({
      from: { positionY: 2, topOffset: 0 },
      to: async (next) => {
        await next({ positionY: 0 });
        await next({ topOffset: 0.2 });
      },
    });
  }, [api]);

  return (
    <a.group
      ref={groupRef}
      position-y={spring.positionY}
      scale={1}
      rotation={[0, -1.55, -0.1]}
    >
      {children}
    </a.group>
  );
}
