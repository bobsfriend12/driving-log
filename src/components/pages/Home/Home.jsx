import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";

import Navbar from "../../core/Navbar/Navbar";
import Btn from "../../block/Btn/Btn";
import Stats from "../../core/Stats/Stats";
import Hours from "../../core/Hours/Hours";

import { onAuthStateChanged } from "firebase/auth";

import { auth, firestore } from "../../../firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";

import "./Home.css";
import { Link, Navigate } from "react-router-dom";

function Home() {
  const [signedIn, setSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);

  let userId;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        setSignedIn(false);
      } else {
        userId = user.uid;

        const sessionsRef = collection(firestore, "sessions");
        const docRef = doc(firestore, "sessions", userId);
        if (!localStorage.getItem("sessions")) {
          getDoc(docRef).then(doc => {
            if (doc.exists()) {
              console.log(doc.data().sessions);
              if (typeof doc.data().sessions !== "object") {
                console.log("no sessions");
                localStorage.setItem("sessions", "[]");
                localStorage.setItem("last_refreshed", new Date());
                setSessions([]);
                setLoading(false);
              } else if (doc.data().sessions.length > 0) {
                const existingSessions = doc.data().sessions;
                console.log(doc.data().sessions);
                localStorage.setItem(
                  "sessions",
                  JSON.stringify(existingSessions)
                );
                localStorage.setItem("last_refreshed", new Date());
                setSessions(existingSessions);
                setLoading(false);
              }
            } else {
              localStorage.setItem("last_refreshed", new Date());
              localStorage.setItem("sessions", "[]");
              setSessions([]);
              setLoading(false);
            }
          });
        } else {
          setSessions(JSON.parse(localStorage.getItem("sessions")));
          setLoading(false);
        }
      }
    });
  }, []);

  // console.log(docRef);

  useEffect(() => {
    // if (!localStorage.getItem("sessions")) {
    //   getDoc(docRef).then(doc => {
    //     if (doc.exists()) {
    //       console.log(doc.data().sessions);
    //       if (typeof doc.data().sessions !== "object") {
    //         console.log("no sessions");
    //         localStorage.setItem("sessions", "[]");
    //         localStorage.setItem("last_refreshed", new Date());
    //         setSessions([]);
    //         setLoading(false);
    //       } else if (doc.data().sessions.length > 0) {
    //         const existingSessions = doc.data().sessions;
    //         console.log(doc.data().sessions);
    //         localStorage.setItem("sessions", JSON.stringify(existingSessions));
    //         localStorage.setItem("last_refreshed", new Date());
    //         setSessions(existingSessions);
    //         setLoading(false);
    //       }
    //     } else {
    //       localStorage.setItem("last_refreshed", new Date());
    //       localStorage.setItem("sessions", "[]");
    //       setSessions([]);
    //       setLoading(false);
    //     }
    //   });
    // } else {
    //   setSessions(JSON.parse(localStorage.getItem("sessions")));
    //   setLoading(false);
    // }
  }, []);

  if (loading) {
    return "loading";
  }
  if (!signedIn) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <section className="home">
        <Btn
          icon="add"
          text={
            <Link className="home__link" to="/log">
              Log Hours
            </Link>
          }
        />
        <Btn
          text="Sign Out"
          onClick={e => {
            localStorage.removeItem("sessions");
            localStorage.removeItem("last_refreshed");
            signOut(auth).then(() => setSignedIn(false));
          }}
        />
        <Stats sessions={sessions} />
        <Hours sessions={sessions} />
      </section>
    </div>
  );
}

export default Home;
