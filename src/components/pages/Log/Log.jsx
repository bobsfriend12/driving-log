import React, { useState } from "react";

import "./Log.css";

import { auth, firestore } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import Navbar from "../../core/Navbar/Navbar";
import Btn from "../../block/Btn/Btn";
import { Navigate, Link } from "react-router-dom";

function Log() {
  Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  const today = new Date().toDateInputValue();

  const [date, setDate] = useState(today);
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("00");
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [weather, setWeather] = useState();
  const [done, setDone] = useState(false);

  console.log(weather);

  const handleSubmit = () => {
    const sessionDate = new Date(date);

    let sessionHours;

    console.log(minutes);

    if (minutes === "15") {
      sessionHours = Number(`${hours}.25`);
    } else if (minutes === "30") {
      sessionHours = Number(`${hours}.5`);
    } else if (minutes === "45") {
      sessionHours = Number(`${hours}.75`);
    } else if (minutes === "00") {
      sessionHours = Number(`${hours}`);
    }

    console.log(sessionHours);

    const session = {
      date: {
        day: sessionDate.getDate() + 1,
        month: sessionDate.getMonth() + 1,
        year: sessionDate.getFullYear(),
      },
      hours: sessionHours,
      location: location,
      time: time,
      weather: weather,
    };

    const existingSessions = JSON.parse(localStorage.getItem("sessions"));

    existingSessions.push(session);

    console.log(existingSessions);

    localStorage.setItem("sessions", JSON.stringify(existingSessions));
    // const sessionsRef = collection(firestore, "sessions");
    // const docRef = doc(firestore, "sessions", userId);
    setDoc(doc(firestore, "sessions", auth.currentUser.uid), {
      sessions: existingSessions,
    }).then(() => setDone(true));
  };

  if (done) {
    return <Navigate replace to="/home" />;
  }

  return (
    <>
      <Navbar />
      <button className="log__btn">
        <Link className="log__link" replace to="/home">
          <span className="material-symbols-outlined">arrow_back</span> Back
        </Link>
      </button>
      <section className="log">
        <h2 className="log__title">Log Hours</h2>
        <div className="log__date">
          <span className="log__label">Date:</span>
          <input
            type="date"
            name="date"
            id="date"
            pattern="\d{4}-\d{2}-\d{2}"
            defaultValue={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className="log__hours">
          <span className="log__label">Time driving:</span>
          <select value={hours} onChange={e => setHours(e.target.value)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          h
          <select
            name="minutes"
            id="minutes"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
          >
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
          m
        </div>
        <div className="log__location">
          <span className="log__label">Location:</span>
          <input
            type="text"
            name="location"
            id="location"
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="log__time">
          <span className="log__label">Time:</span>
          <input
            type="radio"
            name="time"
            id="day"
            onChange={e => setTime("day")}
          />
          <label htmlFor="day">Day</label>
          <input
            type="radio"
            name="time"
            id="night"
            onChange={e => setTime("night")}
          />
          <label htmlFor="night">Night</label>
        </div>
        <div className="log__weather">
          <span className="log__label">Weather</span>
          <input
            type="radio"
            name="weather"
            id="clear"
            onChange={e => setWeather("clear")}
          />
          <label htmlFor="clear">Clear</label>
          <input
            type="radio"
            name="weather"
            id="wet"
            onChange={e => setWeather("wet")}
          />
          <label htmlFor="wet">Wet</label>
        </div>
        <Btn text="Log Hours" onClick={() => handleSubmit()} />
      </section>
    </>
  );
}

export default Log;
