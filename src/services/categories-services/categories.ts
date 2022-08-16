import axios from "axios";

const getCategoriesService = (token: string) =>
	axios.get("https://quizardry-server.herokuapp.com/api/categories", {
		headers: { authorization: token },
	});

const getCategoryItemsService = (token: string, categoryId: string) =>
	axios.get(`https://quizardry-server.herokuapp.com/api/categories/${categoryId}`, {
		headers: { authorization: token },
	});

export { getCategoriesService, getCategoryItemsService };
