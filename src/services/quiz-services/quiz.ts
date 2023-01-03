import axios from "axios";

const getQuizService = (token: string, quizId: string) =>
	axios.get(`${process.env.REACT_APP_API_URL}/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

const postItemToQuizService = (token: string, quiz: any) =>
	axios.post(
		`${process.env.REACT_APP_API_URL}/api/quizzes`,
		{
			quiz,
		},
		{
			headers: { authorization: token },
		}
	);

const deleteItemFromQuizService = (token: string, quizId: string) =>
	axios.delete(`${process.env.REACT_APP_API_URL}/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

export { getQuizService, postItemToQuizService, deleteItemFromQuizService };
