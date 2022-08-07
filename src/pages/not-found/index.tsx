import React from "react";
import { Box, Typography, Button } from "@mui/material";
import notFoundImage from "images/not_found.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				p: 2,
				height: "90vh",
			}}
		>
			<Typography variant="h3" sx={{ fontWeight: "bold" }}>
				Page Not Found
			</Typography>
			<Box
				sx={{
					height: "60vh",
					width: "100%",
					background: `url(${notFoundImage}) no-repeat center center`,
				}}
			/>
			<Button variant="contained">
				<Link to="/home" className="button-link">
					Home
				</Link>
			</Button>
		</Box>
	);
};

export { NotFound };
