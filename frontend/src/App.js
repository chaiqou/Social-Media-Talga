import React from "react";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
