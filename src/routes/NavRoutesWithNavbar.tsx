import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "components";

const NavRoutesWithNavbar = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export { NavRoutesWithNavbar };
