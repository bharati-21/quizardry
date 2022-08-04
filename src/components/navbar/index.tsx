import React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useStyles } from "styles/useStyles";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "contexts";
import { constants } from "appConstants";

const Navbar = () => {
	const { mode, setMode } = useTheme();
	const navigate = useNavigate();
	const { logoText } = useStyles();
	const { LIGHT } = constants;
	const { isAuth, setAuth } = useAuth();

	const handleLoginClick = () => {
		if (isAuth) {
			setAuth({
				isAuth: false,
				authToken: null,
				authUser: {},
			});
		}
		navigate("/login");
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: mode === LIGHT ? "#FFF" : "#0D1230",
					boxShadow: "none",
					color: "inherit",
				}}
			>
				<Box maxWidth="lg" margin="auto" width="100%">
					<Toolbar>
						<Typography
							variant="h3"
							sx={{ flexGrow: 1, ...logoText }}
						>
							<Link to="/">Q</Link>
						</Typography>
						<Box
							sx={{
								display: "flex",
								gap: 2,
								alignItems: "center",
							}}
						>
							<Button
								color="primary"
								variant="contained"
								className="button-link"
								onClick={handleLoginClick}
							>
								{isAuth ? "Logout" : "Login"}
							</Button>
							<IconButton
								sx={{ color: "unset" }}
								onClick={() => {
									if (mode === LIGHT) {
										setMode("dark");
									} else {
										setMode("light");
									}
								}}
							>
								{mode === LIGHT ? (
									<DarkMode sx={{ fontSize: 30 }} />
								) : (
									<LightMode sx={{ fontSize: 30 }} />
								)}
							</IconButton>
						</Box>
					</Toolbar>
				</Box>
			</AppBar>
		</Box>
	);
};

export { Navbar };
