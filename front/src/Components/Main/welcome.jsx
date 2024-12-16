import React from "react";
import { useTask } from "../../Context/TaskContext.jsx";
import imagen from "./welcome.jpg";
import styles from "./Main.module.scss";
const welcome = () => {
  const { close } = useTask();
  //
  if (!close) return null;
  //
  return (
    <div>
      <h3>Bienvenido al Sistema</h3>
      <img src={imagen} alt="imagen" className={styles.img} />
    </div>
  );
};

export default welcome;
