import React from "react";
import styles from "./DeleteForm.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";
const DeleteForm = () => {
  const { removeTask, taskToDelete } = useTask();
  return (
    <div>
      <div className={styles.deleteTask}>
        <div className={styles.confirm}>
          <h4>Desea Borrar la tarea {taskToDelete.title}?</h4>
          <span>
            <button onClick={() => removeTask(taskToDelete.id)}>SI</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
