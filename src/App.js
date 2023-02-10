import { useNavigate } from "react-router-dom";

const App = () => {
	const navigate = useNavigate();

	const onRouteToLogin = () => {
		navigate("/login");
	};

	const onRouteToSignUp = () => {
		navigate("/sign_up");
	};

	return (
		<>
			<div className="grid grid-cols-1 justify-items-center my-80">
				<h1 className="text-3xl font-bold pb-4">forMore()에 오신 것을 환영합니다!!</h1>
				<button className="w-96 h-10 border-2 border-slate-300 rounded-lg mb-2" onClick={onRouteToLogin}>
					이메일로 시작하기
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
