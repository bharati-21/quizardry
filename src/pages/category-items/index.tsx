import React, { useCallback, useEffect, useState } from "react";
import {
	Avatar,
	Button,
	IconButton,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material/";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useQuiz, useQuizFormModal } from "contexts";
import {
	deleteItemFromQuizService,
	getCategoryItemsService,
	getQuizService,
} from "services";
import toast from "react-hot-toast";
import loader from "images/loader.svg";
import { quizActionTypes, quizFormModalActionTypes } from "actionTypes";
import { constants } from "appConstants";
import { Container } from "@mui/system";
import { Delete } from "@mui/icons-material";

const CategoryItems = () => {
	type CategoryItems = {
		loading: boolean;
		items: Array<any>;
		error: string | null;
	};

	const { categoryId } = useParams();
	const {
		authState: {
			authToken,
			authUser: { userId },
		},
	} = useAuth();
	const { quizDispatch } = useQuiz();
	const navigate = useNavigate();
	const theme = useTheme();
	const { UNAUTHORIZED } = constants;
	const {
		quizFormModalDispatch,
		quizFormModalState: { refetchQuiz },
	} = useQuizFormModal();

	const [categoryItems, setCategoryItems] = useState<CategoryItems>({
		loading: true,
		items: [],
		error: null,
	});
	const [isOngoingNetworkCall, setIsOngoingNetworkCall] = useState(false);

	const { loading, items, error } = categoryItems;
	const { SET_LOADING_ERROR, SET_QUESTION_DATA } = quizActionTypes;
	const { SET_MODAL_STATE, RESET_MODAL_STATE } = quizFormModalActionTypes;

	const fetchCategoryItems = useCallback(async () => {
		try {
			const {
				data: { items },
			} = await getCategoryItemsService(
				authToken as string,
				categoryId as string
			);
			setCategoryItems((prevCategoryItems) => ({
				...prevCategoryItems,
				loading: false,
				items,
				error: null,
			}));
		} catch (error: any) {
			setCategoryItems((prevCategoryItems) => ({
				...prevCategoryItems,
				loading: false,
				error: "Failed to fetch items for the selected category.",
			}));

			if (error.response.status === UNAUTHORIZED) {
				return;
			}

			toast.error(
				"Could not fetch items for the selected category. Please try again later."
			);
		}
	}, [categoryId, authToken, UNAUTHORIZED]);

	useEffect(() => {
		if (refetchQuiz) {
			fetchCategoryItems();
			quizFormModalDispatch({
				type: RESET_MODAL_STATE,
			});
		}
	}, [
		refetchQuiz,
		fetchCategoryItems,
		quizFormModalDispatch,
		RESET_MODAL_STATE,
	]);

	useEffect(() => {
		if (categoryId && authToken) {
			fetchCategoryItems();
		}
	}, [categoryId, authToken, fetchCategoryItems]);

	const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownLg = useMediaQuery(theme.breakpoints.down("md"));

	const getAvatarText = (name: string) =>
		name
			.split(" ")
			.map((word) => word.substring(0, 1))
			.slice(0, 3)
			.join("");

	const handleQuizSelected = async (quizId: string) => {
		quizDispatch({
			type: SET_LOADING_ERROR,
			payload: {
				quizDataLoading: true,
				quizDataError: null,
			},
		});

		try {
			const {
				data: {
					quiz: { _id, ...otherQuizData },
				},
			} = await getQuizService(authToken as string, quizId);
			quizDispatch({
				type: SET_QUESTION_DATA,
				payload: {
					quizId: _id,
					...otherQuizData,
					quizDataLoading: false,
					quizDataError: null,
				},
			});
			navigate("/rules");
		} catch (error: any) {
			quizDispatch({
				type: SET_LOADING_ERROR,
				payload: {
					quizDataLoading: false,
					quizDataError:
						"Could not fetch quiz data. Please try again later",
				},
			});
			toast.error("Could not fetch quiz data. Please try again later.");
		}
	};

	const handleCreateNewQuizClicked = () => {
		quizFormModalDispatch({
			type: SET_MODAL_STATE,
			payload: {
				category: {
					categoryId,
					categoryName: items[0].category.categoryName,
				},
				modalIsOpen: true,
			},
		});
	};

	const handleDeleteQuiz = async (quizId: string) => {
		const confirmation = window.confirm(
			"Are you sure you want to delete this quiz?"
		);
		if (!confirmation) {
			return;
		}
		setIsOngoingNetworkCall(true);
		setCategoryItems((prevCategoryItems) => ({
			...prevCategoryItems,
			loading: true,
		}));
		try {
			const {
				data: { quizzes },
			} = await deleteItemFromQuizService(authToken as string, quizId);
			setCategoryItems((prevCategoryItems) => ({
				...prevCategoryItems,
				loading: false,
				items: quizzes.filter(
					(quiz: any) => quiz.category.categoryId === categoryId
				),
			}));
			toast.success("Deleted quiz successfully!");
		} catch (error) {
			setIsOngoingNetworkCall(false);
			toast.error("Failed to delete quiz. Please try again later.");
		}
	};

	return (
		<>
			{loading ? (
				<img src={loader} alt="Loading..." />
			) : error ? (
				<Typography variant="h4">{error}</Typography>
			) : items && items.length ? (
				<ImageList
					sx={{
						p: 2,
						mx: "auto",
						maxWidth: "1080px",
						width: "100%",
						height: "100%",
						placeItems: "center",
						gap: "1rem !important",
					}}
					cols={matchDownMd ? 1 : matchDownLg ? 2 : 3}
					className="category-list"
				>
					<Container
						sx={{
							gridColumn: "1/ -1",
							mb: 2,
							placeSelf: "start",
							width: "100%",
							p: "0 !important",
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 0.5,
						}}
					>
						<Button variant="outlined" sx={{ fontWeight: "bold" }}>
							<Link to="/home" className="button-link">
								Go Back
							</Link>
						</Button>
						<Button
							variant="contained"
							onClick={handleCreateNewQuizClicked}
						>
							Create New Quiz
						</Button>
					</Container>
					{items.map(
						({ _id, quizName, quizImgUrl, creatorUserId }) => (
							<ImageListItem
								key={_id}
								className="category-list-item"
								sx={{
									width: "100%",
									gap: "1rem",
									bgcolor: theme.palette.secondary.light,
									color: theme.palette.secondary.contrastText,
									padding: "0.75rem",
									height: "100%!important",
								}}
							>
								{quizImgUrl ? (
									<img
										src={`${quizImgUrl}`}
										alt={quizName}
										loading="lazy"
									/>
								) : (
									<Avatar
										sx={{
											bgcolor:
												theme.palette.secondary.light,
											color: theme.palette.secondary
												.contrastText,
											width: "100%",
											height: "12rem",
											fontWeight: 700,
											fontSize: "4rem",
										}}
										variant="square"
									>
										{creatorUserId === userId ? (
											<IconButton
												onClick={() =>
													handleDeleteQuiz(_id)
												}
												sx={{
													position: "absolute",
													top: "0.25rem",
													right: "0.25rem",
													padding: "0 !important",
												}}
												disabled={isOngoingNetworkCall}
											>
												<Delete />
											</IconButton>
										) : null}
										{getAvatarText(quizName)}
									</Avatar>
								)}
								<ImageListItemBar
									title={quizName}
									position="below"
									sx={{
										width: "100%",
										px: 0,
										pt: 1,
										alignItems: "flex-start",
										gap: "0.5rem",
										flexWrap: "wrap",
										fontweight: "bold",
										bgColor: "inherit",
										borderTop: `1px solid ${theme.palette.dark.main}`,
									}}
									actionIcon={
										<Button
											variant="contained"
											sx={{
												borderRadius: "0",
											}}
											onClick={() =>
												handleQuizSelected(_id)
											}
										>
											Take Quiz
										</Button>
									}
								/>
							</ImageListItem>
						)
					)}
				</ImageList>
			) : (
				<Typography variant="h4">
					No quizzes found for the selected category!
				</Typography>
			)}
		</>
	);
};

export { CategoryItems };
