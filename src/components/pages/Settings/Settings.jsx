import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../core/Navbar/Navbar";
import Input from "../../block/Input/Input";

import { auth } from "../../../firebase";
import {
	useAuthState,
	useUpdateEmail,
	useUpdateProfile,
	useUpdatePassword,
	useVerifyBeforeUpdateEmail,
} from "react-firebase-hooks/auth";
import {
	signOut,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from "firebase/auth";

import "./Settings.css";
import Name from "./settings/Name";
import Email from "./settings/Email";
import Password from "./settings/Password";
import useNotification from "../../../hooks/useNotification";

export default function Settings() {
	//Settings:
	//Name - name
	//Email - email
	//Required Driving Hours - hours
	//Required Nighttime Driving Hours - night
	//Change Password - password

	const [user, loading, error] = useAuthState(auth);
	const [updateEmail, updatingEmail, updateError] =
		useVerifyBeforeUpdateEmail(auth);
	const [updateProfile, updatingProfile, updateProfileError] =
		useUpdateProfile(auth);
	const [updatePassword, updatingPassword, updatePasswordError] =
		useUpdatePassword(auth);
	const [displayName, setDisplayName] = useState();
	const [userEmail, setUserEmail] = useState(user?.email);

	const navigate = useNavigate();
	const sendNotification = useNotification();

	const { setting } = useParams();

	if (loading) {
		return "loading";
	}

	if (updatingEmail || updatingProfile || updatingPassword) {
		return "updating";
	}

	if (!user) {
		return <Navigate to="/" />;
	}

	if (displayName !== user.displayName) setDisplayName(user.displayName);
	if (userEmail !== user.email) setUserEmail(user.email);

	async function onDisplayNameChange(newName) {
		//firebase - update name
		await updateProfile({
			displayName: newName,
		});
		setDisplayName(newName);
		navigate("/settings");
	}

	async function onEmailChange(newEmail) {
		console.log(newEmail);
		//firebase - update email
		const success = await updateEmail(newEmail);
		if (success) {
			navigate("/settings");
			sendNotification(
				"success",
				"Pleaes check your new email for a confirmation link."
			);
		} else {
			if (!updateError)
				sendNotification("error", "Error changing email. Please try again.");

			let String = updateError.message;

			let invalidEmail = "invalid-new-email";
			let recentLogin = "requires-recent-login";

			if (String.includes(invalidEmail)) {
				sendNotification(
					"error",
					"Invalid Email. Please enter a valid email address."
				);
			} else if (String.includes(recentLogin)) {
				sendNotification(
					"error",
					"Recent Login Required. Please login again to change your email."
				);
				localStorage.removeItem("sessions");
				localStorage.removeItem("last_refreshed");
				signOut(auth).then(() => navigate("/"));
				navigate("/");
			}
		}
	}

	async function onPasswordChange(
		currentPassword,
		newPassword,
		confirmPassword
	) {
		//firebase - update password
		if (newPassword !== confirmPassword) {
			sendNotification("error", "Passwords do not match.");
			return;
		}

		//Reauthenticate user
		let credential = EmailAuthProvider.credential(user.email, currentPassword);
		console.log(credential);
		await reauthenticateWithCredential(user, credential)
			.then(async () => {
				await updatePassword(newPassword);
				sendNotification("success", "Password changed successfully.");
				navigate("/settings");
			})
			.catch((err) => {
				//TODO: should probably check for specific error codes
				sendNotification("error", "Incorrect password.");
				return;
			});
	}

	if (setting === "name") {
		return (
			<Name
				displayName={displayName}
				onDisplayNameChange={onDisplayNameChange}
			/>
		);
	} else if (setting === "email") {
		return <Email currentEmail={user.email} onEmailChange={onEmailChange} />;
	} else if (setting === "password") {
		return <Password onPasswordChange={onPasswordChange} />;
	}

	//TODO: add a way to change required driving hours and required nighttime driving hours

	return (
		<>
			<Navbar loggedIn={true} icon="manage_accounts" />
			<button className="log__btn">
				<Link className="log__link" replace to="/home">
					<span className="material-symbols-outlined">arrow_back</span> Back
				</Link>
			</button>
			<section className="settings">
				<h1 className="settings__title">Account</h1>
				<Link to="/settings/name" className="settings__section">
					<div className="settings__heading">Name</div>
					<p className="settings__value">
						{user.displayName}{" "}
						<span className="material-symbols-outlined settings__icon">
							arrow_forward_ios
						</span>
					</p>
				</Link>
				<hr className="settings__separator"></hr>

				<Link to="/settings/email" className="settings__section">
					<div className="settings__heading">Email</div>
					<p className="settings__value">
						{userEmail}{" "}
						<span className="material-symbols-outlined settings__icon">
							arrow_forward_ios
						</span>
					</p>
				</Link>
				<hr className="settings__separator"></hr>
				{/* <div className="settings__section">
					<div className="settings__heading">Required Driving Hours</div>
					<p className="settings__value">
						50{" "}
						<span className="material-symbols-outlined settings__icon">
							arrow_forward_ios
						</span>
					</p>
				</div>
				<hr className="settings__separator"></hr>

				<div className="settings__section">
					<div className="settings__heading">
						Required Nightime Driving Hours
					</div>
					<p className="settings__value">
						10{" "}
						<span className="material-symbols-outlined settings__icon">
							arrow_forward_ios
						</span>
					</p>
				</div>
				<hr className="settings__separator"></hr> */}

				<Link to="/settings/password" className="settings__section">
					<p className="settings__value">
						Change Password{" "}
						<span className="material-symbols-outlined settings__icon">
							arrow_forward_ios
						</span>
					</p>
				</Link>
				<hr className="settings__separator"></hr>

				<div
					className="settings__section"
					onClick={(e) => {
						localStorage.removeItem("sessions");
						localStorage.removeItem("last_refreshed");
						signOut(auth).then(() => navigate("/"));
					}}
				>
					<p className="settings__value">
						Log Out{" "}
						<span className="material-symbols-outlined settings__icon">
							logout
						</span>
					</p>
				</div>
				{/* 
        <div className="settings settings__account_info">
          <h3 className="settings__heading">Account Info</h3>
          <div className="account__container">
            <p className="account__name account__label">Display Name:</p>
            <p className="account__name account__value">Caleb Herring</p>
            <p className="account_email account__label">Email: </p>
            <p className="account_email account__value">
              calebsethherring@gmail.com
            </p>
            <p className="account__hours account__label">Required Hours: </p>
            <p className="account__hours account__value">50</p>
            <p className="account__night_hours account__label">
              Required Night Hours:{" "}
            </p>
            <p className="account_night_hours account__value">10</p>
          </div>
        </div>
        <div className="settings__display settings__section">
          <h3 className="settings__heading">Display Name</h3>
          <Input
            placeholder="Display Name"
            value={displayName}
            contentState={setDisplayName}
          />
        </div>
        <div className="settings">
          <h3 className="settings__heading">Change Password</h3>
          <Input
            placeholder="Current Password"
            password={true}
            value={currentPwd}
            contentState={setCurrentPwd}
          />
          <Input
            placeholder="New Password"
            password={true}
            value={newPwd}
            contentState={setNewPwd}
          />
          <Input
            placeholder="Confirm Password"
            password={true}
            value={confirmPwd}
            contentState={setConfirmPwd}
          />
        </div>
        <div className="settings__">
          <h3 className="settings__heading">Required Hours</h3>
          <Input
            placeholder="Total Required Hours"
            password={false}
            value={totalHours}
            contentState={setTotalHours}
          />
          <Input
            placeholder="Required Night Hours"
            value={nightHours}
            contentState={setNightHours}
          />
        </div> */}
			</section>
		</>
	);
}
