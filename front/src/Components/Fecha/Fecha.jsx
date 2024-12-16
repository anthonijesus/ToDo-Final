import React, { useEffect, useState } from "react";
import { useTask } from "../../Context/TaskContext.jsx";
import styles from "./Fecha.module.scss";
const Fecha = () => {
  const { displayDate } = useTask();
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const obtenerFecha = async () => {
      const resultado = await displayDate();
      setFecha(resultado);
    };

    obtenerFecha();
  }, [displayDate]);

  return (
    <div className={styles.fecha}>{fecha ? fecha : "Cargando fecha..."}</div>
  );
};

export default Fecha;
