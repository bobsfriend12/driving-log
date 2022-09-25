import React from "react";

import "./Input.css";

function TextInput({ placeholder, contentState, value, password, className }) {
  return (
    <input
      placeholder={placeholder}
      onChange={e => contentState(e.target.value)}
      value={value}
      type={password ? "password" : "text"}
      // {...className ? `className="input ${className}"`:`className="input"`}
      className={`input ${className}`}
    />
  );
}

export default TextInput;
