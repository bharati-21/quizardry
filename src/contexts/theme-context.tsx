import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
	CssBaseline,
	PaletteMode,
	ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { getAppTheme } from "themes/appTheme";

type ThemeContextType = {
	mode: string;
	setMode: (mode: PaletteMode) => void;
};

interface Props {
	children?: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
	mode: "light",
	setMode: (mode) => mode,
});
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }: Props) => {
	const [mode, setMode] = useState<PaletteMode>("light");

	const value: ThemeContextType = {
		mode,
		setMode,
	};

	const theme = useMemo(() => getAppTheme(mode), [mode]);

	return (
		<Provider value={value}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				{children}
			</MuiThemeProvider>
		</Provider>
	);
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
