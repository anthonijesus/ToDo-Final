import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
//import axios from "axios";

import axiosInstance from "../api/axiosConfig";

const TaskContext = createContext(); // Se crea el contexto con el cual podemos compartir datos entres los distintos componente

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK_PENDING":
      return action.payload;
    case "SET_TASK_COMPLETED":
      return action.payload;
    case "ADD_TASK":
      return [...state];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "CHECK_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  //Almacena las tareas en el estado
  const [tasks, dispatch] = useReducer(taskReducer, []);
  //almacena los datos del usuario en el session storage
  const user = JSON.parse(sessionStorage.getItem("user"));

  //
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [taskToDelete, setTaskToDelete] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  //Cierra el modal y cierra el formulario de edición si esta abierto antes de que se ejecute una accion de agregar nueva tarea
  const closeModal = () => {
    setIsEditing(false);
    setIsModalOpen(false);
    setIsDeleting(false);
  };

  //estado para mostrar o no el componente ToDoList
  const [showComponentToDo, setShowComponentToDo] = useState(false);
  //Cierra el componente Welcome
  const [close, setClose] = useState(true);
  //estado para mostrar o no el componente de perfil
  const [showProfile, setShowProfile] = useState(false);

  async function addNewTask(task) {
    //Hace la petición POST para guardar la nueva tarea
    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/api/task",
        task
      );
      //console.log(response.data);
      dispatch({ type: "ADD_TASK", payload: response.data });
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsModalOpen(false);
    showTaskPending();
  }

  async function showDeleteTask(task) {
    setIsModalOpen(true);
    setIsDeleting(true);
    setTaskToDelete(task);
    //setIsEditing(false);
  }

  async function removeTask(taskId) {
    try {
      await axiosInstance.delete(`http://localhost:3001/api/task/${taskId}`);
      dispatch({ type: "REMOVE_TASK", payload: taskId });
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsDeleting(false);
    setIsModalOpen(false);
  }

  async function taskUpdated(task) {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3001/api/task/${task.id}`,
        task
      );

      dispatch({ type: "UPDATE_TASK", payload: response.data });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function editTask(taskToEdited) {
    const taskUpdated = {
      id: taskToEdited.id,
      title: taskToEdited.title,
      description: taskToEdited.description,
      creator: taskToEdited.user_id,
    };

    setTaskToEdit(taskUpdated);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  async function completeTask(task) {
    //
    const { data } = await axiosInstance.get(
      `http://localhost:3001/api/task/${task.id}`
    ); // Trae la tarea con el id por parametro del server

    data.isCompleted = !data.isCompleted; // Cambia el estado de la tarea

    await axiosInstance.put(`http://localhost:3001/api/task/${task.id}`, {
      isCompleted: data.isCompleted,
    });

    // Despacha la acción con el id y el nuevo estado
    dispatch({
      type: "CHECK_TASK",
      payload: task.id,
    });
  }
  //
  //RENDERIZA LAS TAREAS PENDIENTES
  async function showTaskPending() {
    setShowComponentToDo(true);
    setClose(false);
    setShowProfile(false);
    const response = await axiosInstance.get(
      `http://localhost:3001/api/task?isCompleted=false&creator=${user?.user_id}` // Agrega el id del usuario al filtro
    );
    dispatch({ type: "SET_TASK_PENDING", payload: response.data });
  }

  // RENDERIZA LAS TAREAS COMPLETADAS
  async function showTaskCompleted() {
    setShowComponentToDo(true);
    setClose(false);
    setShowProfile(false);
    const response = await axiosInstance.get(
      `http://localhost:3001/api/task?isCompleted=true&creator=${user?.user_id}`
    );

    dispatch({ type: "SET_TASK_COMPLETED", payload: response.data });
  }

  //MUESTRA LA FECHA ACTUAL EN EL HEADER
  async function displayDate() {
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth() + 1]; // getMonth() devuelve el índice base 0
    const año = fecha.getFullYear();

    return `Uruguay, ${dia} de ${mes} de ${año}`;
  }

  async function editProfile() {
    setClose(false);
    setShowComponentToDo(false);
    setShowProfile(true);
  }

  return (
    <TaskContext.Provider //El .Provider es una propiedad de React que nos permite compartir datos con el contexto que se creo al inicio ---> </TaskContext.Provider>const TaskContext = createContext();
      value={{
        tasks,
        addNewTask,
        removeTask,
        taskUpdated,
        completeTask,
        isEditing,
        setIsEditing,
        editTask,
        taskToEdit,
        isDeleting,
        setIsDeleting,
        showDeleteTask,
        taskToDelete,
        isModalOpen,
        openModal,
        closeModal,
        showComponentToDo,
        close,
        displayDate,
        showTaskCompleted,
        showTaskPending,
        user,
        editProfile,
        showProfile,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
