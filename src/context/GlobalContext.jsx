// UTILITY
import { createContext } from "react";


// IMPORT COMPONENTS AND HOOKS
import useTasks from "../hooks/useTasks";


export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    // Importo il mio CUSTOM-HOOK all'interno del context, rendendo globali sia i suoi dati (tasks) che le varie funzioni relative ad esse.
    const taskData = useTasks();

    return <>
        {/* Tramite lo SPREAD-OPERATOR del mio hook personalizzato, sono sicuro di passare al VALUE del CONTEXT tutte le singole entità dia cui è composto l'hook */}
        <GlobalContext.Provider value={{ ...taskData }}>

            {children}

        </GlobalContext.Provider>
    </>
}