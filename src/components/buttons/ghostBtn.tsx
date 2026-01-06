

interface ButtonInterface{
    text:string,
    action():void,
    children:React.ReactNode
}


const GhostBtn : React.FC<ButtonInterface> = ({text,action,children})=>{
   
    return <button onClick={action} className="btn " title={text}>
        {children}
        </button>
}


export default GhostBtn;