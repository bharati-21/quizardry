import React, { FC } from "react";
import {
	Typography,
	FormControl,
	useTheme,
	FormLabel,
	RadioGroup,
	Grid,
} from "@mui/material";
import { useQuiz } from "contexts";
import { Option, QuestionContainerPropsType } from "types";
import { OptionsContainer } from "../options-container";

const QuestionContainer: FC<QuestionContainerPropsType> = ({
	question,
	options,
	index,
}) => {
	const {
		quizState: { selectedOptions },
	} = useQuiz();
	const theme = useTheme();

	const correctOption = options.find((option: Option) => option.isCorrect);
	const score = correctOption?._id === selectedOptions[index]?._id ? 10 : 0;

	return (
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
			<FormLabel
				id="question-text"
				sx={{
					fontSize: "1.25rem",
					fontWeight: "bold",
				}}
			>
				{`${index + 1}. ${question}`}
				<Grid
					width={"100%"}
					container
					mt={1}
					flexWrap="wrap"
					justifyContent="space-between"
					sx={{
						"@media(max-width: 640px)": {
							flexDirection: "column",
						},
					}}
				>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2">
							{!selectedOptions[index]?._id
								? "You did not select any option"
								: null}
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						sx={{
							"@media(max-width: 640px)": {
								textAlign: "left",
							},
						}}
						textAlign="right"
					>
						<Typography variant="body2">
							Score: {score}/10
						</Typography>
					</Grid>
				</Grid>
			</FormLabel>

			<RadioGroup
				aria-labelledby="question-option-radio-group"
				name="question-option-radio-group"
				sx={{ gap: 2 }}
			>
				{options.map(({ option, _id, isCorrect }) => (
					<OptionsContainer
						option={option}
						_id={_id}
						isCorrect={isCorrect}
						index={index}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export { QuestionContainer };
