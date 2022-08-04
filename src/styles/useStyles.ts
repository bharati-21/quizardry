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
	};
};

export { useStyles };
