import React, { useState } from "react";
import {
	Typography,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Paper,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import timerImage from "images/sand_timer.jpg";
import { useStyles } from "styles/useStyles";
import { isSignupDataValid } from "utils";
import { signupService } from "services";
import toast from "react-hot-toast";

const Signup = () => {
	const { primaryLink, logoText } = useStyles();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [formDataError, setFormDataError] = useState({
		firstNameError: "",
		lastNameError: "",
		emailError: "",
		passwordError: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (
			!isSignupDataValid(
				email,
				password,
				setFormDataError,
				firstName,
				lastName
			)
		) {
			return;
		}
		try {
			await signupService(formData);
			toast.success("Sign up successful!");
			navigate("/login");
		} catch (error: any) {
			const status = error?.response?.status;
			if (status === 409) {
				toast.error("Signup failed. Email already in use.");
				return;
			}
			toast.error("Signup failed. Please try again later.");
		}
	};

	const handleFormDataChange = (event: React.ChangeEvent) => {
		const { name, value } = event.target as HTMLInputElement;

		if (name + "Error" !== "") {
			setFormDataError((prevFormDataError: any) => ({
				...prevFormDataError,
				[name + "Error"]: "",
			}));
		}

		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const togglePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const { firstName, lastName, email, password } = formData;
	const { firstNameError, lastNameError, emailError, passwordError } =
		formDataError;

	const isDisabled =
		!firstName ||
		!lastName ||
		!email ||
		!password ||
		firstNameError !== "" ||
		lastNameError !== "" ||
		emailError !== "" ||
		passwordError !== "";

	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${timerImage})`,
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h5"
						sx={{
							flexGrow: 1,
							...logoText,
							textAlign: "center",
							marginBottom: "1rem",
						}}
					>
						<Link to="/">Quizardry</Link>
					</Typography>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							error={firstNameError !== ""}
							helperText={firstNameError}
							margin="normal"
							required
							fullWidth
							id="firstName"
							label="First Name"
							name="firstName"
							autoFocus
							autoComplete="off"
							value={firstName}
							onChange={handleFormDataChange}
						/>
						<TextField
							error={lastNameError !== ""}
							helperText={lastNameError}
							margin="normal"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="off"
							value={lastName}
							onChange={handleFormDataChange}
						/>
						<TextField
							error={emailError !== ""}
							helperText={emailError}
							margin="normal"
							required
							fullWidth
							type="email"
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={email}
							onChange={handleFormDataChange}
						/>
						<TextField
							error={passwordError !== ""}
							helperText={passwordError}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={handleFormDataChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={togglePasswordVisibility}
										>
											{showPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmit}
							disabled={isDisabled}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login">
									<Typography
										variant="body2"
										sx={primaryLink}
									>
										Already have an account? Sign in
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export { Signup };
