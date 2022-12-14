import { useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import { authService } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authen);
	const auth = getAuth();
	const currentUser = auth.currentUser;

	useEffect(() => {
		if (currentUser) {
			console.log("currentUser   >>> ", currentUser);
		} else {
			console.log("nooooo", localStorage.getItem("UID"));
			const test = getAuth().getUser(localStorage.getItem("UID"));
			console.log(test);
		}
	}, []);
	const { email, displayName } = userInfo;

	const logOutHandler = async () => {
		await dispatch(authenActions.logOut());
		await signOut(authService);

		console.log("Sign-out successful");
		navigate("/");
	};

	const navigeteToMyPage = () => {
		navigate("/mypage");
	};

	return (
		<>
			<h1>HomePage</h1>
			<nav>
				<Link to="mypage">마이페이지</Link>
			</nav>
			<div>
				<button
					className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
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
