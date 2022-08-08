import { QuizAction, QuizState } from "types";
import { quizActionTypes } from "actionTypes";

const {
	SET_LOADING_ERROR,
	SET_QUESTION_DATA,
	START_QUIZ,
	END_QUIZ,
	SET_SELECTED_OPTION,
	CHANGE_QUESTION_NUMBER,
	SET_SCORE,
} = quizActionTypes;

const initialState: QuizState = {
	quizDataLoading: true,
	quizDataError: null,
	quizId: "",
	quizName: "",
	category: {
		categoryId: "",
		categoryName: "",
	},
	questions: [],
	selectedOptions: new Array(10),
	currentQuestionNumber: 0,
	totalScore: 0,
	attemptingQuiz: false,
	completedQuiz: false,
};

const quizReducerFunction = (state: QuizState, action: QuizAction) => {
	const { type, payload } = action;
	switch (type) {
		case SET_QUESTION_DATA:
			return {
				...state,
				currentQuestionNumber: 0,
				totalScore: 0,
				...payload,
			};
		case SET_LOADING_ERROR:
			return {
				...state,
				quizDataLoading: payload.quizDataLoading,
				quizDataError: payload.quizDataError,
			};
		case START_QUIZ:
			return {
				...state,
				selectedOptions: new Array(10),
				currentQuestionNumber: 0,
				totalScore: 0,
				attemptingQuiz: true,
				completedQuiz: false,
			};
		case SET_SELECTED_OPTION:
			const updatedSelectedOptions = state.selectedOptions.slice();
			updatedSelectedOptions[payload.questionNumber] =
				payload.selectedOption;

			return {
				...state,
				selectedOptions: [...updatedSelectedOptions],
			};
		case CHANGE_QUESTION_NUMBER:
			return {
				...state,
				currentQuestionNumber: payload.questionNumber,
			};
		case SET_SCORE:
			return {
				...state,
				totalScore: payload.score,
				completedQuiz: true,
			};
		case END_QUIZ:
			return {
				...state,
				...initialState,
			};
		default:
			throw new Error("Invalid action type");
	}
};

export { quizReducerFunction, initialState };
