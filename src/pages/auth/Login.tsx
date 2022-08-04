import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

import { useStyles } from "styles/useStyles";
import { isSignupDataValid } from "utils";
import { loginService } from "services";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
	const { primaryLink, logoText } = useStyles();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [formDataError, setFormDataError] = useState({
		emailError: "",
		passwordError: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (!isSignupDataValid(email, password, setFormDataError)) {
			return;
		}
		try {
			await loginService(formData);
			toast.success("Login successful!");
			navigate("/");
		} catch (error: any) {
			const status = error?.response?.status;
			if (status === 401) {
				toast.error("Login failed. Invalid credentials.");
				return;
			}
			toast.error("Login failed. Please try again later.");
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
						sx={{ mt: 3, mb: 2 }}
						onClick={handleSubmit}
						disabled={isDisabled}
					>
						Login
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
