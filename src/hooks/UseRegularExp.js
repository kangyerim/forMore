const useRegularExp = () => {
	const isEmailAddressForm = (inputValue) => {
		const emailRegExp =
			/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

		return emailRegExp.test(inputValue) ? "" : "이메일 형식으로 작성해주세요.";
	};

	const isSafetyPasswordForm = (inputValue) => {
		const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

		return passwordRegExp.test(inputValue)
			? ""
			: "최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자로 작성해주세요.";
	};

	const hasSpecialChracters = (inputValue) => {};

	const isEightCharacterLess = (inputValue) => {
		return 8 >= inputValue.length ? "" : "8글자 이하로 작성해주세요.";
	};

	return { isEmailAddressForm, isSafetyPasswordForm, hasSpecialChracters, isEightCharacterLess };
};

export default useRegularExp;
