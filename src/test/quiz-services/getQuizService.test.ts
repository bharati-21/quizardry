import axios from "axios";
import { getQuizService } from "services";
import { items } from "../mock-data/categoryItemsData";

jest.mock("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const quizId = "q1";

const response = {
	data: {
		message: "Quiz",
		quiz: items,
	},
};

describe("Quiz service API call", () => {
	describe("Positive test", () => {
		beforeEach(() => {
			(axios.get as jest.Mock).mockResolvedValue(response);
		});

		it("Should return the correct response", async () => {
			const {
				data: { quiz },
			} = await getQuizService(token, quizId);

			expect(quiz).toHaveLength(1);
			expect(quiz).toEqual(items);
			expect(quiz[0]).toHaveProperty("questions");
			expect(quiz[0]).toHaveProperty("category");
		});
		it("Should call the correct API service", async () => {
			await getQuizService(token, quizId);
			expect(axios.get).toBeCalledWith(
				`http://localhost:5000/api/quizzes/${quizId}`,
				{ headers: { authorization: token } }
			);
		});
	});
	describe("Negaive test", () => {
		it("Should return the error with message: 404 Selected quiz id not found.", async () => {
			(axios.get as jest.Mock).mockRejectedValue({
				message: "404 Selected quiz id not found.",
			});

			expect.assertions(1);
			await expect(getQuizService(token, "")).rejects.toStrictEqual({
				message: "404 Selected quiz id not found.",
			});
		});

		it("Should return the error with message: 401: Authorization error. Invalid token.", async () => {
			(axios.get as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
			expect.assertions(1);
			await expect(getQuizService(token, "")).rejects.toStrictEqual({
				message: "401 Authorization Error! Invalid token.",
			});
		});
	});
});
