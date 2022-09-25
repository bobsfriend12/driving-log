import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import Btn from "../../block/Btn/Btn";
import TextInput from "../../block/Input/Input";
import Navbar from "../../core/Navbar/Navbar";
import "./Signup.css";

import useNotification from "../../../hooks/useNotification";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPwd, setConfPwd] = useState();
  const [signedIn, setSignedIn] = useState(false);

  const sendNotification =  useNotification();

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
        createUserWithEmailAndPassword(auth, email, password).then(({user}) => {
          alert(JSON.stringify(user));
          updateProfile(user, {displayName: name}).then(() => {
            sendEmailVerification(user).then(() => {
              setSignedIn(true);
            });
          })
        }).catch((err) => {
          sendNotification("error", err.message);
        })
      });
    } else {
      sendNotification("error", "Passwords do not match");
    }
  };

  return (
    <>
      <Navbar />
      <section className="signup">
        <h2 className="signup__title">Sign Up</h2>
        <TextInput placeholder="Name" contentState={setName} />
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
