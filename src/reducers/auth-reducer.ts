import { AuthAction, AuthState } from "types";
import { authActionTypes } from "actionTypes";

const { SET_AUTH, RESET_AUTH, UPDATE_QUIZ_ATTEMPT } = authActionTypes;

const authInitialState: AuthState = {
	isAuth: false,
	authToken: null,
	authUser: {},
};

const authReducerFunction = (state: AuthState, action: AuthAction) => {
	const { type, payload } = action;
	switch (type) {
		case SET_AUTH:
			return {
				...state,
				...payload,
			};
		case RESET_AUTH:
			return {
				...state,
				...authInitialState,
			};
		case UPDATE_QUIZ_ATTEMPT:
			return {
				...state,
				authUser: { ...state.authUser, ...payload },
			};
		default:
			throw new Error("Invalid action type");
	}
};

export { authReducerFunction, authInitialState };
