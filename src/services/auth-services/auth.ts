import { uninterceptedAxiosInstance } from "unintercepted-axios/axios";

type signupData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type loginData = {
	email: string;
	password: string;
};

const signupService = (data: signupData) =>
	uninterceptedAxiosInstance.post("https://quizardry-server.herokuapp.com/api/auth/signup", {
		data,
	});

const loginService = (data: loginData) =>
	uninterceptedAxiosInstance.post(
		"https://quizardry-server.herokuapp.com/api/auth/login",
		{
			data,
		}
	);

export { signupService, loginService };
