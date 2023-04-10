import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Btn from "../../block/Btn/Btn";
import Navbar from "../../core/Navbar/Navbar";

import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";

import "./Confirm.css";

export default function Confirm() {
	const [resent, setResent] = useState(false);
	const navigate = useNavigate();

	if (!auth.currentUser?.email || auth.currentUser.emailVerified) {
		navigate("/");
	}

	function resendHandler() {
		alert(JSON.stringify(auth.currentUser));
		sendEmailVerification(auth.currentUser);
		setResent(true);
	}

	let email = auth.currentUser?.email;

	return (
		<>
			<Navbar />
			{!resent ? (
				<div className="confirm__wrapper">
					<p className="confirm__sent">
						We sent you a confirmation email. Please click the link in it to
						continue.
					</p>
					<Link
						className="reset__link"
						to="/login"
						onClick={() => window.location.reload()}
					>
						I have confirmed my email.
					</Link>
					<Btn text="Resend Email" onClick={resendHandler} />
				</div>
			) : (
				<div className="confirm__wrapper">
					<p className="confirm__sent">
						An a confirmation email has been sent to {email}. Click the link in
						that email to confirm your account.
					</p>
					<p className="confirm__login">
						After you verify your email you can{" "}
						<Link className="reset__link" to="/">
							Login
						</Link>
					</p>
				</div>
			)}
		</>
	);
}
