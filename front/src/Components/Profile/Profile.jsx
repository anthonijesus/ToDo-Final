import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useTask } from "../../Context/TaskContext.jsx";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, showProfile } = useTask();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({});

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Maneja los cambios en los inputs cuando se cargan los datos en userData desde la API
  useEffect(() => {
    setUsername(userData?.username || "");
    setName(userData?.name || "");
    setEmail(userData?.email || "");
  }, [userData]);

  //Trae los datos del usuario al cargar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await axiosInstance.get(
          `http://localhost:3001/api/user/${user.user_id}`
        );
        const result = dataUser.data;
        setUserData(result); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user.user_id]);

  //Función para actualizar los datos del usuario
  const handleProfile = async (e) => {
    e.preventDefault();
    setError(""); // Resetea errores antes de enviar
    try {
      await axiosInstance.put(
        `http://localhost:3001/api/user/${user.user_id}`,
        {
          username,
          name,
          email,
          password,
        }
      );

      setSuccess("Actualización exitosa.");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Error al actualizar.");
    }
  };

  return (
    <div>
      {showProfile && (
        <div className={styles.loginContainer}>
          <form onSubmit={handleProfile} className={styles.loginForm}>
            <h2>Actualización de Perfil</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.loginButton}>
              Actualizar
            </button>
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
