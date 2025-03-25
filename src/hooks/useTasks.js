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

    const addTask = (newTask) => {
        // logica
    };

    const removeTask = (taskId) => {
        // logica
    };

    const updateTask = (updatedTask) => {
        // logica
    };

    return { tasks, addTask, removeTask, updateTask };
}