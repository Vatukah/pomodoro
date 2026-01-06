import { useEffect, useRef } from "react";
import type { ITodo } from "../../type";
import { useTodoStore } from "../../store/todo.store";
import { useModal } from "../../context/modalProvider";
import type { UUIDTypes } from "../../type";


export default function ActionModal({
  id,
  closeModal,
}: {
  id: ITodo["id"];
  closeModal: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    const parent = document
      .getElementById("todoContainer_body")
      ?.getBoundingClientRect();
    const modal = ref.current.getBoundingClientRect();

    const parentBottom = parent?.bottom;
    const bottom = modal.bottom;
    const parentTop = parent?.top;
    const top = modal.top;

    if (top < parentTop) {
      console.log("modal top", top);
      console.log("parent top", parentTop);

      ref.current.style.top = `${parentTop - top}px`;
    }

    if (bottom > parentBottom) {
      console.log("modal bottom", bottom);
      console.log("parent bottom", parentBottom);
      ref.current.style.top = `${parentBottom - bottom}px`;
    }

    document.addEventListener("mousedown", handleClickOutside); // Using 'mousedown' is often better for modal close actions than 'click'

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);
  return (
    <div className="todo_actionModal" onClick={closeModal} ref={ref}>
      <ContextMenu id={id} />
    </div>
  );
}

function ContextMenu({ id }: { id: UUIDTypes }) {
  const { deleteTodo, markCompleted,activateTodo } = useTodoStore();
  
  const { open } = useModal();

  const todo = useTodoStore((s) => s.todos.find((t) => t.id === id));

  if (!todo) return;

  const isCompleted = todo.completedPomo >= todo.estimatedPomo;

  

  return (
    <>
      {!isCompleted && (
        <div className="contextBtn" onClick={() => markCompleted(id)}>
          Mark completed
        </div>
      )}

      {isCompleted ? (
        <div className="contextBtn disabled">Completed ✔</div>
      ) : (
        <div className="contextBtn" onClick={()=>activateTodo(id)}>
          Start task
        </div>
      )}

      <div
        className="contextBtn"
        onClick={() => open({ type: "todo-update-form", todo, center: true })}
      >
        Edit
      </div>

      <div className="contextBtn danger" onClick={() => deleteTodo(id)}>
        Delete
      </div>
    </>
  );
}
