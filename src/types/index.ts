import { ReactNode } from "react";
import { Option } from "./quiz/quiz.types";

export interface ContextProps {
	children?: ReactNode;
}

export type { AuthContextType, AuthState } from "./auth/auth.types";

export type { ThemeContextType } from "./theme/theme.types";

export type {
	QuizAction,
	QuizDispatch,
	Question,
	Option,
	SelectedOption,
	QuizState,
	QuizContextType,
} from "./quiz/quiz.types";

export type QuestionContainerPropsType = {
	question: string;
	options: Option[];
	index: number;
};

export type OptionsContainerPropsType = {
	option: string;
	_id: string;
	isCorrect: boolean;
	index: number;
};