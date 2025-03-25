// UTILITY
import { useContext } from "react";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


export default function TaskList() {

    const { tasks } = useContext(GlobalContext);

    return <>
        <div>
            <h1>Lista delle Tasks</h1>
            contenuto pagina
        </div>
    </>
}