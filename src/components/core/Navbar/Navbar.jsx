import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
function Navbar({ icon, loggedIn }) {
  const [popOpen, setPopOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__icon navbar__icon--hidden">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="navbar__title">
        <Link to="/">Driving Log</Link>
      </div>
      <div
        className={`navbar__icon ${!loggedIn ? "navbar__icon--hidden" : null}`}
      >
        <Link to="/settings">
          <span className="material-symbols-outlined">{icon}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
