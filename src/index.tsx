import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./theme";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Router>
	</React.StrictMode>
);
