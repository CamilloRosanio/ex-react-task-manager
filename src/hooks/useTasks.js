// UTILITY
import { useState, useEffect } from "react";


// ENV
const { VITE_API_URL } = import.meta.env;


export default function useTasks() {

    // Ho spostato la seguente logica dal GlobalContext a questo mio CUSTOM-HOOK, per centralizzare maggiormente funzioni e dati.
    const [tasks, setTasks] = useState([]);

    // SETUP USE-EFFECT
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
            .catch(err => console.error(err))
    }, []);

    // Eseguo una chiamata con metodo POST per appunto postare la nuova task.
    const addTask = async (newTask) => {
        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => [...prev, task]);
    };

    const removeTask = async (taskId) => {
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        })
        const { success, message } = await response.json();
        if (!success) throw new Error(message);
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const updateTask = (updatedTask) => {
        // logica
    };

    return { tasks, addTask, removeTask, updateTask };
}