import type { UUIDTypes } from "../type";
import useActiveTodoTimer from "./useActiveTodoTimer";

export default function useDemo(activeTodoId: UUIDTypes | null) {
  if (!activeTodoId) {
    return {
      startTodo: () => {},
      clearActiveTodo: () => {},
      completeActiveTodo: () => {},
    };
  }

  return useActiveTodoTimer(activeTodoId);
}
