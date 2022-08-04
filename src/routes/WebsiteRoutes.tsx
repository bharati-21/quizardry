import { Login, LandingPage, Signup } from "pages";
import { Route, Routes } from "react-router-dom";
import { NavRoutesWithNavbar } from "./NavRoutesWithNavbar";

const WebsiteRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<NavRoutesWithNavbar />}>
				<Route path="/" element={<LandingPage />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	);
};

export { WebsiteRoutes };
