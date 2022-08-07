import React from "react";
import { useQuiz } from "contexts";
import { FormLabel } from "@mui/material";

const Question = () => {
	const {
		quizState: { currentQuestionNumber, questions },
	} = useQuiz();

	const selectedQuestion = questions[currentQuestionNumber];

	return (
		<FormLabel
			id="question-text"
			sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
		>
			{selectedQuestion.question}
		</FormLabel>
	);
};

export { Question };
