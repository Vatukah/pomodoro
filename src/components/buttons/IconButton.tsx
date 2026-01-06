import type { IconName } from "../../type";
import { Icon } from "../icon";

interface ButtonInterface{
    text:string,
    action():void,
    isActive?:boolean,
    disable?:boolean,
    icon:IconName,
    type?:|'normal'|'hero'
}


const IconBtn : React.FC<ButtonInterface> = ({text,action,icon,isActive=false,disable=false,type='normal'})=>{
   
    return <button onClick={action} className={`btn btn-icon ${type==='hero'?'btn-hero':''}  ${isActive?"is-active":""} `} title={text} disabled={disable}>
    <Icon name={icon} size={20} />
       <span className="btn_text">{text}</span>
       
        </button>
}


export default IconBtn;