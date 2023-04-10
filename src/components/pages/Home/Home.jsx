import React, { useState, useEffect } from "react";
import download from "downloadjs";
import { signOut } from "firebase/auth";

import Navbar from "../../core/Navbar/Navbar";
import Btn from "../../block/Btn/Btn";
import Stats from "../../core/Stats/Stats";
import Hours from "../../core/Hours/Hours";

import exportHours from "./exportHours";

import { onAuthStateChanged } from "firebase/auth";

import { auth, firestore } from "../../../firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";

import "./Home.css";
import { Link, Navigate, useParams } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";

//put it out here so that when
//the comp is rerendered it doesn't
//unset itself.
let userId;

function Home() {
	const [signedIn, setSignedIn] = useState(true);
	const [loading, setLoading] = useState(true);
	const [sessions, setSessions] = useState([]);
	const sendNotification = useNotification();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				setSignedIn(false);
			} else {
				// setUserId(user.uid);
				userId = user.uid;

				const sessionsRef = collection(firestore, "sessions");
				const docRef = doc(firestore, "sessions", userId);
				if (!localStorage.getItem("sessions")) {
					getDoc(docRef)
						.then((doc) => {
							if (doc.exists()) {
								console.log(doc.data().sessions);
								if (typeof doc.data().sessions !== "object") {
									console.log("no sessions");
									localStorage.setItem("sessions", "[]");
									localStorage.setItem("last_refreshed", new Date());
									setSessions([]);
									setLoading(false);
								} else if (doc.data().sessions.length > 0) {
									const existingSessions = doc.data().sessions;
									console.log(doc.data().sessions);
									localStorage.setItem(
										"sessions",
										JSON.stringify(existingSessions)
									);
									localStorage.setItem("last_refreshed", new Date());
									setSessions(existingSessions);
									setLoading(false);
								}
							} else {
								localStorage.setItem("last_refreshed", new Date());
								localStorage.setItem("sessions", "[]");
								setSessions([]);
								setLoading(false);
							}
						})
						.catch(() =>
							sendNotification("error", "Failed to get logged hours")
						);
				} else {
					setSessions(JSON.parse(localStorage.getItem("sessions")));
					setLoading(false);
				}
			}
		});
	}, []);

	// console.log(docRef);

	useEffect(() => {
		// if (!localStorage.getItem("sessions")) {
		//   getDoc(docRef).then(doc => {
		//     if (doc.exists()) {
		//       console.log(doc.data().sessions);
		//       if (typeof doc.data().sessions !== "object") {
		//         console.log("no sessions");
		//         localStorage.setItem("sessions", "[]");
		//         localStorage.setItem("last_refreshed", new Date());
		//         setSessions([]);
		//         setLoading(false);
		//       } else if (doc.data().sessions.length > 0) {
		//         const existingSessions = doc.data().sessions;
		//         console.log(doc.data().sessions);
		//         localStorage.setItem("sessions", JSON.stringify(existingSessions));
		//         localStorage.setItem("last_refreshed", new Date());
		//         setSessions(existingSessions);
		//         setLoading(false);
		//       }
		//     } else {
		//       localStorage.setItem("last_refreshed", new Date());
		//       localStorage.setItem("sessions", "[]");
		//       setSessions([]);
		//       setLoading(false);
		//     }
		//   });
		// } else {
		//   setSessions(JSON.parse(localStorage.getItem("sessions")));
		//   setLoading(false);
		// }
	}, []);

	if (loading) {
		return "loading";
	}
	if (!signedIn) {
		return <Navigate replace to="/login" />;
	}

	//TODO: make the log button a pill in the bottom right corner

	return (
		<div>
			<Navbar icon="manage_accounts" loggedIn={true} />
			<section className="home">
				<Btn
					icon="add"
					text={
						<Link className="home__link" to="/log">
							Log Hours
						</Link>
					}
				/>
				<Btn
					text="Export Hours"
					onClick={async () => {
						const { pdfBytes, shareData } = await exportHours(sessions);
						if ("canShare" in navigator && navigator.canShare(shareData)) {
							console.log("using webshare");
							navigator.share(shareData).catch((err) => console.log(err));
						} else {
							console.log("No webshare api, downloading instead");
							download(pdfBytes, "Driving Hours.pdf", "application/pdf");
						}
					}}
				/>
				<Stats sessions={sessions} />
				<Hours sessions={sessions} userId={userId} />
			</section>
		</div>
	);
}

export default Home;
