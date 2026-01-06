

interface ButtonInterface {
    text: string,
    action(): void,
    children?: React.ReactNode | null,
    isActive: boolean,
    disable?: boolean
}


const BorderBtn: React.FC<ButtonInterface> = ({ text, action, children = null, isActive = false, disable = false }) => {

    return <button onClick={action} className={`btn btn-border ${isActive ? 'is-active ' : ''}`} title={text} disabled={disable}>
        {children ? children : ""}
        <span>{text}</span>

    </button>
}


export default BorderBtn;