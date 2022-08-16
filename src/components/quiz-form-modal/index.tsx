import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Modal,
	Button,
	FormControl,
	useTheme,
	TextField,
	Select,
	InputLabel,
	MenuItem,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAuth, useQuizFormModal } from "contexts";
import { quizFormModalActionTypes } from "actionTypes";
import { postItemToQuizService } from "services";
import { useLocation } from "react-router-dom";
import { ModalQuestion } from "types";
import { useStyles } from "styles/useStyles";

const QuizFormModal = () => {
	const theme = useTheme();
	const {
		authState: {
			authToken,
			authUser: { userId },
		},
	} = useAuth();
	const {
		quizFormModalState: { category, modalIsOpen },
		quizFormModalDispatch,
	} = useQuizFormModal();
	const { quizFormModalFormButtonStyles, quizFormModalFormStyle } =
		useStyles();
	const location = useLocation();
	const { SET_MODAL_STATE, RESET_MODAL_STATE } = quizFormModalActionTypes;

	const [questionNumber, setQuestionNumber] = useState(1);
	const [quizName, setQuizName] = useState("");
	const [quizData, setQuizData] = useState<ModalQuestion[]>([]);
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState<string[]>(new Array(4).fill(""));
	const [correctOption, setCorrectOption] = useState<number>(0);

	const handleClose = () =>
		quizFormModalDispatch({
			type: SET_MODAL_STATE,
			payload: {
				modalIsOpen: false,
				category: null,
				refetchQuiz: true,
			},
		});

	useEffect(() => {
		if (modalIsOpen && !location.pathname.includes("/categories")) {
			quizFormModalDispatch({
				type: RESET_MODAL_STATE,
			});
		}
	}, [location, RESET_MODAL_STATE, quizFormModalDispatch, modalIsOpen]);

	const onOptionsInput = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		optionNumber: number
	) => {
		setOptions((prevOptions: string[]) => {
			const updatedOptions = prevOptions.slice();
			updatedOptions[optionNumber] = e.target.value;
			return updatedOptions;
		});
	};

	const handleChangeQuestion = async () => {
		if (!question.trim() || !options.every((option) => option.trim())) {
			toast.error("Please fill all the required fields.");
			return;
		}

		if (questionNumber === 10) {
			if (!quizName.trim()) {
				toast.error("Please enter name of the quiz.");
				return;
			}

			try {
				await postItemToQuizService(authToken as string, {
					questions: quizData,
					creatorUserId: userId,
					quizName,
					category,
				});
				handleClose();
				toast.success("Created and posted new quiz successfully!");
			} catch (error) {
				toast.error(
					"Could not create new quiz and post to server. Please try again later."
				);
			}
			return;
		}
		const nextQuestionNumber = questionNumber + 1;
		setQuestionNumber(nextQuestionNumber);

		setQuizData((prevQuizData: ModalQuestion[]) => [
			...prevQuizData,
			{
				question,
				options: options.map((option, index) => ({
					option,
					isCorrect: index === correctOption,
				})),
			},
		]);
		setQuestion("");
		setCorrectOption(0);
		setOptions(new Array(4).fill(""));
	};

	return (
		<div>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ m: 2 }}
				className="quiz-form-modal"
			>
				<Box sx={quizFormModalFormStyle}>
					<Box sx={{ mb: 3 }}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							Create Quiz
						</Typography>
						<Typography variant="body2" sx={{ mb: 1 }} color="gray">
							{category?.categoryName}
						</Typography>
						<TextField
							margin="none"
							required
							fullWidth
							label="Enter Quiz Name"
							value={quizName}
							onChange={(e) => setQuizName(e.target.value)}
						/>
					</Box>
					<FormControl
						sx={{
							width: "100%",
							border: `1px solid ${theme.palette.grey[500]}`,
							borderRadius: "3px",
							padding: "10px",
							gap: 2,
						}}
					>
						<Box sx={{ width: "100%" }}>
							<Typography id="modal-modal-title" variant="body1">
								Enter Question Text
							</Typography>
							<TextField
								margin="dense"
								required
								fullWidth
								label={`Question No. ${questionNumber}`}
								autoFocus
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
						</Box>
						<Box
							sx={{
								wdidth: "100%",
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
							}}
						>
							<Typography id="modal-modal-title" variant="body1">
								Enter Options Text
							</Typography>
							<TextField
								id="outlined-basic"
								sx={{ p: 0 }}
								value={options[0]}
								onChange={(e) => onOptionsInput(e, 0)}
								variant="outlined"
								label="Option A"
							/>
							<TextField
								id="outlined-basic"
								sx={{ p: 0 }}
								value={options[1]}
								onChange={(e) => onOptionsInput(e, 1)}
								variant="outlined"
								label="Option B"
							/>
							<TextField
								id="outlined-basic"
								sx={{ p: 0 }}
								value={options[2]}
								onChange={(e) => onOptionsInput(e, 2)}
								variant="outlined"
								label="Option C"
							/>
							<TextField
								id="outlined-basic"
								sx={{ p: 0 }}
								value={options[3]}
								onChange={(e) => onOptionsInput(e, 3)}
								variant="outlined"
								label="Option D"
							/>
						</Box>
						<Box
							sx={{
								wdidth: "100%",
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
							}}
						>
							<Typography id="modal-modal-title" variant="body1">
								Choose Correct Option
							</Typography>
							<FormControl>
								<InputLabel id="demo-simple-select-label">
									Correct Otption
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Correct Option"
									value={correctOption}
									onChange={(e) =>
										setCorrectOption(Number(e.target.value))
									}
								>
									<MenuItem value={0}>A</MenuItem>
									<MenuItem value={1}>B</MenuItem>
									<MenuItem value={2}>C</MenuItem>
									<MenuItem value={3}>D</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</FormControl>

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							gap: "0.5rem 1rem",
							justifyContent: "space-between",
							alignItems: "center",
							mt: 2,
							width: "100%",
						}}
					>
						<Button
							variant="outlined"
							type="submit"
							sx={quizFormModalFormButtonStyles}
							onClick={handleChangeQuestion}
						>
							{questionNumber === 10 ? "Submit" : "Next"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export { QuizFormModal };
