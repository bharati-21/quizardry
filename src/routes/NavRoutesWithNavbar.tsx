import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "components";
import { Grid } from "@mui/material";

const NavRoutesWithNavbar = () => {
	return (
		<>
			<Navbar />
			<Grid
				container
				component="main"
				px={2}
				py={4}
				sx={{
					minHeight: "90vh",
					width: "100%",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Outlet />
			</Grid>
		</>
	);
};

export { NavRoutesWithNavbar };
