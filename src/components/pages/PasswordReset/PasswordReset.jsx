import React, { useState } from "react";
import Btn from "../../block/Btn/Btn";
import Navbar from "../../core/Navbar/Navbar";

import {sendPasswordResetEmail} from "firebase/auth"

import {auth} from "../../../firebase";

import "./PasswordReset.css";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, email);

    setEmailSent(true);
  }
  return (
    <>
      <Navbar />
      <section className="reset">
        {!emailSent ? (
          <div className="reset__wrapper">
            <h1 className="reset__title">Password Reset</h1>
            <form
              action="/"
              className="reset__form"
              onSubmit={(e) => onSubmit(e)}
            >
              <input
                type="text"
                placeholder="Email"
                className="reset__form__field"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Btn
                text={
                  <input
                    type="submit"
                    value="Reset Password"
                    className="reset__form__submit"
                  />
                }
              />
            </form>
          </div>
        ) : (
          <div className="reset__wrapper">
            <p className="reset__sent">
              An password reset email has been sent to {email}. Click the link
              in that email to reset your password.
            </p>
            <p className="reset__login">
              After you reset your password you can <Link className="reset__link" to="/login">Login</Link>
            </p>
          </div>
        )}
      </section>
    </>
  );
}
