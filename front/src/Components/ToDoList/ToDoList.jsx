import { useTask } from "../../Context/TaskContext.jsx";
import ToDoItem from "../ToDoItem/ToDoItem.jsx";
import styles from "./ToDoList.module.scss";
//

const ToDoList = () => {
  const { tasks, showComponentToDo } = useTask();
  //

  if (!showComponentToDo) return null;
  return (
    <section className={styles.section}>
      <div className={styles.todoList}>
        <div className={styles.listado}>
          <h2>Lista de Tareas</h2>
          <table>
            <thead>
              <tr>
                <th>Acciones</th>
                <th>Tarea</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creador</th>
              </tr>
            </thead>
            {tasks.map((task) => (
              <ToDoItem key={task.id} task={task} />
            ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default ToDoList;
