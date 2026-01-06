import IconBtn from "./buttons/IconButton";
import useTimerActions from "../hooks/useTimerActions";

export default function PlayContainer() {
  const {
    showReset,
    canStart,
    canPause,
    canResume,
    startTimer,
    resumeTimer,
    resetTimer,
    pauseTimer,
  } = useTimerActions();

  return (
    <div className="playContainer ">
      {canStart && <IconBtn text={"Start"} action={startTimer} icon={"Play"} />}
      {canPause && (
        <IconBtn text={"Pause"} action={pauseTimer} icon={"Pause"} />
      )}
      {canResume && (
        <IconBtn text={"Resume"} action={resumeTimer} icon={"Play"} />
      )}

      {showReset && (
        <IconBtn text="Reset" action={resetTimer} icon="RotateCcw" />
      )}
    </div>
  );
}
