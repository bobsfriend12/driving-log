import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../core/Navbar/Navbar";
import Btn from "../../block/Btn/Btn";

import "./Login.css";
import TextInput from "../../block/Input/Input";
import { Link, Navigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../../firebase";

import useNotification from "../../../hooks/useNotification";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const sendNotification = useNotification();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setSignedIn(true);
    }
  }, [user, loading]);

  if (signedIn) {
    return <Navigate replace to="/" />;
  }

  const handleSignIn = () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setSignedIn(true);
        })
        .catch((err) => {
          alert(err);
          sendNotification("error", err.message);
        });
    });
  };

  return (
    <>
      <Navbar />
      <section className="login">
        <h2 className="login__title">Login</h2>
        <TextInput placeholder="Email" contentState={setEmail} value={email} />
        <TextInput
          placeholder="Password"
          contentState={setPassword}
          value={password}
          password={true}
        />
        <Btn text={"Login"} onClick={() => handleSignIn()} />
        <p className="login__signup">
          Don't have an account?{" "}
          <Link to="/signup" className="login__link">
            Sign Up
          </Link>
          .
        </p>
        <p className="login__forgot">
          Did you forget your password?{" "}
          <Link to="/password-reset" className="login__link">
            Reset it.
          </Link>
        </p>
      </section>
    </>
  );
}

export default Login;
