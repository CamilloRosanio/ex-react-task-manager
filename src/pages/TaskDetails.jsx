// UTILITY
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import dayjs from "dayjs";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


// COMPONENTS
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    const task = tasks.find(task => task.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            setShowEditModal(false);
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
                {/* DATA IN FORMATO INGLESE */}
                {/* <p className="debug">Data di creazione: {new Date(task.createdAt).toLocaleDateString()}</p> */}
                {/* DATA CON FORMATO ITALIANO tramite DAYJS */}
                <p className="debug">Data di creazione: {dayjs(task.createdAt).format('DD/MM/YYYY')}</p>

                <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>

                <button onClick={() => { setShowEditModal(true); console.log('Modale EDIT mostrata.') }}>Modifica Task</button>

                {/* MODAL - DELETE */}
                <Modal
                    title='Conferma eliminazione'
                    content={
                        <p>Sei sicuro di voler eliminare questa Task?</p>
                    }
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onCofnirm={handleDelete}
                    confirmText="Elimina"
                />

                {/* MODAL - EDIT */}
                <EditTaskModal
                    task={task}
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdate}
                />
            </div >
        </>
    )
}
