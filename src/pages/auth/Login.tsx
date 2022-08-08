import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Container,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Link, To, useNavigate } from "react-router-dom";

import { useStyles } from "styles/useStyles";
import { isSignupDataValid } from "utils";
import { loginService } from "services";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "contexts";
import { authActionTypes } from "actionTypes";

const Login = () => {
	const { primaryLink, logoText } = useStyles();
	const navigate = useNavigate();
	const {
		authDispatch,
		authState: { isAuth },
	} = useAuth();

	useEffect(() => {
		if (isAuth) {
			navigate(-1 as To, { replace: true });
		}
	}, [isAuth, navigate]);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [formDataError, setFormDataError] = useState({
		emailError: "",
		passwordError: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const { SET_AUTH } = authActionTypes;

	const callLoginService = async (formData: any) => {
		try {
			const {
				data: {
					user: { token, ...otherUserDetails },
				},
			} = await loginService(formData);
			console.log(otherUserDetails);
			authDispatch({
				type: SET_AUTH,
				payload: {
					authToken: token,
					authUser: otherUserDetails,
					isAuth: true,
				},
			});

			localStorage.setItem("quizardry-auth-token", token);
			localStorage.setItem(
				"quizardry-auth-user",
				JSON.stringify(otherUserDetails)
			);

			toast.success("Login successful!");
			navigate("/home", { replace: true });
		} catch (error: any) {
			toast.error("Login failed. Please try again later.");
		}
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (!isSignupDataValid(email, password, setFormDataError)) {
			return;
		}
		callLoginService(formData);
	};

	const handleFillGuesDetails = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		setFormDataError({
			emailError: "",
			passwordError: "",
		});

		const formDataWithGuestCredentials = {
			email: process.env.REACT_APP_GUEST_EMAIL || "",
			password: process.env.REACT_APP_GUEST_PASSWORD || "",
		};

		callLoginService(formDataWithGuestCredentials);
		setFormData(formDataWithGuestCredentials);
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

	const { email, password } = formData;
	const { emailError, passwordError } = formDataError;

	const togglePasswordVisibility = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const isDisabled =
		!email || !password || emailError !== "" || passwordError !== "";

	return (
		<Container
			component="main"
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
			maxWidth="xs"
		>
			<CssBaseline />
			<Box
				sx={{
					isplay: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: 3,
					borderRadius: "2px",
					boxShadow: `0 0 5px rgba(0, 0, 0, 0.2)`,
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
				<Typography
					component="h1"
					sx={{
						textAlign: "center",
					}}
					variant="h5"
				>
					Login
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
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
						autoFocus
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
						sx={{ mt: 3 }}
						onClick={handleSubmit}
						disabled={isDisabled}
					>
						Login
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="outlined"
						sx={{ mt: 1, mb: 2 }}
						onClick={handleFillGuesDetails}
					>
						Login with Guest Credentials
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/signup">
								<Typography variant="body2" sx={primaryLink}>
									New User? Signup
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export { Login };
