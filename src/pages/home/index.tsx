import React, { useEffect, useState } from "react";
import {
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useAuth } from "contexts";
import { getCategoriesService } from "services";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import loader from "images/loader.svg";
import { constants } from "appConstants";

const Home = () => {
	type Categories = {
		loading: boolean;
		error: string | null;
		category: Array<any>;
	};

	const {
		auth: { authToken },
	} = useAuth();
	const [categories, setCategories] = useState<Categories>({
		loading: true,
		error: null,
		category: [],
	});
	const theme = useTheme();
	const { UNAUTHORIZED } = constants;

	const { loading, error, category } = categories;

	useEffect(() => {
		if (authToken) {
			(async () => {
				try {
					const {
						data: { categories },
					} = await getCategoriesService(authToken as string);
					setCategories((prevCategories) => ({
						...prevCategories,
						loading: false,
						category: categories,
					}));
				} catch (error: any) {
					setCategories((prevCategories) => ({
						...prevCategories,
						loading: false,
						error: "Could not fetch categories.",
					}));
					if (error?.response?.status === UNAUTHORIZED) {
						return;
					} else {
						toast.error(
							"Could not fetch categories. Please try again later."
						);
					}
				}
			})();
		}
	}, [authToken, UNAUTHORIZED]);

	const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownLg = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			{loading ? (
				<img src={loader} alt="Loading..." />
			) : error ? (
				<Typography variant="h4">{error}</Typography>
			) : category && category?.length ? (
				<ImageList
					sx={{
						p: 2,
						mx: "auto",
						maxWidth: "1080px",
						width: "100%",
						placeItems: "center",
					}}
					cols={matchDownMd ? 1 : matchDownLg ? 2 : 3}
					className="category-list"
				>
					<Typography
						sx={{ gridColumn: "1/ -1", mb: 2, fontWeight: "700" }}
						variant="h4"
					>
						Categories
					</Typography>

					{category.map(
						({ categoryImgUrl, category, _id, description }) => (
							<ImageListItem key={_id}>
								<img
									src={`${categoryImgUrl}`}
									alt={category}
									loading="lazy"
								/>
								<ImageListItemBar
									title={category}
									subtitle={description}
									sx={{
										flexDirection: "column",
										width: "100%",
										alignItems: "flex-start",
										px: 0,
									}}
									actionIcon={
										<Button variant="contained">
											<Link
												to={`/categories/${_id}`}
												className="button-link"
											>
												View Category
											</Link>
										</Button>
									}
								/>
							</ImageListItem>
						)
					)}
				</ImageList>
			) : (
				<Typography
					sx={{ textAlign: "center", fontWeight: "700" }}
					variant="h4"
				>
					No Categories To Show!
				</Typography>
			)}
		</>
	);
};

export { Home };
