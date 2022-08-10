export const invalidDataMinLength = {
	email: "test.com",
	password: "test",
	firstName: "t",
	lastName: "t",
	setFormDataError: jest.fn(),
};

export const invalidDataPattern = {
	email: "test.com",
	password: "invalidpassworRd",
	firstName: "invalid-7847fname",
	lastName: "lname.invalid.!!",
	setFormDataError: jest.fn(),
};

export const validData = {
	email: "test@test.com",
	password: "test!Admin123",
	firstName: "Admin",
	lastName: "Test",
	setFormDataError: jest.fn(),
};
