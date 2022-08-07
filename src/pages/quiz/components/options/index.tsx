import React from "react";
import { Radio, RadioGroup, FormControlLabel, useTheme } from "@mui/material";

import { useQuiz } from "contexts";
import { quizActionTypes } from "actionTypes";

const Options = () => {
	const {
		quizDispatch,
		quizState: { currentQuestionNumber, questions, selectedOptions },
	} = useQuiz();
	const theme = useTheme();

	const selectedQuestion = questions[currentQuestionNumber];
	const selectedOption = selectedOptions[currentQuestionNumber];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { SET_SELECTED_OPTION } = quizActionTypes;
		const [option, _id] = e.target.value.split("_");
		const selectedOption = {
			option,
			_id,
		};

		quizDispatch({
			type: SET_SELECTED_OPTION,
			payload: {
				questionNumber: currentQuestionNumber,
				selectedOption,
			},
		});
	};

	return (
		<RadioGroup
			aria-labelledby="question-option-radio-group"
			name="question-option-radio-group"
			onChange={handleChange}
			sx={{ gap: 2 }}
		>
			{selectedQuestion.options.map(({ option, _id }) => {
				return (
					<FormControlLabel
						value={`${option}_${_id}`}
						control={<Radio />}
						label={option}
						sx={{
							bgcolor:
								option === selectedOption?.option
									? theme.palette.primary.main
									: "inherit",
							color:
								option === selectedOption?.option
									? theme.palette.primary.contrastText
									: "inherit",
							px: 2,
							py: 0.75,
							borderRadius: "3px",
							width: "100%",
							m: 0,
							border: `.115rem solid ${theme.palette.primary.main}`,
							"&:hover": {
								backgroundColor: theme.palette.primary.light,
								color: theme.palette.primary.contrastText,
							},
						}}
						key={_id}
						className="question-option"
					/>
				);
			})}
		</RadioGroup>
	);
};

export { Options };
