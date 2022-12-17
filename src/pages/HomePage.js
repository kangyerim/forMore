import { useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import { authService } from "../firebase";
import { useDispatch } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = authenActions.currentUser;

	useEffect(() => {
		if (!currentUser) {
			const sessionUserInfo = sessionStorage.getItem(`firebase:authUser:${process.env.REACT_APP_APIKEY}:[DEFAULT]`);
			const userInfo = JSON.parse(sessionUserInfo);

			dispatch(authenActions.logIn(userInfo));
		}
	}, []);

	const logOutHandler = async () => {
		await dispatch(authenActions.logOut());
		await signOut(authService);

		console.log("Sign-out successful");
		navigate("/");
	};

	return (
		<>
			<h1>HomePage</h1>
			<nav>
				<Link to="/home/mypage">마이페이지</Link>
			</nav>
			<div>
				<button
					className="w-20 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
					onClick={logOutHandler}
				>
					로그아웃
				</button>
			</div>
			<Routes>
				<Route path="mypage" element={<MyPage />} />
			</Routes>
		</>
	);
};

export default HomePage;
