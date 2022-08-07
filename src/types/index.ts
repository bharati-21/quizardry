import { ReactNode } from "react";

export interface ContextProps {
	children?: ReactNode;
}

export type { AuthContextType, AuthState } from "./auth/auth.types";

export type { ThemeContextType } from "./theme/theme.types";
