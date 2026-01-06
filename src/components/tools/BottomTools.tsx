import { useEffect, useState } from "react";
import { Icon } from "../icon";
import IconBtn from "../buttons/IconButton";
import { useModal } from "../../context/modalProvider";
import PlayContainer from "../PlayContainer";
import GhostBtn from "../buttons/ghostBtn";
import { usePomodoro, usePomodoroAction } from "../../context/pomodoroProvider";
import ActiveTask from "../todos/ActiveTask";

export default function BottomTools({
  timerModal,
  bottomActions,
}: {
  timerModal: boolean;
  bottomActions: any;
}) {
  const { close } = useModal();
  const { mode } = usePomodoro();

  return (
    <div
      className={`bottom-tool-container `}
      style={timerModal ? { zIndex: "var(--z-popover)" } : { zIndex: 10 }}
    >
      <ActiveTask/>
      {timerModal && (
        <div
          className={`setTime_tools ${
            timerModal ? "enter-right" : "exit-left"
          }`}
        >
          <IconBtn
            text="Short break"
            action={() => bottomActions.openSetTimer("short-break")}
            isActive={bottomActions.editingMode === "short-break"}
            icon="Coffee"
          />

          <IconBtn
            text="Focus"
            action={() => bottomActions.openSetTimer("focus")}
            isActive={bottomActions.editingMode === "focus"}
            icon="Target"
          />

          <IconBtn
            text="Long break"
            action={() => bottomActions.openSetTimer("long-break")}
            isActive={bottomActions.editingMode === "long-break"}
            icon="Bed"
          />

          <GhostBtn text="close modal" action={close}>
            <Icon name="X" size={20} />
          </GhostBtn>
        </div>
      )}

      {!timerModal && (
        <div
          className={`timer_tools ${timerModal ? "exit-right" : "enter-left"}`}
        >
          <IconBtn
            text="Setting"
            action={bottomActions.openSetting}
            icon="Settings"
          />

          <div className="heroBtn-container">
            <PlayContainer />
          </div>

          <IconBtn
            text="Set Time"
            action={() => bottomActions.openSetTimer(mode)}
            icon="Timer"
          />
        </div>
      )}
    </div>
  );
}
