import React from "react";
import { useTask } from "../../Context/TaskContext.jsx";
import imagen from "./welcome.jpg";
import styles from "./Main.module.scss";
const welcome = () => {
  const { user, close } = useTask();
  //
  if (!close) return null;
  //
  return (
    <div className={styles.container}>
      <h3>Bienvenido al Sistema {user?.name}</h3>
      <img src={imagen} alt="imagen" className={styles.img} />
    </div>
  );
};

export default welcome;
