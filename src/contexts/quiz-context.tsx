import { createContext, useContext, useReducer } from "react";
import { quizReducerFunction } from "reducers/quiz-reducer";
import { QuizState, QuizContextType, ContextProps } from "types";

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
};

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
