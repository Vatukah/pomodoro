import { useModal } from "../context/modalProvider";
import type { ITodo, MODE } from "../type";
import cameraStore from "../store/cameraStore";
import { useTodoPanel } from "../store/UI/todoPanel.store";
import useTimerActions from "./useTimerActions";
import { useCallback } from "react";


export default function useBottomTool() {
  const { open,modal } = useModal();
  const {canOpenSetTimer} = useTimerActions();
  const closeTodoPanel = useTodoPanel(state => state.close);

  
 
  const editingMode =
    modal.type === "set-timer" ? modal.mode : null;
  const openSetting = () => {
    open({ type: "settings" });
  };

  const isSetTimerActive = modal.type === "set-timer"? true: false;

  const closeSetTimer = () => {
    if (!cameraStore.api || !cameraStore.camera) return;
    cameraStore.wideShot();
  };

  const setTimer =  (mode: MODE) => {
    if (!cameraStore.api || !cameraStore.camera) return;
    cameraStore.closeShot(); // zoom in
    closeTodoPanel();
    open({ type: "set-timer", mode, onClose: closeSetTimer });
  };

  const openSetTimer = useCallback((mode: MODE) => {
    if (!canOpenSetTimer){
      alert("SetTimer blocked: timer is active");
      return;
    }
    setTimer(mode);
  },[canOpenSetTimer]);

  const openAddTodo = () => {
    open({ type: "todo-add-form" });
  };
  const openUpdateTodo = (todo: ITodo) => {
    open({ type: "todo-update-form", todo });
  };

  return { openSetting, openSetTimer, openAddTodo, openUpdateTodo,editingMode,isSetTimerActive};
}
