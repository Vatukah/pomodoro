import { Icon } from "../icon"

export default function NoTodos(){
    return (
        <div className="noTodos">
            <div className='noTodos_body' >
            <Icon name="ClipboardList" size={36} />
            <h4>No tasks yet</h4>
            <p>Add your first task to get things moving.</p>
            </div>
        </div>
    )
}