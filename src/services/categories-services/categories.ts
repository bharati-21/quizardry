import axios from "axios";

const getCategoriesService = (token: string) =>
	axios.get("http://localhost:5000/api/categories", {
		headers: { authorization: token },
	});

const getCategoryItemsService = (token: string, categoryId: string) =>
	axios.get(`http://localhost:5000/api/categories/${categoryId}`, {
		headers: { authorization: token },
	});

export { getCategoriesService, getCategoryItemsService };
