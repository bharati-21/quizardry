import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";

const ToastPortal = () => {
	return ReactDOM.createPortal(
		<Toaster position="top-right" reverseOrder={false} />,
		document.getElementById("toast-portal")!
	);
};

export { ToastPortal };
