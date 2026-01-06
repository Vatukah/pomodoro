import { useTodoPanel } from "../../store/UI/todoPanel.store";
import TodoContainer from "../todos/TodoContainer";

export default function TodoPanel(){
    const isTodoPanel = useTodoPanel((state)=> state.isTodoPanel);
    const close = useTodoPanel((state)=> state.close);


    
     return <TodoContainer isTodoPanel={isTodoPanel} closeTodoPanel={close}/>
}