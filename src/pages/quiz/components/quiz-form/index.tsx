import React from "react";
import { useAuth, useQuiz } from "contexts";
import { Box, FormControl, useTheme, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { authActionTypes, quizActionTypes } from "actionTypes";
import { Options } from "../options";
import { Question } from "../question";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserQuizAttempt } from "services";
import { UserQuizAttempt } from "types";

const QuizForm = () => {
	const {
		quizDispatch,
		quizState: {
			currentQuestionNumber,
			questions,
			selectedOptions,
			quizId,
			quizName,
			category,
		},
	} = useQuiz();
	const {
		authState: {
			authToken,
			authUser: { userId },
		},
		authDispatch,
	} = useAuth();
	const theme = useTheme();
	const navigate = useNavigate();
	const { UPDATE_QUIZ_ATTEMPT } = authActionTypes;

	const calculateScore = () => {
		const { SET_SCORE } = quizActionTypes;
		const score = questions.reduce(
			(acc, question, index) =>
				acc +
				(question.options.find(
					(option) =>
						(selectedOptions[index] &&
							selectedOptions[index]._id) === option._id
				)?.isCorrect
					? 10
					: 0),
			0
		);
		quizDispatch({
			type: SET_SCORE,
			payload: {
				score,
			},
		});
		return score;
	};

	const handleChangeQuestion = async (
		e: React.MouseEvent<HTMLButtonElement>,
		value: number
	) => {
		if (currentQuestionNumber === questions.length - 1 && value === 1) {
			const totalScore = calculateScore();
			const userQuizAttempt: UserQuizAttempt = {
				quizId,
				quizName,
				totalScore,
				category,
				selectedOptions,
			};
			try {
				const {
					data: { updatedData },
				} = await updateUserQuizAttempt(
					authToken as string,
					userId,
					userQuizAttempt
				);
				authDispatch({
					type: UPDATE_QUIZ_ATTEMPT,
					payload: { ...updatedData },
				});

				return navigate("/results", { replace: true });
			} catch (error) {
				toast.error(
					"Something went wrong. Could not update score. Please try again later."
				);
				navigate("/home", { replace: true });
			}
			return;
		}
		const { CHANGE_QUESTION_NUMBER } = quizActionTypes;

		quizDispatch({
			type: CHANGE_QUESTION_NUMBER,
			payload: {
				questionNumber: Number(currentQuestionNumber) + value,
			},
		});
	};

	return (
		<>
			<FormControl
				sx={{
					width: "100%",
					border: `1px solid ${theme.palette.grey[500]}`,
					borderRadius: "3px",
					py: 3,
					px: 2,
					gap: 3,
				}}
			>
				<Question />
				<Options />
			</FormControl>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					gap: "1rem",
					mt: 2,
				}}
			>
				<Button
					variant="outlined"
					sx={{ fontWeight: "bold" }}
					disabled={currentQuestionNumber === 0}
					onClick={(e) => handleChangeQuestion(e, -1)}
				>
					<ChevronLeft />
					Prev
				</Button>
				<Button
					onClick={(e) => handleChangeQuestion(e, 1)}
					variant="outlined"
				>
					<ChevronRight />
					{currentQuestionNumber === questions.length - 1
						? "Submit"
						: "Next"}
				</Button>
			</Box>
		</>
	);
};

export { QuizForm };
