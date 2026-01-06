import { useEffect, useState } from "react";
import { usePomodoro, usePomodoroAction } from "../../context/pomodoroProvider";

import GhostBtn from "../buttons/ghostBtn";

import ThemeIconBtn from "../buttons/themeIconBtn";
import { Icon } from "../icon";
import { useTheme } from "../../context/themeProvider";
import { useTodoPanel } from "../../store/UI/todoPanel.store";
import IconBtn from "../buttons/IconButton";
import type { PostMessagePayload } from "../../type";
import ModeTimeline from "../ModeTimeline";

export default function TopTools({ timerModal }: { timerModal: boolean }) {
  const { mode, toggleFlowMode, flowMode } = usePomodoro();
  const { subscribe, isReady } = usePomodoroAction();
  const { theme, toggleTheme } = useTheme();
  const toggleTodoPanel = useTodoPanel((state)=> state.toggle);
 

  const [isTicking, setIsTicking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = subscribe("status", (payload:PostMessagePayload<'status'>['payload']) => {
      const {status} = payload
      if (status === "ticking") {
        setIsTicking(true);
      } else {
        setIsTicking(false);
      }
    });
    return () => unsub();
  }, [isReady]);

  return (
    <div
      className={`top-tool-container ${
        timerModal ? "exit-up hidden" : "enter-down"
      }`}
    >
  
        {/* <ThemeIconBtn
          text="Focus Time"
          action={() => {
            // handleMode("focus");
          }}
          color="var(--level-extreme)"
          isActive={mode === "focus"}
          disable={isTicking}
          icon="Target"
        />

        <ThemeIconBtn
          text="Short break"
          action={() => {
            // handleMode("short-break");
          }}
          color="var(--level-low)"
          isActive={mode === "short-break"}
          disable={isTicking}
          icon="Coffee"
        />

        <ThemeIconBtn
          text="Long break"
          action={() => {
            // handleMode("long-break");
          }}
          color="var(--level-medium)"
          isActive={mode === "long-break"} 
          disable={isTicking}
          icon="Bed"
        /> */}
        <ModeTimeline/>

      <div style={{ width: "fit-content" }} className="topToggleContainer">
        <ThemeIconBtn
          text="Flow mode"
          action={toggleFlowMode}
          color="var(--level-high)"
          isActive={flowMode}
          icon="Zap"
        />
        <IconBtn text="Todos" action={toggleTodoPanel} icon="ListTodo" />
        <GhostBtn text="theme" action={toggleTheme}>
          <Icon name={theme === "light" ? "Moon" : "Sun"} />
        </GhostBtn>
      </div>
    </div>
  );
}
