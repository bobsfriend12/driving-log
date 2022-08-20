import React from "react";

import "./Stats.css";

function Stats({ sessions }) {
  let totalTime = 0;
  let nightLeft = 10;
  let nightTime = 0;
  let timeLeft = 50;

  sessions.forEach(session => {
    totalTime += session.hours;
    timeLeft -= session.hours;
    if (session.time === "night") {
      nightTime += session.hours;
      nightLeft -= session.hours;
    }
  });

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

  totalTime = timeToString(totalTime);
  nightLeft = timeToString(nightLeft);
  nightTime = timeToString(nightTime);
  timeLeft = timeToString(timeLeft);

  return (
    <section className="stats">
      <h2 className="stats__title">Stats</h2>
      <div className="stats__grid">
        <div className="stats__grid__item">
          <div className="item__top">
            <div className="item__top__text item__top__text--large">
              {totalTime.hours}
            </div>
            <div className="item__top__text item__top__text--small">h</div>
            <div className="item__top__text item__top__text--large">
              {totalTime.minutes}
            </div>
            <div className="item__top__text item__top__text--small">m</div>
          </div>
          <div className="item__bottom">Total Driving Time</div>
        </div>
        <div className="stats__grid__item">
          <div className="item__top">
            <div className="item__top__text item__top__text--large">
              {timeLeft.hours}
            </div>
            <div className="item__top__text item__top__text--small">h</div>
            <div className="item__top__text item__top__text--large">
              {timeLeft.minutes}
            </div>
            <div className="item__top__text item__top__text--small">m</div>
          </div>
          <div className="item__bottom">Required Driving Time Left</div>
        </div>
        <div className="stats__grid__item">
          <div className="item__top">
            <div className="item__top__text item__top__text--large">
              {nightTime.hours}
            </div>
            <div className="item__top__text item__top__text--small">h</div>
            <div className="item__top__text item__top__text--large">
              {nightTime.minutes}
            </div>
            <div className="item__top__text item__top__text--small">m</div>
          </div>
          <div className="item__bottom">Night Driving Time</div>
        </div>
        <div className="stats__grid__item">
          <div className="item__top">
            <div className="item__top__text item__top__text--large">
              {nightLeft.hours}
            </div>
            <div className="item__top__text item__top__text--small">h</div>
            <div className="item__top__text item__top__text--large">
              {nightLeft.minutes}
            </div>
            <div className="item__top__text item__top__text--small">m</div>
          </div>
          <div className="item__bottom">Night Driving Time Left</div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
