import { useRef, useState, useEffect } from "react";

const SignUpForm = ({ onEnteredData }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const nickNameInputRef = useRef();

	const [checkBoxInputContentList, setCheckBoxInputContentList] = useState([
		{ id: "checkAllAgreement", text: " 모두 동의합니다.", isChecked: false, isBoldText: false },
		{ id: "orderThan14", text: " 만 14세 이상입니다.", isChecked: false, isBoldText: false },
		{ id: "agreeTermsOfUse", text: " 서비스 이용약관 동의", isChecked: false, isBoldText: true },
		{ id: "collectionOfPersonalInfo", text: " 개인정보 수집 및 서비스 활용 동의", isChecked: false, isBoldText: true },
	]);

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const currentEmail = emailInputRef.current.value;
		const currentPassword = passwordInputRef.current.value;
		const currentNickName = nickNameInputRef.current.value;

		onEnteredData({ email: currentEmail, password: currentPassword, nickName: currentNickName });
	};

	const onCheckboxHandler = (index) => {
		let updatedCheckBoxes = [];
		if (index === 0) {
			const temp = checkBoxInputContentList.map((context) => {
				context.isChecked = !context.isChecked;
				return context;
			});
			updatedCheckBoxes.push(...temp);
		} else {
			const temp = checkBoxInputContentList.map((context, idx) => {
				if (index === idx) context.isChecked = !context.isChecked;
				if (!context.isChecked) checkBoxInputContentList[0].isChecked = false;
				return context;
			});
			updatedCheckBoxes.push(...temp);
		}

		let checkedCnt = 0;
		updatedCheckBoxes.forEach((context, idx) => {
			if (idx > 0 && context.isChecked) checkedCnt++;
		});

		if (checkedCnt === 3) {
			updatedCheckBoxes[0].isChecked = true;
		} else if (1 > checkedCnt) {
			updatedCheckBoxes[0].isChecked = false;
		}

		setCheckBoxInputContentList(updatedCheckBoxes);
	};

	const isEnableToSignUp = () => {
		return !checkBoxInputContentList.every((input) => input.isChecked);
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
				<div>
					<ul>
						{checkBoxInputContentList.map(({ id, text, isChecked, isBoldText }, index) => {
							return (
								<li key={index}>
									<input type="checkbox" id={id} checked={isChecked} onChange={() => onCheckboxHandler(index)} />
									<label htmlFor={id}>{text}</label>
								</li>
							);
						})}
					</ul>
				</div>

				<button
					className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black disabled:opacity-30"
					disabled={isEnableToSignUp()}
				>
					회원가입
				</button>
			</form>
		</>
	);
};

export default SignUpForm;
