import React, { useState } from "react";
import { useTask } from "../../Context/TaskContext.jsx";
import styles from "./Aside.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.jpg";

const Aside = () => {
  const { openModal, showTaskPending, showTaskCompleted, editProfile } =
    useTask();
  const [openSubmenus, setOpenSubmenus] = useState({}); // Estado dinámico para submenús

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Alterna el estado del submenú seleccionado
    }));
  };
  //

  return (
    <div className={styles.aside}>
      <div className={styles.imagen}>
        <img src={logo} alt="logo" className={styles.img} />
        <h3>TODO REACT</h3>
      </div>
      <ul>
        <li>
          <a href="/welcome">
            <FontAwesomeIcon icon={faHouse} />
            Panel Principal
          </a>
        </li>
        <li className={styles.dropdown}>
          <a onClick={() => toggleSubmenu("ToDos")}>
            <FontAwesomeIcon icon={faBook} />
            ToDos
            <span
              className={`${styles.arrow} ${
                openSubmenus["ToDos"] ? styles.open : ""
              }`}
            >
              ▶
            </span>
          </a>
          <ul
            className={`${styles.submenu} ${
              openSubmenus["ToDos"] ? styles.show : ""
            }`}
          >
            <li>
              <a onClick={openModal}>
                <FontAwesomeIcon icon={faUser} />
                Crear Tarea
              </a>
              <a onClick={showTaskPending}>
                <FontAwesomeIcon icon={faUser} />
                Ver Pendientes
              </a>
              <a onClick={showTaskCompleted}>
                <FontAwesomeIcon icon={faUser} />
                Ver Completadas
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.dropdown}>
          <a onClick={editProfile}>
            <FontAwesomeIcon icon={faBook} />
            Perfil
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Aside;
