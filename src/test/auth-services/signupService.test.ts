import { signupService } from "services";
import { uninterceptedAxiosInstance } from "unintercepted-axios/axios";

jest.mock("unintercepted-axios/axios");

const user = {
	email: "test@test.com",
	firstName: "Test",
	lastName: "Admin",
	totalScore: 0,
	userId: "62f0de9494abaaf25f6a54e5",
	quizAttempts: [],
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
};

const response = {
	data: {
		message: "Signup successful",
		user,
	},
};

describe("Signup service API calls", () => {
	const userSignupData = {
		email: "test@test.com",
		password: "pass@123Word",
		firstName: "Test",
		lastName: "Admin",
	};

	describe("Positive Test", () => {
		beforeEach(() => {
			(uninterceptedAxiosInstance.post as jest.Mock).mockResolvedValue(
				response
			);
		});

		it("Should call endpoint with given email & password", async () => {
			await signupService(userSignupData);
			expect(uninterceptedAxiosInstance.post).toBeCalledWith(
				"http://localhost:5000/api/auth/signup",
				{ data: userSignupData }
			);
		});

		it("Should get response as an object with keys: message and user", async () => {
			const {
				data: { user: userResponse, message },
			} = await signupService(userSignupData);
			expect(userResponse).toEqual(user);
			expect(message).toMatch("Signup successful");
		});
	});

	describe("Negative Test", () => {
		beforeEach(() => {
			(uninterceptedAxiosInstance.post as jest.Mock).mockRejectedValue({
				message: "User already exists with same email",
			});
		});

		it("Should reject with with message, User already exists with same email", async () => {
			expect.assertions(1);
			await expect(signupService(userSignupData)).rejects.toStrictEqual({
				message: "User already exists with same email",
			});
		});
	});
});
