import axios from "axios";
import { UserQuizAttempt } from "types/quiz/quiz.types";

const updateUserQuizAttempt = (
	token: string,
	userId: string,
	userQuizAttempt: UserQuizAttempt
) =>
	axios.post(
		`http://localhost:5000/api/users/${userId}/quizAttempts`,
		{ data: userQuizAttempt },
		{
			headers: { authorization: token },
		}
	);

export { updateUserQuizAttempt };
