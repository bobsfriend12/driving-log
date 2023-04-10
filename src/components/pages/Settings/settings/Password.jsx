import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../core/Navbar/Navbar";
import TextInput from "../../../block/Input/Input";
import Btn from "../../../block/Btn/Btn";

export default function Password({ onPasswordChange }) {
	const [currentValue, setCurrentValue] = useState();
	const [textValue, setTextValue] = useState();
	const [verifyValue, setVerifyValue] = useState();
	return (
		<>
			<Navbar loggedIn={true} icon="manage_accounts" />
			<button className="log__btn">
				<Link className="log__link" replace to="/settings">
					<span className="material-symbols-outlined">arrow_back</span> Back
				</Link>
			</button>
			<section className="settings">
				<h1 className="settings__title">Change Name</h1>
				<TextInput
					placeholder="Current Password"
					value={currentValue}
					contentState={setCurrentValue}
					password
				/>
				<TextInput
					placeholder="New Password"
					value={textValue}
					contentState={setTextValue}
					password
				/>
				<TextInput
					placeholder="Verify Password"
					value={verifyValue}
					contentState={setVerifyValue}
					password
				/>
				<Btn
					text="Change Password"
					onClick={() => onPasswordChange(currentValue, textValue, verifyValue)}
				/>
			</section>
		</>
	);
}
