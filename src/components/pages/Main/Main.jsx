import React from "react";
import { Navigate } from "react-router-dom";

import { auth } from "../../../firebase";

function Main() {
  if (auth.currentUser) {
    return <Navigate replace to="/home" />;
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default Main;
