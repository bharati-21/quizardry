import { QuizAction, QuizState } from "types";
import { quizActionTypes } from "actionTypes";

const {
	SET_LOADING_ERROR,
	SET_QUESTION_DATA,
	RESET_QUIZ_STATE,
	SET_SELECTED_OPTION,
	CHANGE_QUESTION_NUMBER,
	SET_SCORE,
} = quizActionTypes;

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
				loading: payload.loading,
				error: payload.error,
			};
		case RESET_QUIZ_STATE:
			return {
				...state,
				selectedOptions: new Array(10),
				currentQuestionNumber: 0,
				totalScore: 0,
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
			};
	}
};

export { quizReducerFunction };
