// UTILITY
import { useState, useRef, useMemo } from "react";


// DATA
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";



export default function AddTask() {

    // FORM FIELDS
    // Uso un CONTROLLED-FIELD (quindi con useState) per il titolo, in quanto è necessaria una validazione del VALUE in tempo reale.
    const [taskTitle, setTaskTitle] = useState('');
    // Mentre per la descrizione e lo status mi bastano UNCONTROLLED-FIELDS tramite useRef.
    const descriptionRef = useRef();
    const statusRef = useRef();


    // Per la validazione del Title è opportuno usare useMemo di REACT. Questo perchè vogliamo memorizzare il risultato di una funzione "costosa" (in termini di risorse impiegate e quindi efficienza) per evitare il ricalcolo ad ogni re-rendering dell'elemento.
    const taskTitleError = useMemo(() => {

        // Grazie a useMemo eseguo la validaizone senza utilizzare ulteriori useState e useEffect.
        if (!taskTitle.trim())
            return 'Il TITLE non può essere una stringa vuota!'
        if ([...taskTitle].some(char => symbols.includes(char)))
            return 'Il TITLE non deve contenere caratteri speciali!'
        return '';

    }, [taskTitle])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskTitleError) return;

        const newTask = {
            title: taskTitle,
            descriptio: descriptionRef.current.value,
            status: statusRef.current.value,
        }

        console.log('Task da aggiungere:', newTask);
    };

    return <>
        <div>
            <h1 className="debug">Aggiungi Task</h1>

            <form onSubmit={handleSubmit}>
                <label className="debug">
                    Titolo Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={event => setTaskTitle(event.target.value)}
                    />
                </label>
                {taskTitleError &&
                    <p style={{ color: 'red' }}>{taskTitleError}</p>
                }
                <label className="debug">
                    Descrizione:
                    <textarea ref={descriptionRef} />
                </label>
                <label className="debug">
                    Stato:
                    <select ref={statusRef} defaultValue={'To do'}>
                        {['To do', 'Doing', 'Done'].map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </label>

                <button type='submit' disabled={taskTitleError}>Aggiungi Task</button>
            </form>
        </div>
    </>
}