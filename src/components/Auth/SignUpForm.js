import { useRef } from "react";

const SignUpForm = ({ onEnteredData }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const nickNameInputRef = useRef();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const currentEmail = emailInputRef.current.value;
		const currentPassword = passwordInputRef.current.value;
		const currentNickName = nickNameInputRef.current.value;

		onEnteredData({ email: currentEmail, password: currentPassword, nickName: currentNickName });
	};

	return (
		<>
			<h1 className="font-semibold text-xl font-black my-2">회원가입</h1>
			<form onSubmit={onSubmitHandler}>
				<div>
					<input
						type="text"
						id="nickName"
						placeholder="   닉네임"
						className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
						ref={nickNameInputRef}
						required
					/>
				</div>
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
				</div>

				<button className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">회원가입</button>
			</form>
		</>
	);
};

export default SignUpForm;
