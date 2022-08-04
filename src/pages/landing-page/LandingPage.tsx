import { Typography, Button, Grid, CssBaseline } from "@mui/material";
import { useStyles } from "styles/useStyles";
import { Link } from "react-router-dom";

import landingPageUndraw from "images/landing_page_undraw.svg";

const LandingPage = () => {
	const { logoText } = useStyles();
	return (
		<Grid
			container
			component="main"
			px={2}
			sx={{
				minHeight: "90vh",
				width: "100%",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CssBaseline />
			<Grid
				item
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					variant="h3"
					sx={{
						...logoText,
						textAlign: "center",
					}}
				>
					<Link to="/">Quizardry</Link>
				</Typography>
				<Typography
					variant="body1"
					sx={{
						fontSize: "1.5rem",
						textAlign: "center",
					}}
				>
					Join now to become a quiz wizard!
				</Typography>
				<Typography
					variant="body1"
					sx={{
						textAlign: "center",
					}}
				>
					Test your knowledge across categories such as shows, books
					and music!
				</Typography>
				<Button
					color="primary"
					variant="contained"
					sx={{ mt: 2, mb: 3 }}
				>
					<Link to="/signup" className="button-link">
						Join Now
					</Link>
				</Button>
			</Grid>
			<Grid
				item
				sx={{
					backgroundImage: `url(${landingPageUndraw})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center center",
					height: "40vh",
					width: "100%",
				}}
			/>
		</Grid>
	);
};

export { LandingPage };
