import React from "react";
import Fecha from "../Fecha/Fecha.jsx";
import styles from "./Header.module.scss";
import { useTask } from "../../Context/TaskContext.jsx";

const Header = ({ param }) => {
  const { user } = useTask();
  return (
    <header className={styles.header}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          fontFamily: "Poppins",
          fontSize: "1 rem",
          fontWeight: "bold",
          color: "aliceblue",
        }}
      >
        <Fecha />
        <p>Bienvenido {user?.name}</p>
      </div>
      <div></div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          width: "40%",
          justifyContent: "flex-end",
        }}
      >
        <button onClick={param}>Cerrar Sesión</button>
      </div>
    </header>
  );
};

export default Header;
