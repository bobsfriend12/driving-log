import React, { useState, useEffect } from "react";

import "./Hours.css";

function Hours({ sessions }) {
  const [activeSessionIndex, setActiveSessionIndex] = useState(999999999);
  // const [loading, setLoading] = useState(true);

  console.log(sessions);
  // console.log(loading);

  const timeToString = time => {
    const hours = Math.floor(time);
    const dec = time - hours;

    let hrStr = `${hours}`,
      minStr;
    if (dec === 0) {
      minStr = "00";
    } else if (dec === 0.25) {
      minStr = "15";
    } else if (dec === 0.5) {
      minStr = "30";
    } else if (dec === 0.75) {
      minStr = "45";
    }

    return {
      hours: hrStr,
      minutes: minStr,
    };
  };

  let view;

  if (sessions.length === 0) {
    view = "no-sessions";
  } else if (sessions.length >= 1) {
    view = "sessions";
  }

  return (
    <section className="hours">
      <h2 className="hours__title">Driving Hours</h2>
      <div className="hours__container">
        {view === "no-sessions" ? (
          <p className="hours__none">
            No hours logged. <br /> Log some hours to get started!
          </p>
        ) : null}
        {view === "sessions"
          ? sessions.map((item, i) => {
              const hours = timeToString(item.hours);

              return (
                <div
                  className={
                    activeSessionIndex === i ? "session active" : "session"
                  }
                  key={i}
                >
                  <div className="session__top">
                    <div className="session__top__date">
                      {item.date.month}/{item.date.day}
                    </div>
                    <div className="session__top__hours">
                      <div className="session__top__hours__text session__top__hours__text--large">
                        {hours.hours}
                      </div>
                      <div className="session__top__hours__text session__top__hours__text--small">
                        h
                      </div>
                      <div className="session__top__hours__text session__top__hours__text--large">
                        {hours.minutes}
                      </div>
                      <div className="session__top__hours__text session__top__hours__text--small">
                        m
                      </div>
                    </div>
                    <div className="session__top__details">
                      <span
                        className="session__top__details__text"
                        onClick={() => {
                          activeSessionIndex === i
                            ? setActiveSessionIndex(999999999)
                            : setActiveSessionIndex(i);
                        }}
                      >
                        Details{" "}
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="session__bottom">
                    <div className="session__bottom__location">
                      <div className="location__top">{item.location}</div>
                      <div className="location__bottom">Location</div>
                    </div>
                    <div className="session__bottom__time">
                      <div className="time__top">{item.time}</div>
                      <div className="time__bottom">Time</div>
                    </div>
                    <div className="session__bottom__weather">
                      <div className="weather__top">{item.weather}</div>
                      <div className="weather__bottom">Weather</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
}

export default Hours;
