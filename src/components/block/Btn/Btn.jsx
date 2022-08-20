import React from "react";

import "./Btn.css";

function Btn({ text, icon, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <span className="material-symbols-outlined btn__icon">{icon}</span>
      {text}
      <span className="material-symbols-outlined btn__icon--hidden">
        {icon}
      </span>
    </button>
  );
}

export default Btn;
