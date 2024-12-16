import React, { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import logo from "../Aside/logo.jpg";
import styles from "./Login.module.scss";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetea errores antes de enviar
    try {
      const { data } = await axiosInstance.post(
        "http://localhost:3001/api/login",
        {
          username,
          password,
        }
      );

      sessionStorage.setItem("user", JSON.stringify(data)); // Guarda el usuario en sessionStorage
      localStorage.setItem("token", data.token); // Guarda el token en localStorage

      onLogin(); // Llama la función para actualizar el estado de autenticación

      navigate("/welcome");
    } catch (err) {
      setError("Usuario o contraseña inválidos");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <img src={logo} alt="logo" style={{ marginBottom: "20px" }} />
        <h2>Iniciar Sesión</h2>
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
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Ingresar
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
