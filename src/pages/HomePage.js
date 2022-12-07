import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import { useSelector } from "react-redux";

const HomePage = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authen);

	const { email, displayName } = userInfo;

	const logOutHandler = () => {
		signOut(authService)
			.then(() => {
				// Sign-out successful.
				console.log("Sign-out successful");
				navigate("/");
			})
			.catch((error) => {
				// An error happened.
				console.log("Sign-out error");
			});
	};

	const navigeteToMyPage = () => {
		navigate("/mypage");
	};

	return (
		<>
			<h1>HomePage</h1>
			<span onClick={navigeteToMyPage}>{email} 마이페이지</span>
			<div>
				<button
					className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
					onClick={logOutHandler}
				>
					로그아웃
				</button>
			</div>
		</>
	);
};

export default HomePage;
