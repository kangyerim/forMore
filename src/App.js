import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authen);

	useEffect(() => {
		if (userInfo.uid) {
			console.log(userInfo.displayName + " 로그인 상태 입니다.");
			navigate("/home");
		}
	}, [userInfo]);

	const onRouteToLogin = () => {
		navigate("/login");
	};

	const onRouteToSignUp = () => {
		navigate("/sign_up");
	};

	return (
		<>
			<div className="grid grid-cols-1 justify-items-center my-80">
				<h1 className="text-3xl font-bold pb-4">뽀모어()에 오신 것을 환영합니다!!</h1>
				<button className="w-96 h-10 border-2 border-slate-300 rounded-lg mb-2" onClick={onRouteToLogin}>
					뽀모어() 계정으로 시작하기
				</button>
				<div>
					<span className="text-sm font-light">아직 계정이 없으신가요? </span>
					<button className="text-sm font-medium" onClick={onRouteToSignUp}>
						회원가입 하기
					</button>
				</div>
			</div>
		</>
	);
};

export default App;
