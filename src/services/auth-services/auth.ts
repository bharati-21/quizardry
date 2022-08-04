import axios from "axios";

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
	axios.post("http://localhost:5000/api/auth/signup", {
		data,
	});

const loginService = (data: loginData) =>
	axios.post("http://localhost:5000/api/auth/login", {
		data,
	});

export { signupService, loginService };
