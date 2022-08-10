import axios from "axios";
import { updateUserQuizAttempt } from "services";

jest.mock("axios");

const user = {
	email: "test@test.com",
	firstName: "Jane",
	lastName: "Doe",
	totalScore: 0,
	userId: "62f0de9494abaaf25f6a54e5",
	quizAttempts: [],
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
	userId = "62f0de9494abaaf25f6a54e5";

const response = {
	data: {
		message: "Updated quiz attempt successfully",
		updatedData: user,
	},
};

describe("Users service API call", () => {
	const requestBody = {
		quizId: "q1",
		quizName: "Linux basic commands",
		category: {
			_id: "621231122a111bhgf836111",
			categoryId: "62c1bd17b5c2501ec7000004",
			categoryName: "Linux",
		},
		selectedOptions: [],
		totalScore: 0,
	};

	describe("Positive test", () => {
		beforeEach(() => {
			(axios.post as jest.Mock).mockResolvedValue(response);
		});

		it("Should return the correct response", async () => {
			const {
				data: { updatedData },
			} = await updateUserQuizAttempt(token, userId, requestBody);
			expect(updatedData).toEqual(user);
		});

		it("Should call the correct service API", async () => {
			await updateUserQuizAttempt(token, userId, requestBody);
			expect(axios.post as jest.Mock).toBeCalledWith(
				`http://localhost:5000/api/users/${userId}/quizAttempts`,
				{
					data: requestBody,
				},
				{ headers: { authorization: token } }
			);
		});
	});

	describe("Negative Test", () => {
		beforeEach(() => {
			(axios.post as jest.Mock).mockRejectedValue({
				message: "401 Authorization Error! Invalid token.",
			});
		});

		it("Should return the correct response", async () => {
			expect.assertions(1);
			await expect(
				updateUserQuizAttempt("", userId, requestBody)
			).rejects.toStrictEqual({
				message: "401 Authorization Error! Invalid token.",
			});
		});
	});
});
