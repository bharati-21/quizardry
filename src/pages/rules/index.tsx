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
import { ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Rules = () => {
	const { RULES } = constants;
	const theme = useTheme();

	const mappedRules = RULES.map((rule: string) => (
		<ListItem disableGutters alignItems="flex-start">
			<ListItemIcon sx={{ minWidth: "40px" }}>
				<ChevronRight />
			</ListItemIcon>
			<ListItemText primary={rule} />
		</ListItem>
	));

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
