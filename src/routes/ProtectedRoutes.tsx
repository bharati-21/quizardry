import { useAuth } from "contexts";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
	const {
		authState: { isAuth, authToken },
	} = useAuth();
	const location = useLocation();

	return isAuth && authToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location.pathname }} replace />
	);
};

export { ProtectedRoutes };
