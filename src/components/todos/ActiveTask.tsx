import { useTodoStore } from "../../store/todo.store";
import { Icon } from "../icon";

import type { ITodo } from "../../type";

import useDemo from "../../hooks/useDemo";
import useActiveTodoTimer from "../../hooks/useActiveTodoTimer";

export default function ActiveTask() {
  const activeTodoId = useTodoStore((s) => s.activeTodoId);

  const activeTask = useTodoStore((s) =>
    s.todos.find((t) => t.id === activeTodoId)
  );

  return (
    <div className={`active-task ${activeTask ? "is-active" : ""}`}>
      {/* <div className="active-task_head">Active task</div> */}
      <div className="active-task_body">
        {/* {activeTask && <div className="task">{activeTask.title}</div>} */}
        {activeTask && <Task task={activeTask} />}
        {!activeTask && <div className="no-task">No active task !!!</div>}
        {/* {activeTask && <button  onClick={()=>setIsTools(prev=>!prev)}><Icon name={`${isTool?"ChevronUp":"ChevronDown"}`}/></button>} */}
      </div>
    </div>
  );
}

function Task({ task }: { task: ITodo }) {
  const { clearActiveTodo, completeActiveTodo } = useActiveTodoTimer();
  return (
    <div className="task">
      <div className="task_session">
        <div className="task_session_digit">{task.completedPomo}</div>
        <div className="task_session_label">done</div>
      </div>
      <div className="task_title">{task.title}</div>
      <div className="task_actions">
        <button
          className="btn btn-small"
          title="mark completed"
          onClick={() => completeActiveTodo(task.id)}
        >
          <Icon name="Check" />
        </button>
        <button className="btn btn-small" title="todo list">
          <Icon name="ListTodo" />
        </button>
      </div>
      <button className="btn btn-small task-remover" onClick={clearActiveTodo}>
        <Icon name="X" />
      </button>
    </div>
  );
}
