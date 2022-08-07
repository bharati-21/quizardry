import {
	Login,
	LandingPage,
	Signup,
	Home,
	NotFound,
	CategoryItems,
	Rules,
	Quiz,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { NavRoutesWithNavbar } from "./NavRoutesWithNavbar";
import { ProtectedRoutes } from "./ProtectedRoutes";

const WebsiteRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<NavRoutesWithNavbar />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />} />
					<Route
						path="/categories/:categoryId"
						element={<CategoryItems />}
					/>
					<Route path="/rules" element={<Rules />} />
					<Route path="/quizzes/:quizId" element={<Quiz />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	);
};

export { WebsiteRoutes };
