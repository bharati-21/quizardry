export type QuizAction = {
	type: string;
	payload?: any;
};

export type QuizDispatch = (action: QuizAction) => void;

export type Option = {
	_id: string;
	option: string;
	isCorrect: boolean;
};

export type Question = {
	_id: string;
	question: string;
	options: Option[];
};

export type SelectedOption = {
	option: string;
	_id: string;
};

export type Category = {
	categoryId: string;
	categoryName: string;
};

export type QuizState = {
	quizName: string;
	category: Category;
	quizDataLoading: boolean;
	quizDataError: null | string;
	quizId: string;
	questions: Question[];
	selectedOptions: any[];
	currentQuestionNumber: number;
	totalScore: number;
	attemptingQuiz: boolean;
	completedQuiz: boolean;
};

export type QuizContextType = {
	quizState: QuizState;
	quizDispatch: QuizDispatch;
};
