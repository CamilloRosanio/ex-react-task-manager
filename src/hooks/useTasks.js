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

    const removeMultipleTask = async (taskIds) => {
        const deleteRequests = taskIds.map(taskId =>
            fetch(`${VITE_API_URL}/tasks/${taskId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
        )

        // Results è l'insieme di tutte le promises, sia fulfilled che non.
        const results = await Promise.allSettled(deleteRequests);

        const fulfilledDeletions = [];
        const rejectedDeletions = [];

        // Smisto le Promises con esito positivo o negativo nei due Array che ho appena dichiarato.
        results.forEach((result, index) => {
            const taskId = taskIds[index];
            if (result.status === 'fulfilled' && result.value.success) {
                fulfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            }
        })

        if (fulfilledDeletions.length > 0) {
            setTasks(prev =>
                prev.filter(t => !fulfilledDeletions.includes(t.id))
            )
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nell'eliminazione delle Task con ID: 
                ${rejectedDeletions.join(', ')}`
            )
        }
    }

    const updateTask = async (updatedTask) => {
        const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    };

    return { tasks, addTask, removeTask, updateTask, removeMultipleTask };
}