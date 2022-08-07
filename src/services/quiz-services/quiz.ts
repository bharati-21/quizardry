import axios from "axios";

const getQuizService = (token: string, quizId: string) =>
	axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
		headers: { authorization: token },
	});

export { getQuizService };
