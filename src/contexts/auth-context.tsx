import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContextType, ContextProps } from "types";
import { useInterceptNetworkCall } from "hooks/useInterceptNetworkCall";
import { authReducerFunction, authInitialState } from "reducers";
import { authActionTypes } from "actionTypes";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: ContextProps) => {
	const sessionUserToken = localStorage.getItem("quizardry-auth-token");
	const sessionUserDetails = JSON.parse(
		localStorage.getItem("quizardry-auth-user") ?? "{}"
	);

	const initialState = {
		...authInitialState,
		authToken: sessionUserToken ?? null,
		authUser: sessionUserDetails,
		isAuth: sessionUserToken ? true : false,
	};

	const [authState, authDispatch] = useReducer(
		authReducerFunction,
		initialState
	);
	const navigate = useNavigate();
	const { interceptNetworkCall } = useInterceptNetworkCall();

	const { RESET_AUTH } = authActionTypes;

	const logoutUser = useCallback(() => {
		authDispatch({ type: RESET_AUTH });
		localStorage.removeItem("quizardry-auth-token");
		localStorage.removeItem("quizardry-auth-user");
		navigate("/login");
	}, [navigate, RESET_AUTH]);

	useEffect(() => {
		interceptNetworkCall(logoutUser);
	}, [interceptNetworkCall, logoutUser]);

	return (
		<Provider value={{ authState, authDispatch, logoutUser }}>
			{children}
		</Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
