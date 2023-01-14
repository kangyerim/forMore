import { useRef } from "react";

const AuthForm = ({ onEnteredData }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const cookieLoginRef = useRef();

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
						placeholder="이메일"
						className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
						ref={emailInputRef}
						required
					/>
				</div>
				<div>
					<input
						type="password"
						id="password"
						placeholder="비밀번호"
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
				<button type="submit" className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">
					로그인
				</button>
			</form>
		</>
	);
};

export default AuthForm;
