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
import { Link } from "react-router-dom";
import { useTheme } from "contexts";

const Navbar = () => {
	const { mode, setMode } = useTheme();
	const { logoText } = useStyles();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: mode === "light" ? "#FFF" : "#0D1230",
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
							<Button color="primary" variant="contained">
								<Link to="/login" className="button-link">
									Login
								</Link>
							</Button>
							<IconButton
								sx={{ color: "unset" }}
								onClick={() => {
									if (mode === "light") {
										setMode("dark");
									} else {
										setMode("light");
									}
								}}
							>
								{mode === "light" ? (
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
