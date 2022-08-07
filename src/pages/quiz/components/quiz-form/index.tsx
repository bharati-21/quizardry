import React from "react";
import { useQuiz } from "contexts";
import { Box, FormControl, useTheme, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { quizActionTypes } from "actionTypes";
import { Options } from "../options";
import { Question } from "../question";

const QuizForm = () => {
	const {
		quizDispatch,
		quizState: { currentQuestionNumber, questions, selectedOptions },
	} = useQuiz();
	const theme = useTheme();

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
	};

	const handleChangeQuestion = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: number
	) => {
		if (currentQuestionNumber === questions.length - 1 && value === 1) {
			calculateScore();
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
					sx={{ fontWeight: "bold" }}
					disabled={currentQuestionNumber === 0}
					onClick={(e) => handleChangeQuestion(e, -1)}
				>
					<ChevronLeft />
					Prev
				</Button>
				<Button onClick={(e) => handleChangeQuestion(e, 1)}>
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
