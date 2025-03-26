// UTILITY
import { useCallback, useContext, useMemo, useState } from "react";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


// COMPONENTS
import TaskRow from "../components/TaskRow";


// GENERIC DEBOUNCE FUNCTION
// Applico questa funzione alla barra di ricerca per ottimizzare le prestazioni dell'applicativo, ed eseguire appunto il filtraggio delle Tasks solo quando l'utente ha finito di scrivere, passato un dato tempo (delay).
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
}


export default function TaskList() {

    const { tasks, removeMultipleTask } = useContext(GlobalContext);
    const [searchQuery, setSearchQuery] = useState('');

    // DEBOUNCE RICERCA
    // E' necessario usare "useCallback di REACT perchè voglio memorizzare questa funzione senza ricrearla ad ogni mounting del componente. Senza lo useCallback, verrebbero create molteplici versioni di DEBOUNCE ad ogni re-rendering del componente, che continuerebbero a funzionare in background rendendo l'applicativo poco efficiente."
    const debouncedSetSearchQuery = useCallback(
        debounce(setSearchQuery, 500)
        , []);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? '↓' : '↑';

    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const toggleSelection = (taskId) => {

        // V1 - esteso
        // if (selectedTaskIds.includes(taskId)) {
        //     setSelectedTaskIds(prev => prev.filter(id => id !== taskId))
        // } else {
        //     setSelectedTaskIds(prev => [...prev, taskId])
        // }


        // V2 - compatta
        setSelectedTaskIds(prev => {
            if (selectedTaskIds.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        })
    }

    const handleDeleteSelected = async () => {
        try {
            await removeMultipleTask(selectedTaskIds);
            alert('Task selezionate eliminate correttamente!');
            setSelectedTaskIds([]);
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const filteredAndSortedTasks = useMemo(() => {

        // Utilizzo lo SPREAD di "tasks" per crearne una copia, così da non manipolare lo State originale.
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {

                let comparison;

                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title);
                } else if (sortBy === 'status') {
                    const statusOptions = ['To do', 'Doing', 'Done'];
                    const indexA = statusOptions.indexOf(a.status);
                    const indexB = statusOptions.indexOf(b.status);
                    comparison = indexA - indexB;
                } else if (sortBy === 'createdAt') {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }

                return comparison * sortOrder;
            })

    }, [tasks, sortBy, sortOrder, searchQuery])

    return <>
        <div>
            <h1 className="debug">Lista delle Tasks</h1>

            {/* SEARCHBAR */}
            <input
                className="debug"
                type="text"
                placeholder="Cerca una Task..."
                // NOTA: Nel momento in cui applico il DEBOUNCE, devo smettere di utilizzare il VALUE (sotto commentato per non eliminarlo del tutto)
                // value={searchQuery}
                onChange={e => debouncedSetSearchQuery(e.target.value)}
            />

            {/* TASKS CHECKED */}
            {selectedTaskIds.length > 0 &&
                <div className="debug">
                    <h3>Selected Tasks:</h3>
                    <p>{selectedTaskIds.join(', ')}</p>

                    <button onClick={handleDeleteSelected}>Elimina Tasks selezionate</button>
                </div>
            }

            <table>
                <thead>
                    <tr>
                        <th className="debug"></th>
                        <th className="debug" onClick={() => handleSort('title')}>
                            Nome {sortBy === 'title' && sortIcon}
                        </th>
                        <th className="debug" onClick={() => handleSort('status')}>
                            Status {sortBy === 'status' && sortIcon}
                        </th>
                        <th className="debug" onClick={() => handleSort('createdAt')}>
                            Data di Creazione {sortBy === 'createdAt' && sortIcon}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredAndSortedTasks.map(task => (
                        <TaskRow
                            key={task.id}
                            task={task}
                            checked={selectedTaskIds.includes(task.id)}
                            onToggle={toggleSelection}
                            className='debug'
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </>
}