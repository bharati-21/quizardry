export type AuthState = {
    isAuth: boolean;
    authUser: any;
    authToken: string | null;
};

export type AuthContextType = {
	setAuth: (authState: any) => any;
    logoutUser: () => void;
    auth: AuthState;
};

