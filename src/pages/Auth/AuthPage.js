import AuthForm from "../../components/Auth/AuthForm";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../../hooks/UseUserAuth";

const AuthPage = () => {
	const navigate = useNavigate();
	const { requestLogin } = useUserAuth();

	const onEnteredDataHandler = (enteredData) => {
		const { email, password, cookieLogin } = enteredData;

		if (cookieLogin) {
			// 브라우저에 쿠키 구워넣기
		} else if (!cookieLogin) {
			// 브라우저에 쿠키 지우기
		}

		if (email && password) {
			requestLogin(email, password);
		}
	};

	const onRouteToSignUp = () => {
		navigate("/sign_up");
	};

	return (
		<>
			<div className="grid grid-cols-1 justify-items-center my-60">
				<AuthForm onEnteredData={onEnteredDataHandler} />
				<span className="text-sm my-2">
					아직 계정이 없으신가요?{" "}
					<b className="hover:cursor-pointer" onClick={onRouteToSignUp}>
						회원가입
					</b>
				</span>
			</div>
		</>
	);
};

export default AuthPage;
