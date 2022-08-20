import React from "react";

import "./Input.css";

function TextInput({ placeholder, contentState, value, password }) {
  return (
    <input
      placeholder={placeholder}
      onChange={e => contentState(e.target.value)}
      value={value}
      type={password ? "password" : "text"}
      className="input"
    />
  );
}

export default TextInput;
