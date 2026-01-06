import { usePomodoro } from "../context/pomodoroProvider";
import { animated, useTransition } from "@react-spring/web";

export default function ModeTimeline() {
  const { mode, decideNextSession } = usePomodoro();
  const activeMode = mode;
  const nextMode = decideNextSession(mode);
  const modeLabels = {
    focus: "Focus",
    "short-break": "Short break",
    "long-break": "Long break",
  };

  return (
    <div className="mode-timeline-cont">
      <div className={`mode-timeline active`}>{modeLabels[activeMode]}</div>
      <div className={`mode-timeline `}>{modeLabels[nextMode]}</div>
    </div>
  );
}
