import axios from "axios";

const updateUserQuizAttempt = (token: string, userId: string) =>
	axios.get(`http://localhost:5000/api/users/${userId}/quizAttempts`, {
		headers: { authorization: token },
	});

export { updateUserQuizAttempt };
