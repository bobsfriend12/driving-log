import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/Signup/Signup";
import PasswordReset from "./components/pages/PasswordReset/PasswordReset";

import "./index.css";
import Log from "./components/pages/Log/Log";
import Confirm from "./components/pages/Confirm/Confirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/log" element={<Log />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
