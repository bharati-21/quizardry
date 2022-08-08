import { Option } from "types/quiz/quiz.types";

type Category = {
	categoryId: string;
	categoryName: string;
	_id: string;
};

export type QuizAttempts = {
	category: Category;
	quizId: string;
	quizName: string;
	totalScore: number;
	selectedOption: Option[];
	_id: string;
};

export type AuthUser = {
	email: string;
	firstName: string;
	lastName: string;
	totalScore: number;
	userId: string;
	quizAttempts: QuizAttempts[];
};

export type AuthState = {
	isAuth: boolean;
	authUser: any;
	authToken: string | null;
};

export type AuthDispatch = (action: AuthAction) => void;

export type AuthAction = {
	type: string;
	payload?: any;
};

export type AuthContextType = {
	authState: AuthState;
	logoutUser: () => void;
	authDispatch: AuthDispatch;
};
