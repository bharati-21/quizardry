import axios from "axios";

const getQuizService = (token: string, quizId: string) =>
	axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

const postItemToQuizService = (token: string, quiz: any) =>
	axios.post(
		`http://localhost:5000/api/quizzes`,
		{
			quiz,
		},
		{
			headers: { authorization: token },
		}
	);

const deleteItemFromQuizService = (token: string, quizId: string) =>
	axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

export { getQuizService, postItemToQuizService, deleteItemFromQuizService };
