import React, {useState} from "react";
import {Link} from "react-router-dom"
import Btn from "../../block/Btn/Btn";
import Navbar from "../../core/Navbar/Navbar";

import {auth} from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";

import "./Confirm.css";

export default function Confirm() {
  const [resent, setResent] = useState(false);

  function resendHandler() {
    alert(JSON.stringify(auth.currentUser));
    sendEmailVerification(auth.currentUser);
    setResent(true);
  }

  let email = auth.currentUser.email;

  return (
    <>
      <Navbar />
    {!resent ?  (
      <div className="confirm__wrapper">
          <p className="confirm__sent">
            We sent you a confirmation email. Please click the link in it to
            continue.
          </p>
          <Btn text="Resend Email" onClick={resendHandler} />
      </div>) : (
                  <div className="confirm__wrapper">
                  <p className="confirm__sent">
                    An password reset email has been sent to {email}. Click the link
                    in that email to reset your password.
                  </p>
                  <p className="confirm__login">
                    After you verify your email you can <Link className="reset__link" to="/login">Login</Link>
                  </p>
                </div>
      )}
    </>
  );
}
