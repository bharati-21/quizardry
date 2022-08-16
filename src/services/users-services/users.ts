import axios from "axios";
import { UserQuizAttempt } from "types/quiz/quiz.types";

const updateUserQuizAttempt = (
	token: string,
	userId: string,
	userQuizAttempt: UserQuizAttempt
) =>
	axios.post(
		`https://quizardry-server.herokuapp.com/api/users/${userId}/quizAttempts`,
		{ data: userQuizAttempt },
		{
			headers: { authorization: token },
		}
	);

export { updateUserQuizAttempt };
