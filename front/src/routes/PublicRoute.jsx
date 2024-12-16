import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Components/Login/Login.jsx";
import Register from "../Components/Register/Register.jsx";
const PublicRoute = ({ handleLogin }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="*" element={<Login onLogin={handleLogin} />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default PublicRoute;
