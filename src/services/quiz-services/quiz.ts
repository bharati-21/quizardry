import axios from "axios";

const getQuizService = (token: string, quizId: string) =>
	axios.get(`https://quizardry-server.herokuapp.com/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

export { getQuizService };
