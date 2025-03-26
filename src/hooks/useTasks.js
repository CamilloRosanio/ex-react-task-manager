// UTILITY
import { useEffect, useReducer } from "react";


// ENV
const { VITE_API_URL } = import.meta.env;


// REDUCERS
import tasksReducer from "../reducers/tasksReducer";


export default function useTasks() {

    // Ho spostato la seguente logica dal GlobalContext a questo mio CUSTOM-HOOK, per centralizzare maggiormente funzioni e dati.
    const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

    // SETUP USE-EFFECT
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(tasks => dispatchTasks({ type: 'LOAD_TASKS', payload: tasks }))
            .catch(err => console.error(err))
    }, []);

    // Eseguo una chiamata con metodo POST per appunto postare la nuova task.
    const addTask = async (newTask) => {

        // VERIFICA TASK GIA' ESISTENTE
        const taskExists = tasks.some(t => t.title === newTask.title);
        if (taskExists) {
            throw new Error('Esiste già una Task con questo Title!');
        }

        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'ADD_TASK', payload: task })
    };

    const removeTask = async (taskId) => {
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'REMOVE_TASK', payload: taskId });
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
            dispatchTasks({ type: 'REMOVE_MULTIPLE_TASKS', payload: fulfilledDeletions })
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nell'eliminazione delle Task con ID: 
                ${rejectedDeletions.join(', ')}`
            )
        }
    }

    const updateTask = async (updatedTask) => {

        // VERIFICA TASK GIA' ESISTENTE
        const taskWithSameTitle = tasks.find(t => t.title === updatedTask.title);
        if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
            throw new Error('Esiste già una Task con questo Title!');
        }

        const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        dispatchTasks({ type: 'UPDATE_TASK', payload: task })
    };

    return { tasks, addTask, removeTask, updateTask, removeMultipleTask };
}