import type { ModalState } from "../type";
import SetTimerModal from "./SetTimerModal";
import SettingModal from "./SettingModal";
import AddTodoModal from "./todos/addTodoModal";
import UpdateTodoModal from "./todos/updateTodoModal";

export default function ModalRenderer({modal,onClose}:{modal:ModalState,onClose:()=>void}){

    if(modal.type === "closed") return null;

    const isCenter = "center" in modal?modal.center: false;
   
    return (
        <div id="modalWrapper" style={{alignItems:`${isCenter?'center':'end'}`}} onClickCapture={(e) => {
          if (e.target !== e.currentTarget) return;
          onClose();
        }}>
          <div id='modalContent'  >
            {renderModal({modal,onClose})}
          </div>
        </div>
    )
}

function renderModal({modal,onClose}:{modal:ModalState,onClose:()=>void}){
   
    switch(modal.type){
        case "set-timer":
           return <SetTimerModal changeTimeOf={modal.mode}/>
        case "settings":
          return <SettingModal close={onClose}/>;
           
        case "todo-add-form":
            return <AddTodoModal close={onClose}/>;
            
        case "todo-update-form":
            return <UpdateTodoModal todo={modal.todo} close={onClose}/>;
        default:
      return null;
    }
}