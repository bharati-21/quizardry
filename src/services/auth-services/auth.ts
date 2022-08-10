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
	uninterceptedAxiosInstance.post("http://localhost:5000/api/auth/signup", {
		data,
	});

const loginService = (data: loginData) =>
	uninterceptedAxiosInstance.post("http://localhost:5000/api/auth/login", {
		data,
	});

export { signupService, loginService };
