import { useTask } from "../../Context/TaskContext.jsx";
import styles from "./ToDoItem.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
//
const ToDoItem = ({ task }) => {
  //
  const { completeTask, editTask, showDeleteTask } = useTask();
  //

  return (
    <tbody>
      <tr className={task.isCompleted ? styles.completed : ""}>
        <td className={styles.acciones}>
          <input
            type="checkbox"
            onClick={() => completeTask(task)}
            checked={task.isCompleted || false}
            readOnly
          />
          <button onClick={() => showDeleteTask(task)}>
            <FaTrash />
          </button>
          <button onClick={() => editTask(task)}>
            <FaEdit />
          </button>
        </td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.isCompleted ? "Completada" : "Pendiente"}</td>
        <td>{task.name}</td>
      </tr>
    </tbody>
  );
};

export default ToDoItem;
