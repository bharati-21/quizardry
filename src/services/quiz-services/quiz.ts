import axios from "axios";

const getQuizService = (token: string, quizId: string) =>
	axios.get(`https://quizardry-server.herokuapp.com/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

const postItemToQuizService = (token: string, quiz: any) =>
	axios.post(
		`https://quizardry-server.herokuapp.com/api/quizzes`,
		{
			quiz,
		},
		{
			headers: { authorization: token },
		}
	);

const deleteItemFromQuizService = (token: string, quizId: string) =>
	axios.delete(
		`https://quizardry-server.herokuapp.com/api/quizzes/${quizId}`,
		{
			headers: { authorization: token },
		}
	);

export { getQuizService, postItemToQuizService, deleteItemFromQuizService };
