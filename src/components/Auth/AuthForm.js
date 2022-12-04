import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authenActions } from "../../store/authenSlice";

const AuthForm = ({ onEnteredData }) => {
	const [isLoginMode, setisLoginMode] = useState(true);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const cookieLoginRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const switchAuthModeHandler = () => {
		setisLoginMode((prevState) => !prevState);
	};

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

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const currentEmail = emailInputRef.current.value;
		const currentPassword = passwordInputRef.current.value;
		const currentCookieLogin = cookieLoginRef.current.checked;

		onEnteredData({ email: currentEmail, password: currentPassword, cookieLogin: currentCookieLogin });
	};

	return (
		<>
			<h1 className="font-semibold text-xl font-black my-2">로그인</h1>
			<form onSubmit={onSubmitHandler}>
				<div>
					<input
						type="email"
						id="email"
						placeholder="   이메일"
						className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
						ref={emailInputRef}
						required
					/>
				</div>
				<div>
					<input
						type="password"
						id="password"
						placeholder="   비밀번호"
						className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
						ref={passwordInputRef}
						required
					/>
				</div>{" "}
				<div>
					<input
						type="checkbox"
						id="wantCookieLogin"
						name="wantCookieLogin"
						className="text-sm"
						ref={cookieLoginRef}
					></input>
					<label htmlFor="wantCookieLogin" className="text-sm">
						{" "}
						자동 로그인
					</label>
				</div>
				<button className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">로그인</button>
			</form>
		</>
	);
};

export default AuthForm;
