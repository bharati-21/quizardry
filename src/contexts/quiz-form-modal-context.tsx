import { createContext, useContext, useReducer } from "react";
import {
	quizFormModalReducerFunction,
	quizFormModalInitialState,
} from "reducers";
import { ContextProps, QuizFormModalContextType } from "types";

const QuizFormModalContext = createContext<QuizFormModalContextType>(
	{} as QuizFormModalContextType
);

const { Provider } = QuizFormModalContext;

const QuizFormModalProvider = ({ children }: ContextProps) => {
	const [quizFormModalState, quizFormModalDispatch] = useReducer(
		quizFormModalReducerFunction,
		quizFormModalInitialState
	);

	return (
		<Provider value={{ quizFormModalState, quizFormModalDispatch }}>
			{children}
		</Provider>
	);
};

const useQuizFormModal = () => useContext(QuizFormModalContext);

export { useQuizFormModal, QuizFormModalProvider };
