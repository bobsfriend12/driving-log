import React from "react";
import { Navigate } from "react-router-dom";

import { auth } from "../../../firebase";

function Main() {
  if (auth.currentUser) {
    if(!auth.currentUser.emailVerified){
      return <Navigate replace to="/confirm" />
    }

    return <Navigate replace to="/home" />;
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default Main;
