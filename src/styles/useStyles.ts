import { useTheme } from "@mui/material";

const useStyles = () => {
	const theme = useTheme();

	return {
		primaryLink: {
			color: theme.palette.primary.main,
			textDecoration: "underline",
			textDecorationColor: theme.palette.primary.main,
			"&:hover": {
				color: theme.palette.primary.dark,
				textDecorationColor: theme.palette.primary.dark,
			},
		},
		logoText: {
			background: `
        linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
			webkitBackgroundClip: "text",
			webkitTextFillColor: "transparent",
			backgroundClip: "text",
			textFillColor: "transparent",
			fontFamily: "Raleway",
			fontWeight: 700,
		},
		quizFormModalFormStyle: {
			position: "absolute" as "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			maxWidth: "500px",
			width: "100%",
			bgcolor: "background.paper",
			border: "2px solid #000",
			boxShadow: 24,
			py: 4,
			px: 3,
			maxHeight: "80vh",
			height: "100%",
			overflowY: "auto",
		},
		quizFormModalFormButtonStyles: {
			fontSize: "0.85rem",
			px: "10px",
			py: "2px",
			ml: "auto",
		},
	};
};

export { useStyles };
