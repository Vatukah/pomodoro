// TomatoContext.tsx
import { createContext, useContext, useEffect, useMemo } from "react";
import tomatoStore from "../store/tomatoStore";
import { TomatoAnimationController } from "../controller/tomatoController";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useBoot } from "./bootProvider";

const TomatoContext = createContext<{
  animationController: TomatoAnimationController | null;
  model: { [name: string]: THREE.Object3D<THREE.Object3DEventMap> } | null;
}>({ animationController: null, model: null });

export const TomatoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { nodes } = useGLTF("/pomodoro.glb");
  const { markReady } = useBoot();
  useEffect(() => {
    if (tomatoStore && nodes) {
      markReady('model');
    }
  }, [])
  const value = useMemo(
    () => ({
      animationController: tomatoStore,
      model: nodes,
    }),
    [tomatoStore, nodes]
  );
  return (
    <TomatoContext.Provider value={value}>{children}</TomatoContext.Provider>
  );
};

export const useTomato = () => {
  const ctx = useContext(TomatoContext);
  if (!ctx) throw new Error("useTomato must be used within TomatoProvider");
  return ctx;
};
