//import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";
import Modal from "../Modal/Modal.jsx";
import ToDoList from "../ToDoList/ToDoList.jsx";
import Profile from "../Profile/Profile.jsx";
import Welcome from "./welcome.jsx";
const Main = () => {
  const { isModalOpen, closeModal } = useTask();

  //if (!showToDoList) return null;
  return (
    <main className={styles.main}>
      <Welcome />
      <ToDoList />
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
      <Profile />
    </main>
  );
};

export default Main;
