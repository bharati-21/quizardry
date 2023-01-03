import axios from "axios";

const getCategoriesService = (token: string) =>
	axios.get(`${process.env.REACT_APP_API_URL}/api/categories`, {
		headers: { authorization: token },
	});

const getCategoryItemsService = (token: string, categoryId: string) =>
	axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`, {
		headers: { authorization: token },
	});

export { getCategoriesService, getCategoryItemsService };
