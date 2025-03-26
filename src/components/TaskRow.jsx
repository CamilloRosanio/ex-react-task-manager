// UTILITY
import { memo } from "react";
import { Link } from "react-router-dom";


/*
NOTA:
L'esercizio richiedeva di ottimizzare l'applicativo, per cui è qui che sfrutto MEMO di REACT.
Ad ogni montaggio di questo componente, verrà infatti creata la sua versione "memoizzata" salvata in memoria.
Questo ci permette in questo caso di non dover rimontare appunto i compnenti stampati che non hanno subito modifiche
tra un MAP e l'altro.

IN SINTESI:
Sto dicendo al componente "ogni volta che vieni montato e usato crea una versione in memoria".
*/


const TaskRow = memo(({ task, checked, onToggle }) => {

    const statusClassName = task.status.replace(' ', '').toLowerCase();

    return <>
        <tr className="debug">
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(task.id)}
                />
            </td>
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
            <td className={statusClassName}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    </>
});

export default TaskRow;