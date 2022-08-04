type formData = {
	emailError: string;
	passwordError: string;
	firstNameError?: string;
	lastNameError?: string;
};

const isSignupDataValid = (
	email: string,
	password: string,
	setFormDataError: any,
	firstName?: string,
	lastName?: string
) => {
	let dataValid = true;

	const isMinPasswordLength = (password: string) =>
		password.trim().length >= 7;
	const isMinNameLength = (name: string) => name.trim().length >= 2;

	const isPasswordValid = (passwordValue: string) =>
		/^(?=.{7,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_*@#$%^&+=]).*$/.test(
			passwordValue
		);
	const isNameValid = (name: string) => /^[A-Za-z]{2,20}$/.test(name);

	const isEmailValid = (email: string) =>
		/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

	if (firstName) {
		if (!isMinNameLength(firstName)) {
			setFormDataError((prevFormData: formData) => ({
				...prevFormData,
				firstNameError: "First name should have at least 2 characters.",
			}));
			dataValid = false;
		} else if (!isNameValid(firstName)) {
			setFormDataError((prevFormData: formData) => ({
				...prevFormData,
				firstNameError: "First name should only contain letters.",
			}));
			dataValid = false;
		}
	}

	if (lastName) {
		if (!isMinNameLength(lastName)) {
			setFormDataError((prevFormData: formData) => ({
				...prevFormData,
				lastNameError: "Last name should have at least 2 characters.",
			}));
			dataValid = false;
		} else if (!isNameValid(lastName)) {
			setFormDataError((prevFormData: formData) => ({
				...prevFormData,
				lastNameError: "First name should only contain letters.",
			}));
			dataValid = false;
		}
	}

	if (!isEmailValid(email)) {
		setFormDataError((prevFormData: formData) => ({
			...prevFormData,
			emailError:
				"Invalid email. Email should be of the following format: test@gmail.com",
		}));
		dataValid = false;
	}

	if (!isMinPasswordLength(password)) {
		setFormDataError((prevFormData: formData) => ({
			...prevFormData,
			passwordError: "Password should contain at least 7 characters.",
		}));
		dataValid = false;
	} else if (!isPasswordValid(password)) {
		setFormDataError((prevFormData: formData) => ({
			...prevFormData,
			passwordError:
				"Invalid password. Password should contain at least 1 uppercase, lowercase, number and special character.",
		}));
		dataValid = false;
	}
	return dataValid;
};

export { isSignupDataValid };
