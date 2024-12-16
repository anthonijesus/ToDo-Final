import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import { TaskProvider } from "../Context/TaskContext.jsx";
import Aside from "../Components/Aside/Aside.jsx";
import Main from "../Components/Main/Main.jsx";
import styles from "./App.module.scss";

const PrivateRoute = ({ handleLogout }) => {
  return (
    <Routes>
      <Route path="welcome">
        <Route
          index
          element={
            <TaskProvider>
              <div className={styles.contenido}>
                <section className={styles.aside}>
                  <Aside />
                </section>
                <section className={styles.main}>
                  <Header param={handleLogout} />
                  <Main />
                  <Footer />
                </section>
              </div>
            </TaskProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default PrivateRoute;
