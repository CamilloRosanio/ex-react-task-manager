// UTILITY
import { useContext } from "react";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


// COMPONENTS
import TaskRow from "../components/TaskRow";


export default function TaskList() {

    const { tasks } = useContext(GlobalContext);

    return <>
        <div>
            <h1 className="debug">Lista delle Tasks</h1>
            <table>
                <thead>
                    <tr>
                        <th className="debug">Nome</th>
                        <th className="debug">Status</th>
                        <th className="debug">Data di Creazione</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} className='debug' />
                    ))}
                </tbody>
            </table>
        </div>
    </>
}