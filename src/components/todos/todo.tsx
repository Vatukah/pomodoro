import { useState } from "react";
import type { ITodo } from "../../type";
import { Icon } from "../icon";
import ActionModal from "./actionModal";

export default function Todo({todo,isActive}:{todo:ITodo,isActive:boolean}){
    const [isActionModal,setIsActionModal] = useState(false);

    const closeModal = ()=>{
        const parent = document.getElementById('todoContainer_body');
        if(!parent) return;

        parent.style.overflow='auto';
        setIsActionModal(false);

    }
    const openModal =() => {
        const parent = document.getElementById('todoContainer_body');
        if(!parent) return;

        parent.style.overflow='hidden';
        setIsActionModal(true);
    }
    return (
        <div className={`todo ${isActive?"is-active":""}`}>
          
         <div className={`todo_title ${todo.status === "completed"?"strike":""}`}>{todo.title}</div>
         <div className="todo_status" data-status={todo.status}>{todo.status}</div>
         <div className="todo_actions" onClick={openModal}><Icon name="EllipsisVertical" /></div>
         {isActionModal && <ActionModal id={todo.id} closeModal={closeModal}/>}
        </div>
    )
}