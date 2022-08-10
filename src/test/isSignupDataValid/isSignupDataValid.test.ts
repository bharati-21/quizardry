import { isSignupDataValid } from "../../utils/isSignupDataValid";
import {
	invalidDataMinLength,
	invalidDataPattern,
	validData,
} from "../mock-data/isSignupDataValid";

const setFormDataError = jest.fn();

const {
	email: emailInvalidMinLen,
	password: passwordInvalidMinLen,
	firstName: firstNameInvalidMinLen,
	lastName: lastNameInvalidMinLen,
} = invalidDataMinLength;

const {
	email: emailInvalidPattern,
	password: passwordInvalidPattern,
	firstName: firstNameInvalidPattern,
	lastName: lastNameInvalidPattern,
} = invalidDataPattern;

const { email, password, firstName, lastName } = validData;

test("isSignupDataValid: should return false for data with invalid length", () => {
	expect(
		isSignupDataValid(
			emailInvalidMinLen,
			passwordInvalidMinLen,
			setFormDataError,
			firstNameInvalidMinLen,
			lastNameInvalidMinLen
		)
	).toBeFalsy();
});

test("isSignupDataValid: should return false for data with invalid pattern", () => {
	expect(
		isSignupDataValid(
			emailInvalidPattern,
			passwordInvalidPattern,
			setFormDataError,
			firstNameInvalidPattern,
			lastNameInvalidPattern
		)
	).toBeFalsy();
});

test("isSignupDataValid: should return true for data that is valid", () => {
	expect(
		isSignupDataValid(
			email,
			password,
			setFormDataError,
			firstName,
			lastName
		)
	).toBeTruthy();
});
