import React, { useEffect, useState } from "react";
import {
	Avatar,
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material/";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth, useQuiz } from "contexts";
import { getCategoryItemsService, getQuizService } from "services";
import toast from "react-hot-toast";
import loader from "images/loader.svg";
import { quizActionTypes } from "actionTypes";
import { constants } from "appConstants";

const CategoryItems = () => {
	type CategoryItems = {
		loading: boolean;
		items: Array<any>;
		error: string | null;
	};

	const { categoryId } = useParams();
	const {
		auth: { authToken },
	} = useAuth();
	const { quizDispatch } = useQuiz();
	const navigate = useNavigate();
	const theme = useTheme();
	const { UNAUTHORIZED } = constants;

	const [categoryItems, setCategoryItems] = useState<CategoryItems>({
		loading: true,
		items: [],
		error: null,
	});

	const { loading, items, error } = categoryItems;
	const { SET_LOADING_ERROR, SET_QUESTION_DATA } = quizActionTypes;

	useEffect(() => {
		if (categoryId && authToken) {
			(async () => {
				try {
					const {
						data: { items },
					} = await getCategoryItemsService(authToken, categoryId);
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
			})();
		}
	}, [categoryId, authToken, UNAUTHORIZED]);

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
					}}
					cols={matchDownMd ? 1 : matchDownLg ? 2 : 3}
					className="category-list"
				>
					<Button
						variant="contained"
						sx={{ gridColumn: "1/ -1", mb: 2, placeSelf: "start" }}
					>
						<Link to="/home" className="button-link">
							Go Back
						</Link>
					</Button>
					{items.map(({ _id, quizName, quizImgUrl }) => (
						<ImageListItem
							key={_id}
							className="category-list-item"
							sx={{
								width: "100%",
								gap: "1rem",
								bgcolor: theme.palette.secondary.light,
								color: theme.palette.secondary.contrastText,
								padding: "0.75rem",
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
										bgcolor: theme.palette.secondary.light,
										color: theme.palette.secondary
											.contrastText,
										width: "100%",
										height: "12rem",
										fontWeight: 700,
										fontSize: "4rem",
									}}
									variant="square"
								>
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
										onClick={() => handleQuizSelected(_id)}
									>
										Take Quiz
									</Button>
								}
							/>
						</ImageListItem>
					))}
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
