import { useState } from "react";
import { usePomodoroAction } from "../context/pomodoroProvider";

export default function useTimerActions() {
  const { startCurrentSession, resume, pause, reset, status } =
    usePomodoroAction();

  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const canStart = status === "idle" || status === "completed";
  const canPause = status === "ticking";
  const canResume = status === "paused";
  const showReset = hasStartedOnce;
  const isTimerActive = ["ticking", "paused"].includes(status);
  const canOpenSetTimer = !isTimerActive;

  function startTimer() {
    if (!canStart) return;

    setHasStartedOnce(true);
    startCurrentSession();
  }

  function resetTimer() {
    reset();
    setHasStartedOnce(false);
  }

  return {
    status,
    showReset,
    canStart,
    canPause,
    canResume,
    isTimerActive,
    canOpenSetTimer,
    startTimer,
    resumeTimer: () => canResume && resume(),
    resetTimer,
    pauseTimer: () => canPause && pause(),
  };
}
