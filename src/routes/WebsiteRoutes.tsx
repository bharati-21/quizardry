import { Signup } from "pages/auth/Signup";
import { Route, Routes } from "react-router-dom";

const WebsiteRoutes = () => {
	return (
		<Routes>
			<Route path="/signup" element={<Signup />} />
            <Route path="/login" />
		</Routes>
	);
};

export { WebsiteRoutes };
