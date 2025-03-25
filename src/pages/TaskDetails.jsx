// UTILITY
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


export default function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        return <h2 className="debug">Task non trovata</h2>
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert('Task eliminata con successo!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <>
            <div>
                <h1 className="debug">Dettagli task {task.id}</h1>

                <p className="debug">Titolo: {task.title}</p>
                <p className="debug">Descrizione: {task.description}</p>
                <p className="debug">Status: {task.status}</p>
                <p className="debug">Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p>

                <button onClick={handleDelete}>Elimina Task</button>
            </div>
        </>
    )
}
