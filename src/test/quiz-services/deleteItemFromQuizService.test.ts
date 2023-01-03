import axios from "axios";
import { deleteItemFromQuizService } from "services";

jest.mock("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const quizId = "62c2dc868276e7ba8f771f24";

const response = {
	data: {
		message: "Deleted quiz successfully!",
		quizzes: [],
	},
};

describe("Delete quiz item service API call", () => {
	describe("Positive test", () => {
		beforeEach(() => {
			(axios.delete as jest.Mock).mockResolvedValue(response);
		});

		it("Should return the correct response", async () => {
			const {
				data: { quizzes },
			} = await deleteItemFromQuizService(token, quizId);

			expect(quizzes).toHaveLength(0);
			expect(quizzes).toEqual([]);
		});
		it("Should call the correct API service", async () => {
			await deleteItemFromQuizService(token, quizId);
			expect(axios.delete).toBeCalledWith(
				`${process.env.REACT_APP_API_URL}/api/quizzes/${quizId}`,
				{ headers: { authorization: token } }
			);
		});
	});
	describe("Negaive test", () => {
		it("Should return the error with message: 404 Selected quiz id not found.", async () => {
			(axios.delete as jest.Mock).mockRejectedValue({
				message: "404 Selected quiz id not found.",
			});

			expect.assertions(1);
			await expect(
				deleteItemFromQuizService(token, "")
			).rejects.toStrictEqual({
				message: "404 Selected quiz id not found.",
			});
		});

		it("Should return the error with message: 401: Authorization error. Invalid token.", async () => {
			(axios.delete as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
			expect.assertions(1);
			await expect(
				deleteItemFromQuizService("", quizId)
			).rejects.toStrictEqual({
				message: "401 Authorization Error! Invalid token.",
			});
		});
	});
});
