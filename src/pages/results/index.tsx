import React, { useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import Confetti from "react-confetti";

import { useQuiz } from "contexts";
import { quizActionTypes } from "actionTypes";
import { useNavigate } from "react-router-dom";
import { QuestionContainer } from "./components/question-container";

const Results = () => {
	const {
		quizState: {
			totalScore,
			questions,
			attemptingQuiz,
			currentQuestionNumber,
			completedQuiz,
		},
		quizDispatch,
	} = useQuiz();
	const navigate = useNavigate();
	const [showConfetti, setShowConfetti] = useState(totalScore >= 60);
	const { END_QUIZ } = quizActionTypes;

	useEffect(() => {
		if (!attemptingQuiz) navigate("/home", { replace: true });
		if (currentQuestionNumber !== 9 || !completedQuiz) {
			navigate("/home", { replace: true });
		}
	}, [
		navigate,
		attemptingQuiz,
		quizDispatch,
		currentQuestionNumber,
		completedQuiz,
	]);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;
		if (showConfetti) {
			timeoutId = setTimeout(() => {
				setShowConfetti(false);
			}, 5000);
		}
		return () => clearTimeout(timeoutId);
	}, [showConfetti]);

	const handleNavigateToHome = () => {
		quizDispatch({
			type: END_QUIZ,
		});
		navigate("/home", { replace: true });
	};

	return (
		<>
			{showConfetti && (
				<Confetti
					width={window.innerWidth - 100}
					height={window.innerHeight - 100}
				/>
			)}
			<Box sx={{ maxWidth: "840px", width: "100%" }}>
				<Typography
					variant="h4"
					textAlign="center"
					fontWeight="bold"
					sx={{ mb: 1 }}
				>
					Results
				</Typography>
				<Box textAlign="center" sx={{ mb: 3 }}>
					<Typography variant="h5" fontWeight="bold">
						You Scored: {totalScore}
					</Typography>
					<Typography variant="body1" fontWeight="600">
						Status:{" "}
						{totalScore >= 60
							? "You are a quiz wizard! 🥳"
							: "Better luck next time! 😞"}
					</Typography>
				</Box>
				<Container
					sx={{
						p: "0 !important",
						display: "flex",
						gap: "1rem",
						flexDirection: "column",
					}}
				>
					{questions.map(({ question, options }, index) => (
						<QuestionContainer
							question={question}
							options={options}
							index={index}
						/>
					))}
				</Container>
				<Button
					onClick={handleNavigateToHome}
					variant="contained"
					sx={{
						mt: 2,
						mx: "auto",
						display: "flex",
					}}
				>
					Go Back Home
				</Button>
			</Box>
		</>
	);
};

export { Results };
