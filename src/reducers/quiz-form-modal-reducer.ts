import { QuizFormModalAction, QuizFormModalState } from "types";
import { quizFormModalActionTypes } from "actionTypes";

const { SET_MODAL_STATE, RESET_MODAL_STATE } = quizFormModalActionTypes;

const quizFormModalInitialState: QuizFormModalState = {
	modalIsOpen: false,
	editingId: null,
	category: null,
	refetchQuiz: false,
};

const quizFormModalReducerFunction = (
	state: QuizFormModalState,
	action: QuizFormModalAction
) => {
	const { type, payload } = action;

	switch (type) {
		case SET_MODAL_STATE:
			return {
				...state,
				...payload,
			};
		case RESET_MODAL_STATE:
			return {
				...state,
				...quizFormModalInitialState,
			};
		default:
			throw new Error("Invalid action type");
	}
};

export { quizFormModalReducerFunction, quizFormModalInitialState };
