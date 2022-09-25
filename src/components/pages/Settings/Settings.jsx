import React, { useState } from "react";
import Navbar from "../../core/Navbar/Navbar";
import Input from "../../block/Input/Input";

import { auth } from "../../../firebase";

import "./Settings.css";

export default function Settings() {
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName);
  const [currentPwd, setCurrentPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();
  const [totalHours, setTotalHours] = useState();
  const [nightHours, setNightHours] = useState();

  return (
    <>
      <Navbar loggedIn={true} icon="manage_accounts" />
      <section className="settings">
        <h1 className="settings__title">Account</h1>
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
        </div>
      </section>
    </>
  );
}
