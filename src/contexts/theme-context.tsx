import { createContext, useContext, useMemo, useState } from "react";
import {
	CssBaseline,
	PaletteMode,
	ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { getAppTheme } from "themes/appTheme";
import { ContextProps, ThemeContextType } from "types";

const ThemeContext = createContext<ThemeContextType>({
	mode: "light",
	setMode: (mode) => mode,
});
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }: ContextProps) => {
	const [mode, setMode] = useState<PaletteMode>("light");

	const theme = useMemo(() => getAppTheme(mode), [mode]);

	return (
		<Provider value={{ mode, setMode }}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				{children}
			</MuiThemeProvider>
		</Provider>
	);
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
