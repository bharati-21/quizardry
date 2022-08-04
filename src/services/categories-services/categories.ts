import axios from "axios";

const getCategoriesService = (token: string) =>
	axios.get("http://localhost:5000/api/categories", {
		headers: { authorization: token },
	});

export { getCategoriesService };
