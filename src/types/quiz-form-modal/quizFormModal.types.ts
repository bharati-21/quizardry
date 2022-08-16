import { Category } from "types/quiz/quiz.types";

export type QuizFormModalState = {
	modalIsOpen: boolean;
	editingId: string | null;
	category: Category | null;
	refetchQuiz: boolean;
};

export type QuizFormModalAction = {
	type: string;
	payload?: any;
};

export type QuizFormModalDispatch = (action: QuizFormModalAction) => void;

export type QuizFormModalContextType = {
	quizFormModalState: QuizFormModalState;
	quizFormModalDispatch: QuizFormModalDispatch;
};

export type ModalOption = {
	option: string;
	isCorrect: boolean;
};

export type ModalQuestion = {
	question: string;
	options: ModalOption[];
};
