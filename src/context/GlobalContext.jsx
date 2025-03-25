// UTILITY
import { createContext, useState, useEffect } from "react";


// ENV IMPORT
const { VITE_API_URL } = import.meta.env;


export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    // SETUP USE-EFFECT
    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
            .catch(err => console.error(err))
    }, []);

    return <>
        <GlobalContext.Provider value={{ tasks, setTasks }}>

            {children}

        </GlobalContext.Provider>
    </>
}