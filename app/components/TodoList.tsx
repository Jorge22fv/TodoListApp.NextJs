import { Itask } from "@/types/tasks"
import { Task } from "./Tasks"

interface TodoListProps {
    tasks: Itask[]
}

export const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return <div className="overflow-x-auto">
        <table className="table">
            <thead>
                <tr>
                    <th>TASKS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody >
                {tasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </tbody>
        </table>
    </div>
}