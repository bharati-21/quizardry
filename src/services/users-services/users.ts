import axios from "axios";
import { UserQuizAttempt } from "types/quiz/quiz.types";

const updateUserQuizAttempt = (
	token: string,
	userId: string,
	userQuizAttempt: UserQuizAttempt
) =>
	axios.post(
		`${process.env.REACT_APP_API_URL}/api/users/${userId}/quizAttempts`,
		{ data: userQuizAttempt },
		{
			headers: { authorization: token },
		}
	);

export { updateUserQuizAttempt };
