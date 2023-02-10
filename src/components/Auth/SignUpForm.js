import { useRef, useState } from "react";
import useRegularExp from "../../hooks/UseRegularExp";

const SignUpForm = ({ onEnteredData }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const nickNameInputRef = useRef();
	const { isEmailAddressForm, isEightCharacterLess, isSafetyPasswordForm } = useRegularExp();

	const [emailValidError, setEmailValidError] = useState("");
	const [passwordValidError, setPasswordValidError] = useState("");
	const [nickNameValidError, setNickNameValidError] = useState("");
	const [checkBoxInputContentList, setCheckBoxInputContentList] = useState([
		{ id: "checkAllAgreement", text: " 모두 동의합니다.", isChecked: false, isBoldText: false },
		{ id: "orderThan14", text: " 만 14세 이상입니다.", isChecked: false, isBoldText: false },
		{ id: "agreeTermsOfUse", text: " 서비스 이용약관 동의", isChecked: false, isBoldText: true },
		{ id: "collectionOfPersonalInfo", text: " 개인정보 수집 및 서비스 활용 동의", isChecked: false, isBoldText: true },
	]);

	const checkValidation = (event) => {
		const value = event.target.value;
		const targetID = event.target.id;

		let result = false;
		switch (targetID) {
			case "email":
				result = isEmailAddressForm(value);
				setEmailValidError(result);
				break;
			case "nickName":
				result = isEightCharacterLess(value);
				setNickNameValidError(result);
				break;
			case "password":
				result = isSafetyPasswordForm(value);
				setPasswordValidError(result);
				break;
		}
	};

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
		const emailValid = 1 > emailValidError.length ? true : false;
		const nickNameValid = 1 > nickNameValidError.length ? true : false;
		const passwordValid = 1 > passwordValidError.length ? true : false;
		const validCheckBox = checkBoxInputContentList.every((input) => input.isChecked);

		// true : 잠김 , false : 풀림
		return !(validCheckBox && emailValid && nickNameValid && passwordValid);
	};

	return (
		<>
			<h1 className="font-semibold text-xl font-black my-2">회원가입</h1>
			<form onSubmit={onSubmitHandler}>
				<div>
					<input
						type="text"
						id="nickName"
						placeholder="닉네임"
						className={`w-80 h-10 border-2 border-slate-300 rounded-md mb-2 ${
							nickNameValidError ? "border-red-500" : ""
						}`}
						ref={nickNameInputRef}
						onChange={checkValidation}
						required
					/>
					{nickNameValidError && <p className="text-xs text-red-400">{nickNameValidError}</p>}
				</div>
				<div>
					<input
						type="email"
						id="email"
						placeholder="이메일"
						className={`w-80 h-10 border-2 border-slate-300 rounded-md mb-2 ${emailValidError ? "border-red-500" : ""}`}
						ref={emailInputRef}
						onChange={checkValidation}
						required
					/>
					{emailValidError && <p className="text-xs text-red-400">{emailValidError}</p>}
				</div>
				<div>
					<input
						type="password"
						id="password"
						placeholder="비밀번호"
						className={`w-80 h-10 border-2 border-slate-300 rounded-md mb-2 ${
							passwordValidError ? "border-red-500" : ""
						} `}
						ref={passwordInputRef}
						onChange={checkValidation}
						required
					/>
					{passwordValidError && <p className="text-xs text-red-400">{passwordValidError}</p>}
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
