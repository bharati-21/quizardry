import React, { useEffect } from "react";
import { useAuth, useQuiz } from "contexts";
import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { constants } from "appConstants";
import toast from "react-hot-toast";
import { getQuizService } from "services";
import loader from "images/loader.svg";
import { QuizForm } from "./components/quiz-form";

const Quiz = () => {
	const {
		quizDispatch,
		quizState: { quizName, quizId, quizDataLoading, quizDataError },
	} = useQuiz();
	const {
		auth: { authToken },
	} = useAuth();
	const { quizId: paramQuizId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		// If there's no quiz id, then go back home
		if (!quizId) {
			navigate("/home", { replace: true });
		} else if (paramQuizId !== quizId) {
			// If the paramId is different from the quizId, then refetch the quiz data
			(async () => {
				const { SET_LOADING_ERROR, SET_QUESTION_DATA } = constants;
				quizDispatch({
					type: SET_LOADING_ERROR,
					payload: {
						quizDataLoading: true,
						quizDataError: null,
					},
				});

				try {
					const {
						data: { quiz },
					} = await getQuizService(authToken as string, quizId);
					quizDispatch({
						type: SET_QUESTION_DATA,
						payload: {
							...quiz,
							quizDataLoading: false,
							quizDataError: null,
						},
					});
				} catch (error: any) {
					quizDispatch({
						type: SET_LOADING_ERROR,
						payload: {
							quizDataLoading: false,
							quizDataError:
								"Could not fetch quiz data. Please try again later",
						},
					});
					toast.error(
						"Could not fetch quiz data. Please try again later."
					);
				}
			})();
		}
	}, [quizId, navigate, paramQuizId, authToken, quizDispatch]);

	return quizDataLoading ? (
		<img src={loader} alt="Loading..." />
	) : quizDataError ? (
		<Typography variant="h3" fontWeight="bold" color="error">
			{quizDataError}
		</Typography>
	) : (
		<Box sx={{ maxWidth: "960px", width: "100%" }}>
			<Typography
				variant="h4"
				fontWeight="bold"
				color="primary"
				textAlign="center"
				sx={{ mb: 3 }}
			>
				{quizName}
			</Typography>
			<QuizForm />
		</Box>
	);
};

export { Quiz };
