import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.css";
import App from "./App";
import { ToastPortal } from "ToastPortal";
import {
	AuthProvider,
	QuizFormModalProvider,
	QuizProvider,
	ThemeProvider,
} from "contexts";
import { ModalPortal } from "ModalPortal";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider>
				<AuthProvider>
					<QuizProvider>
						<QuizFormModalProvider>
							<App />
							<ToastPortal />
							<ModalPortal />
						</QuizFormModalProvider>
					</QuizProvider>
				</AuthProvider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>
);
