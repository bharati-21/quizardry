import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
	setAuth: (authState: any) => any;
	isAuth: boolean;
	authUser: any;
	authToken: string | null;
};

interface Props {
	children?: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	authUser: {},
	authToken: null,
	setAuth: (authState: any) => authState,
});
const { Provider } = AuthContext;

const AuthProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState({
		isAuth: false,
		authUser: {},
		authToken: null,
	});

	const value: AuthContextType = {
		...auth,
		setAuth,
	};

	return <Provider value={value}>{children}</Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
