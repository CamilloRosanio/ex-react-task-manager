// UTILITY
import { useContext, useMemo, useState } from "react";


// CONTEXT
import { GlobalContext } from "../context/GlobalContext";


// COMPONENTS
import TaskRow from "../components/TaskRow";


export default function TaskList() {

    const { tasks } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? '↓' : '↑';

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const sortedTask = useMemo(() => {

        // Utilizzo lo SPREAD di "tasks" per crearne una copia, così da non manipolare lo State originale.
        return [...tasks].sort((a, b) => {

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

    }, [tasks, sortBy, sortOrder])

    return <>
        <div>
            <h1 className="debug">Lista delle Tasks</h1>
            <table>
                <thead>
                    <tr>
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
                    {sortedTask.map(task => (
                        <TaskRow key={task.id} task={task} className='debug' />
                    ))}
                </tbody>
            </table>
        </div>
    </>
}