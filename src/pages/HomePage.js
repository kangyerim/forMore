import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import { useSelector } from "react-redux";

const HomePage = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authen);

	const { email } = userInfo;

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

	return (
		<>
			<span>HomePage</span>
			<span>{email}</span>
			<button onClick={logOutHandler}>로그아웃</button>
		</>
	);
};

export default HomePage;
