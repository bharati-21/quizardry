import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.css";
import App from "./App";
import { ToastPortal } from "ToastPortal";
import { AuthProvider, ThemeProvider } from "contexts";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider>
				<AuthProvider>
					<App />
					<ToastPortal />
				</AuthProvider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>
);
