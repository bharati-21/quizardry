import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContextType, ContextProps, AuthState } from "types";
import { useInterceptNetworkCall } from "hooks/useInterceptNetworkCall";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: ContextProps) => {
	const sessionUserToken = localStorage.getItem("quizardry-auth-token");
	const sessionUserDetails = JSON.parse(
		localStorage.getItem("quizardry-auth-details") || "{}"
	);

	const initialState: AuthState = {
		isAuth: sessionUserToken ? true : false,
		authUser: sessionUserDetails,
		authToken: sessionUserToken ?? null,
	};

	const [auth, setAuth] = useState(initialState);
	const navigate = useNavigate();
	const { interceptNetworkCall } = useInterceptNetworkCall();

	const logoutUser = useCallback(() => {
		setAuth({
			isAuth: false,
			authToken: null,
			authUser: {},
		});
		localStorage.removeItem("quizardry-auth-token");
		localStorage.removeItem("quizardry-auth-user");
		navigate("/login");
	}, [navigate]);

	useEffect(() => {
		interceptNetworkCall(logoutUser);
	}, [interceptNetworkCall, logoutUser]);

	return (
		<Provider value={{ auth, setAuth, logoutUser }}>{children}</Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
