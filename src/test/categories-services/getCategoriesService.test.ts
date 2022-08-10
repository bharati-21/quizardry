import axios from "axios";
import { getCategoriesService } from "services";

jest.mock("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const categories = [
	{
		_id: "62c1bd17b5c2501ec7ebb2c1",
		category: "TV Shows",
		categoryImgUrl:
			"https://res.cloudinary.com/dylkclyom/image/upload/v1659700338/category_tv_shows_qabtzh.jpg",
		description: "How great are your TV show pop culture references?",
	},
];

const response = {
	data: {
		categories,
		message: "Categories",
	},
};

describe("Categories service API call", () => {
	describe("Positive test", () => {
		beforeEach(() => {
			(axios.get as jest.Mock).mockResolvedValue(response);
		});
		it("Should return the correct response", async () => {
			const {
				data: { categories: categoriesResponse },
			} = await getCategoriesService(token);
			expect(categories).toHaveLength(1);
			expect(categories).toEqual(categoriesResponse);
		});
		it("Should call the correct API service", async () => {
			await getCategoriesService(token);
			expect(axios.get).toBeCalledWith(
				"http://localhost:5000/api/categories",
				{
					headers: {
						authorization: token,
					},
				}
			);
		});
		it("Should call the correct API service once", async () => {
			await getCategoriesService(token);
			expect(axios.get).toHaveBeenCalled();
		});
	});

	describe("Negaive test", () => {
		beforeEach(() => {
			(axios.get as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
		});

		it("Should return the error with message: 401: Authorization error. Invalid token.", async () => {
			expect.assertions(1);
			await expect(getCategoriesService("")).rejects.toStrictEqual({
				message: "401 Authorization Error! Invalid token.",
			});
		});
	});
});
