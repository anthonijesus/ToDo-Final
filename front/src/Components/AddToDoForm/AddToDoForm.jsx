import React, { useEffect } from "react";
import { useState } from "react";
import { useTask } from "../../Context/TaskContext";
import styles from "./AddToDoForm.module.scss";

const AddToDoForm = () => {
  const { addNewTask, taskToEdit, taskUpdated, closeModal, isEditing } =
    useTask();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [taskTitle, setTaskTitle] = useState(taskToEdit?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    taskToEdit?.description || ""
  );

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setTaskTitle(taskToEdit.title || "");
      setTaskDescription(taskToEdit.description || "");
    } else if (!isEditing) {
      setTaskTitle("");
      setTaskDescription("");
    }
  }, [isEditing, taskToEdit]);

  function updateTask() {
    const updatedTask = {
      id: taskToEdit.id,
      title: taskTitle,
      description: taskDescription,
      creator: taskToEdit.creator,
    };

    if (updatedTask.title === "" || updatedTask.description === "") {
      alert("Hay campos vacios en el formulario");
      return;
    }

    taskUpdated(updatedTask);
    closeModal();
  }

  //
  const submitTask = (event) => {
    event.preventDefault();
    let task = {
      title: taskTitle,
      description: taskDescription,
      isCompleted: false,
      creator: user.user_id, // Este valor debe ser el id del usuario logueado,
    };
    if (task.title === "" || task.description === "") {
      alert("Hay campos vacios en el formulario");
      return;
    }
    addNewTask(task);
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className={styles.formulario}>
      <form onSubmit={submitTask}>
        {!isEditing ? <h2>Agrega tus Tareas </h2> : <h2>Editar Tarea </h2>}
        <label htmlFor="title">Nombre de la tarea</label>
        <input
          type="text"
          value={taskTitle || ""}
          maxLength={40}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          style={{ width: "50%" }}
        />
        <label htmlFor="description">Descripción de la tarea</label>
        <input
          type="text"
          value={taskDescription || ""}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />
        <div>
          {!isEditing && <button type="submit">Crear Tarea</button>}
          {isEditing && (
            <>
              <button type="button" onClick={() => updateTask()}>
                Editar Tarea
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddToDoForm;
