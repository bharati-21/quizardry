import { PaletteMode } from "@mui/material";

export type ThemeContextType = {
	mode: string;
	setMode: (mode: PaletteMode) => void;
};
