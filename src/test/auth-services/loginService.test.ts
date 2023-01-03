import { loginService } from "services";
import { uninterceptedAxiosInstance } from "unintercepted-axios/axios";

jest.mock("unintercepted-axios/axios");

const user = {
	email: "test@test.com",
	firstName: "Jane",
	lastName: "Doe",
	totalScore: 0,
	userId: "62f0de9494abaaf25f6a54e5",
	quizAttempts: [],
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
};

const response = {
	message: "Login successful",
	user,
};

describe("Login service API call", () => {
	const email = "test@test.com";
	const password = "pass@123Word";

	describe("Positive test", () => {
		beforeEach(() => {
			(uninterceptedAxiosInstance.post as jest.Mock).mockResolvedValue(
				response
			);
		});

		it("Should call endpoint with given email & password", async () => {
			await loginService({ email, password });
			expect(uninterceptedAxiosInstance.post).toBeCalledWith(
				`${process.env.REACT_APP_API_URL}/api/auth/login`,
				{ data: { email, password } }
			);
		});

		it("Should get response as an object with keys: message and user", async () => {
			const data = await loginService({ email, password });
			expect(data).toHaveProperty("message");
			expect(data).toHaveProperty("user");
		});
	});

	describe("Negative Test", () => {
		beforeEach(() => {
			(uninterceptedAxiosInstance.post as jest.Mock).mockRejectedValue({
				message:
					"Invalid credentials. Could not find and existing user",
			});
		});
		it("Should reject with with message, Invalid credentials. Could not find and existing user", async () => {
			expect.assertions(1);
			await expect(
				loginService({
					email,
					password,
				})
			).rejects.toStrictEqual({
				message:
					"Invalid credentials. Could not find and existing user",
			});
		});
	});
});
