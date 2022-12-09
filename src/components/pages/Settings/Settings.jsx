import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../core/Navbar/Navbar";
import Input from "../../block/Input/Input";

import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Settings.css";

export default function Settings() {
  //Settings:
  //Name - name
  //Email - email
  //Required Driving Hours - hours
  //Required Nighttime Driving Hours - night
  //Change Password - password

  const [user, loading, error] = useAuthState(auth);
  const [changingSetting, ChangingSetting] = useState();
  const [displayName, setDisplayName] = useState();
  const [currentPwd, setCurrentPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();
  const [totalHours, setTotalHours] = useState();
  const [nightHours, setNightHours] = useState();
  const [editAccount, setEditAccount] = useState(false);

  if (loading) {
    return "loading";
  }

  console.log("here");

  if (!user) {
    console.log("here");
    return <Navigate to="/" />;
  }

  console.log("here");
  console.log(user);
  if (displayName !== user.displayName) setDisplayName(user.displayName);

  return (
    <>
      <Navbar loggedIn={true} icon="manage_accounts" />
      <section className="settings">
        <h1 className="settings__title">Account</h1>
        <div className="settings__section">
          <div className="settings__heading">Name</div>
          <p className="settings__value">
            {user.displayName}{" "}
            <span className="material-symbols-outlined settings__icon">
              arrow_forward_ios
            </span>
          </p>
        </div>
        <hr className="settings__separator"></hr>

        <div className="settings__section">
          <div className="settings__heading">Email</div>
          <p className="settings__value">
            {user.email}{" "}
            <span className="material-symbols-outlined settings__icon">
              arrow_forward_ios
            </span>
          </p>
        </div>
        <hr className="settings__separator"></hr>
        <div className="settings__section">
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
        <hr className="settings__separator"></hr>

        <div className="settings__section">
          <p className="settings__value">
            Change Password{" "}
            <span className="material-symbols-outlined settings__icon">
              arrow_forward_ios
            </span>
          </p>
        </div>
        <hr className="settings__separator"></hr>

        <div className="settings__section">
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
