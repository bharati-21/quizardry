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
	uninterceptedAxiosInstance.post(
		`${process.env.REACT_APP_API_URL}/api/auth/signup`,
		{
			data,
		}
	);

const loginService = (data: loginData) =>
	uninterceptedAxiosInstance.post(
		`${process.env.REACT_APP_API_URL}/api/auth/login`,
		{
			data,
		}
	);

export { signupService, loginService };
