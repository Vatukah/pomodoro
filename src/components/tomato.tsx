// src/components/Model.tsx
import { memo, useEffect, useRef } from "react";
import { a, useSpring, SpringRef } from "@react-spring/three";
import * as THREE from "three";

import { useTomato } from "../context/tomatoProvider";
import { INITIAL_Y } from "../uitls/defaultVal";

import { useSettingsStore } from "../store/settings.store";

function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const initialRotateTarget = useSettingsStore.getState().settings.focusTime

  const { animationController, model } = useTomato();

  const [springs, api] = useSpring(() => ({
    positionY: INITIAL_Y,
    rotationZ: 0,
    config: { tension: 60, friction: 16 },
  }));

  // Register model + animation controller once
  useEffect(() => {
    if (!animationController || !model) return;

    animationController.setAnimationApi(api as SpringRef<any>);
    
    animationController.introSeperateAndRotate(initialRotateTarget);

    return () => {
      animationController.setAnimationApi(null);
      animationController.isIntroDone = false;
    }

  }, [animationController, api]);

  if (!model) return <div>NO model !!!</div>;

  return (
    <group ref={groupRef}>
      <primitive object={model.tomato_bottom} />

      <a.primitive
        object={model.tomato_top}
        position-y={springs.positionY}
        rotation-z={springs.rotationZ}
      />
    </group>
  );
}


export default memo(Model);
