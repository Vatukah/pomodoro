import { useEffect } from "react";
import { usePomodoroAction } from "../context/pomodoroProvider";
import { useTomato } from "../context/tomatoProvider";

export default function PomodoroTomatoBridge() {
  const { subscribe, isReady } = usePomodoroAction();
  const {animationController} = useTomato();

  useEffect(() => {
    if(!animationController) return;
    const unsubInit = subscribe("init", ({ duration }) => {
      animationController.introSeperateAndRotate(duration);
    });

    const unsubTick = subscribe("tick", ({ remaining }) => {
      animationController.tickRotate(remaining);
    });

    return () => {
      unsubInit();
      unsubTick();
    };
  }, [subscribe, animationController, isReady]);

  return null; // headless
}
