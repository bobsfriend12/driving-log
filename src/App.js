import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";

import "./index.css";
import Log from "./components/pages/Log/Log";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
