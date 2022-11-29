import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authenActions } from "../../store/authenSlice";

const AuthForm = () => {
	const [isLoginMode, setisLoginMode] = useState(true);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const switchAuthModeHandler = () => {
		setisLoginMode((prevState) => !prevState);
	};

	console.log(authenActions);
	const submitHandler = async (event) => {
		event.preventDefault();

		const currentEmail = emailInputRef.current.value;
		const currentPassword = passwordInputRef.current.value;

		if (isLoginMode) {
			await signInWithEmailAndPassword(authService, currentEmail, currentPassword)
				.then((UserCredentialImpl) => {
					const { user } = UserCredentialImpl;

					dispatch(authenActions.logIn(user));
					navigate("/home");
				})
				.catch((error) => {
					let errorMsg = "Authentiacation Failed!";
					if (error?.message) {
						errorMsg = error.message;
					}
					alert(errorMsg);
					emailInputRef.current.value = "";
					passwordInputRef.current.value = "";
				});
		} else {
			await createUserWithEmailAndPassword(authService, currentEmail, currentPassword)
				.then((UserCredentialImpl) => {
					alert("회원가입 성공");
				})
				.catch((error) => {
					let errorMsg = "Authentiacation Failed!";
					if (error?.message) {
						errorMsg = error.message;
					}
					alert(errorMsg);

					emailInputRef.current.value = "";
					passwordInputRef.current.value = "";
				});
		}
	};

	return (
		<section>
			<h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
			<form>
				<div>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" ref={emailInputRef} required />
				</div>
				<div>
					<label htmlFor="password">Your Password</label>
					<input type="password" id="password" ref={passwordInputRef} required />
				</div>
				<div>
					<button onClick={submitHandler}>{isLoginMode ? "Login" : "Create Account"}</button>
					<button type="button" onClick={switchAuthModeHandler}>
						{isLoginMode ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
