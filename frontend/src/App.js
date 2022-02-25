import React, { useEffect } from "react";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  // tu user iqneba wamoigebs users tu arada navigate to login

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
