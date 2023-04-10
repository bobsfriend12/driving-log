import React from "react";

import { NotificationManager } from "react-notifications";

export default function useNotification() {
	const sendNotification = (type, text) => {
		switch (type) {
			case "success":
				NotificationManager.success(text, "Success");
				break;
			case "info":
				NotificationManager.info(text);
				break;
			case "warning":
				NotificationManager.warning(text, "Warning");
				break;
			case "error":
				NotificationManager.error(text, "Error");
				break;
			default:
				alert("bad notification");
				break;
		}
	};

	return sendNotification;
}
