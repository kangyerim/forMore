import { useEffect } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";
import useUserAuth from "../hooks/userAuthHook";

const HomePage = () => {
	const dispatch = useDispatch();
	const currentUser = authenActions.currentUser;
	const { requestLogout } = useUserAuth();

	useEffect(() => {
		if (!currentUser) {
			const sessionUserInfo = sessionStorage.getItem(`firebase:authUser:${process.env.REACT_APP_APIKEY}:[DEFAULT]`);
			const userInfo = JSON.parse(sessionUserInfo);

			dispatch(authenActions.logIn(userInfo));
		}
	}, []);

	return (
		<>
			<div className="grid grid-cols-3 justify-items-start">
				<h1>forMore( )</h1>
				<nav>
					<Link to="/home/mypage">마이페이지</Link>
				</nav>
				<div>
					<button onClick={requestLogout}>로그아웃</button>
				</div>
			</div>

			<Routes>
				<Route path="mypage" element={<MyPage />} />
			</Routes>
		</>
	);
};

export default HomePage;
