import { createTheme, PaletteColorOptions, PaletteMode } from "@mui/material";
import { constants } from "appConstants";

interface PaletteOptions {
	primary: PaletteColorOptions;
	secondary: PaletteColorOptions;
	error: PaletteColorOptions;
	info: PaletteColorOptions;
	warning: PaletteColorOptions;
	success: PaletteColorOptions;
}

const appColors: PaletteOptions = {
	primary: {
		main: "#EC407A",
		light: "#EF6694",
		dark: "#A52C55",
		contrastText: "#fff",
	},
	secondary: {
		main: "#88E0EF",
		light: "#9FE6F2",
		dark: "#5F9CA7",
		contrastText: "#000",
	},
	error: {
		main: "#F44336",
		light: "#E57373",
		dark: "#D32F2F",
		contrastText: "#FFFFFF",
	},
	info: {
		main: "#2196f3",
		light: "#64b5f6",
		dark: "#1976d2",
		contrastText: "#FFFFFF",
	},
	warning: {
		main: "#ff9800",
		light: "#ffb74d",
		dark: "#f57c00",
		contrastText: "#000",
	},
	success: {
		main: "#4caf50",
		light: "#81c784",
		dark: "#388e3c",
		contrastText: "#000",
	},
};

const getAppTheme = (mode: PaletteMode) => {
	const { LIGHT } = constants;

	return createTheme({
		typography: {
			fontFamily: ["Poppins", "sans-serif"].join(","),
		},
		palette: {
			mode,
			...appColors,
			background: {
				default: mode === LIGHT ? "#F2F2F2" : "#0D1230",
				paper: mode === LIGHT ? "#F2F2F2" : "#0D1230",
			},
		},
	});
};

export { appColors, getAppTheme };
