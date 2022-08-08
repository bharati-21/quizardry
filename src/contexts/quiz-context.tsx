import { createContext, useContext, useReducer } from "react";
import { quizReducerFunction, initialState } from "reducers/quiz-reducer";
import { QuizContextType, ContextProps } from "types";

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const { Provider } = QuizContext;

const QuizProvider = ({ children }: ContextProps) => {
	const [quizState, quizDispatch] = useReducer(
		quizReducerFunction,
		initialState
	);

	return <Provider value={{ quizState, quizDispatch }}>{children}</Provider>;
};

const useQuiz = () => useContext(QuizContext);

export { useQuiz, QuizProvider };
