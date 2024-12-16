import React from "react";
import styles from "./Modal.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";
import AddToDoForm from "../AddToDoForm/AddToDoForm";
import DeleteForm from "../DeleteForm/DeleteForm";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada
  const { isDeleting } = useTask();
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
        {!isDeleting ? <AddToDoForm /> : <DeleteForm />}
        <button className={styles.modalClose} onClick={onClose}>
          cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
