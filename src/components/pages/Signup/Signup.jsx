import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification
} from "firebase/auth";
import Btn from "../../block/Btn/Btn";
import TextInput from "../../block/Input/Input";
import Navbar from "../../core/Navbar/Navbar";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPwd, setConfPwd] = useState();
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) {
    return (
      <>
        <Navigate replace to="/" />
      </>
    );
  }

  const handleSignUp = () => {
    if (password === confPwd) {
      setPersistence(auth, browserLocalPersistence).then(() => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
          sendEmailVerification(auth.currentUser);
          setSignedIn(true);
        });
      });
    }
  };

  return (
    <>
      <Navbar />
      <section className="signup">
        <h2 className="signup__title">Sign Up</h2>
        <TextInput placeholder="Email" contentState={setEmail} value={email} />
        <TextInput
          placeholder="Password"
          contentState={setPassword}
          value={password}
          password={true}
        />
        <TextInput
          placeholder="Confirm Password"
          contentState={setConfPwd}
          value={confPwd}
          password={true}
        />
        <Btn text="Sign Up" onClick={() => handleSignUp()} />
        <p className="signup__login">
          Already have an account?{" "}
          <Link to="/login" className="signup__link">
            Log In
          </Link>
          .
        </p>
      </section>
    </>
  );
}

export default Signup;
