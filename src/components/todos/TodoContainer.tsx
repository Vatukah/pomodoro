import { useTransition, animated } from "@react-spring/web";


import "../../styles/todos.css";
import GhostBtn from "../buttons/ghostBtn";


import Todo from "./todo";
import { getTodayDate } from "../../uitls/helper";
import IconBtn from "../buttons/IconButton";
import { Icon } from "../icon";
import { useModal } from "../../context/modalProvider";
import NoTodos from "./NoTodos";
import { useTodoStore } from "../../store/todo.store";

export default function TodoContainer({
  closeTodoPanel,
  isTodoPanel,
}: {
  closeTodoPanel: () => void;
  isTodoPanel: boolean;
}) {
  const  {todos,activeTodoId} = useTodoStore();
  const {open} = useModal()

  const transition = useTransition(isTodoPanel, {
    from: { opacity: 0, transform: "translateX(10%) " },
    enter: { opacity: 1, transform: "translateX(0%) " },
    leave: { opacity: 0, transform: "translateX(10%) " },
    config: { tension: 260, friction: 25 },
  });

  const openAddTodoModal = ()=>{
        open({type:"todo-add-form",center:true})
  }

  return transition(
    (styles, item) =>
      item && (
        <animated.div
          className={`todoContainer `}
          id={"todoContainer"}
          style={styles}
        >
          <div className="todoContainer_head">
            <div>
            <h4>Your Todo List</h4>
             <div className="todoContainer_date">{getTodayDate()}</div>
            </div>
            <GhostBtn text="close" action={closeTodoPanel}>
              <Icon name="X" />
            </GhostBtn>
          </div>
          <div className="todoContainer_body customScrollBar" id="todoContainer_body">
            {todos.length === 0 && <NoTodos/>}
            {todos.length > 0 &&
              todos.map((t) => <Todo key={t.id} todo={t} isActive={t.id === activeTodoId} />)}
          </div>
          <div className="todoContainer_foot">
           <IconBtn action={openAddTodoModal} icon="Plus" text="New To Do" type="hero"/>
          </div>
        </animated.div>
      )
  );
}
