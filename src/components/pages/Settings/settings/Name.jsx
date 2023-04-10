import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../core/Navbar/Navbar";
import TextInput from "../../../block/Input/Input";
import Btn from "../../../block/Btn/Btn";

export default function Name({ displayName, onDisplayNameChange }) {
	const [textValue, setTextValue] = useState(displayName);
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
					placeholder="Name"
					value={textValue}
					contentState={setTextValue}
				/>
				<Btn text="Save" onClick={() => onDisplayNameChange(textValue)} />
			</section>
		</>
	);
}
