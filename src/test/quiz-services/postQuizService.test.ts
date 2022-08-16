import axios from "axios";
import { postItemToQuizService } from "services";
import { items, item } from "../mock-data/categoryItemsData";

jest.mock("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const response = {
	data: {
		message: "Created new quiz successfully!",
		quizzes: items,
	},
};

describe("Post new quiz item service API call", () => {
	describe("Positive test", () => {
		beforeEach(() => {
			(axios.post as jest.Mock).mockResolvedValue(response);
		});

		it("Should return the correct response", async () => {
			const {
				data: { quizzes },
			} = await postItemToQuizService(token, item);

			expect(quizzes).toHaveLength(1);
			expect(quizzes).toEqual(items);
			expect(quizzes[0]).toHaveProperty("questions");
			expect(quizzes[0]).toHaveProperty("category");
		});
		it("Should call the correct API service", async () => {
			await postItemToQuizService(token, item);
			expect(axios.post).toBeCalledWith(
				`https://quizardry-server.herokuapp.com/api/quizzes`,
				{ quiz: item },
				{ headers: { authorization: token } }
			);
		});
	});
	describe("Negaive test", () => {
		it("Should return the error with message: 401: Authorization error. Invalid token.", async () => {
			(axios.post as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
			expect.assertions(1);
			await expect(postItemToQuizService("", item)).rejects.toStrictEqual(
				{
					message: "401 Authorization Error! Invalid token.",
				}
			);
		});
	});
});
