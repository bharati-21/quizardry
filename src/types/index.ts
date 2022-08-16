import { ReactNode } from "react";
import { Option } from "./quiz/quiz.types";

export interface ContextProps {
	children?: ReactNode;
}

export type {
	AuthContextType,
	AuthState,
	AuthAction,
	AuthDispatch,
} from "./auth/auth.types";

export type { ThemeContextType } from "./theme/theme.types";

export type {
	QuizAction,
	QuizDispatch,
	Question,
	Option,
	SelectedOption,
	QuizState,
	QuizContextType,
	UserQuizAttempt,
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

export type {
	QuizFormModalState,
	QuizFormModalAction,
	QuizFormModalDispatch,
	QuizFormModalContextType,
	ModalOption,
	ModalQuestion,
} from "./quiz-form-modal/quizFormModal.types";
