import { Typography, Button, Grid, CssBaseline } from "@mui/material";
import { useStyles } from "styles/useStyles";
import { Link } from "react-router-dom";

import landingPageUndraw from "images/landing_page_undraw.svg";
import { useAuth } from "contexts";

const LandingPage = () => {
	const { logoText } = useStyles();
	const {
		authState: { isAuth, authToken },
	} = useAuth();
	return (
		<>
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
					<Link
						to={isAuth && authToken ? "/home" : "/signup"}
						className="button-link"
					>
						{isAuth && authToken ? "Home" : "Join Now"}
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
		</>
	);
};

export { LandingPage };
