import axios from "axios";
import { getCategoryItemsService } from "services";
import { items } from "../mock-data/categoryItemsData";

jest.mock("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const categoryId = "62c1bd17b5c2501ec7ebb2c1";

const response = {
	data: {
		items,
		message: "Items of selected category",
	},
};

describe("Categories service API call", () => {
	describe("Positive test", () => {
		beforeEach(() => {
			(axios.get as jest.Mock).mockResolvedValue(response);
		});

		it("Should return the correct response", async () => {
			const {
				data: { items: itemsResponse },
			} = await getCategoryItemsService(token, categoryId);

			expect(itemsResponse).toHaveLength(1);
			expect(itemsResponse).toEqual(items);
			expect(itemsResponse[0]).toHaveProperty("quizName");
			expect(itemsResponse[0]).toHaveProperty("category");
		});
		it("Should call the correct API service", async () => {
			await getCategoryItemsService(token, categoryId);
			expect(axios.get).toBeCalledWith(
				`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`,
				{ headers: { authorization: token } }
			);
		});
	});
	describe("Negaive test", () => {
		it("Should return the error with message: 404 Selected category not found.", async () => {
			(axios.get as jest.Mock).mockRejectedValue({
				message: "404 Selected category not found.",
			});

			expect.assertions(1);
			await expect(
				getCategoryItemsService(token, "")
			).rejects.toStrictEqual({
				message: "404 Selected category not found.",
			});
		});

		it("Should return the error with message: 401: Authorization error. Invalid token.", async () => {
			(axios.get as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
			expect.assertions(1);
			await expect(
				getCategoryItemsService(token, "")
			).rejects.toStrictEqual({
				message: "401 Authorization Error! Invalid token.",
			});
		});
	});
});
