import { useCallback, useState } from "react";
import GhostBtn from "../buttons/ghostBtn";
import IconBtn from "../buttons/IconButton";
import FlexContainer from "../flexContainer";
import {
  convertToMinutes,
  generateUUID,
} from "../../uitls/helper";
import { sessionCopy} from "../../uitls/helper";
import { useTodoStore } from "../../store/todo.store";
import type { ITodo } from "../../type";
import Stepper from "./Stepper";
import { useSettingsStore } from "../../store/settings.store";

export default function AddTodoModal({close}:{close:()=>void}) {
  const addTodo = useTodoStore((state) => state.addTodo);
  const getSetting  = useSettingsStore.getState().getSetting;
  const [sessions, setSessions] = useState<number>(1);
  const [title, setTitle] = useState<string>("");

  const handleAddTodo = useCallback(() => {
    if (title.trim().length === 0 || sessions === 0) return;

    const newTodo: ITodo = {
      id: generateUUID(),
      title,
       focusDuration:getSetting('focusTime'),
      estimatedPomo: sessions,
      completedPomo: 0,
      status: "pending",
    };

    addTodo(newTodo);
  }, [sessions, title]);

  return (
    <FlexContainer className="todo-modal" direction="column">
      <div className="todo-modal_head">
        <h3>New To-Do</h3>
      </div>

      <div className="todo-modal_body customScrollBar">
        <label htmlFor="todo_title" className="field">
          Title
        </label>
        <input
          type="text"
          name="todo_title"
          id="todo_title"
          className="todo_title"
          defaultValue={title}
          placeholder="What’s your mission today?"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="todo_sessions" className="field">
          Focus Session
        </label>
        <div className="subText">
          <span key={sessions ?? "default"} className="animate-text">
            {sessions
              ? sessionCopy(sessions)
              : "Choose a session count that matches your focus level today."}
          </span>
        </div>
        <div className="subText animate-text" key={sessions ?? "default"}>
          Total Focus -{" "}
          <span style={{ fontWeight: 600, color: "var(--text)" }}>
            {convertToMinutes(getSetting("focusTime")).min * sessions}
          </span>{" "}
          mins
        </div>
        <Stepper value={sessions} handleChange={(value)=>setSessions(value)}/>
      </div>
      <FlexContainer className="todo-modal_foot" justify="space-between">
        <GhostBtn action={close} text="close">
          Cancel
        </GhostBtn>
        <IconBtn text="Add" icon="Plus" action={handleAddTodo} type="hero" />
      </FlexContainer>
    </FlexContainer>
  );
}
