import React, { useEffect } from "react";
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { constants } from "appConstants";
import { useQuiz } from "contexts";
import { ChevronRight } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { quizActionTypes } from "actionTypes";

const Rules = () => {
	const { RULES } = constants;
	const theme = useTheme();
	const {
		quizState: {
			quizName,
			quizId,
			category: { categoryName },
		},
		quizDispatch,
	} = useQuiz();
	const navigate = useNavigate();
	const { START_QUIZ } = quizActionTypes;

	const mappedRules = RULES.map((rule: string, index: number) => (
		<ListItem disableGutters alignItems="flex-start" key={index}>
			<ListItemIcon sx={{ minWidth: "40px" }}>
				<ChevronRight />
			</ListItemIcon>
			<ListItemText primary={rule} />
		</ListItem>
	));

	useEffect(() => {
		if (!quizId || !quizName) navigate("/home", { replace: true });
	}, [navigate, quizName, quizId]);

	useEffect(() => {
		quizDispatch({ type: START_QUIZ });
	}, [quizDispatch, START_QUIZ]);

	return (
		<Box>
			<Box
				sx={{
					minHeight: "100%",
					justifyContent: "center",
					alignItems: "center",
					maxWidth: "500px",
					mx: "auto",
					width: "100%",
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box sx={{ py: 1, px: 2 }}>
					<Typography
						variant="h4"
						sx={{ fontWeight: "bold" }}
						color={theme.palette.primary.main}
					>
						Rules
					</Typography>
					<Typography
						color={theme.palette.primary.dark}
						variant="h6"
					>{`${categoryName}: ${quizName}`}</Typography>
				</Box>
				<List
					sx={{
						px: 2,
						py: 1,
						borderTop: `1px solid ${theme.palette.divider}`,
						width: "100%",
						maxWidth: 960,
						bgcolor: "background.paper",
					}}
				>
					{mappedRules}
				</List>
			</Box>
			<Button
				variant="contained"
				sx={{ mx: "auto", mt: 2, display: "flex" }}
			>
				<Link to={`/quizzes/${quizId}`} className="button-link">
					Start Quiz
				</Link>
			</Button>
		</Box>
	);
};

export { Rules };
