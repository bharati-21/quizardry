import React, { FC } from "react";
import { useTheme, Radio, FormControlLabel } from "@mui/material";
import { useQuiz } from "contexts";
import { OptionsContainerPropsType } from "types";

const OptionsContainer: FC<OptionsContainerPropsType> = ({
	option,
	_id,
	isCorrect,
	index,
}) => {
	const {
		quizState: { selectedOptions },
	} = useQuiz();
	const theme = useTheme();

	return (
		<FormControlLabel
			value={`${option}_${_id}`}
			control={<Radio />}
			label={option}
			sx={{
				bgcolor: isCorrect
					? theme.palette.success.main
					: !isCorrect && selectedOptions[index]?._id === _id
					? theme.palette.error.main
					: "inherit",
				color: isCorrect
					? theme.palette.success.contrastText
					: !isCorrect && selectedOptions[index]?._id === _id
					? theme.palette.error.contrastText
					: "inherit",
				px: 2,
				py: 0.75,
				borderRadius: "3px",
				width: "100%",
				m: 0,
				border: `1px solid ${theme.palette.grey[500]}`,
				cursor: "default",
			}}
			key={_id}
			className="question-option"
		/>
	);
};

export { OptionsContainer };
