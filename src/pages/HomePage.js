import { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";
import useUserAuth from "../hooks/UseUserAuth";
import TimerPage from "./Timer/TimerPage";
import useUserCollection from "../hooks/useUserCollection";
import useTodosCollection from "../hooks/useTodosCollection";

const HomePage = () => {
	const dispatch = useDispatch();
	const currentUser = authenActions.currentUser;
	const { requestLogout } = useUserAuth();
	const { updateUserDocument } = useUserCollection();
	const { getTodoList } = useTodosCollection();
	const userInfo = useSelector((state) => state.authenSlice);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		if (userInfo.email) {
			updateUserDocument();

			getTodoList().then((result) => {
				setTodoList(() => {
					return [...result];
				});
			});
		}
	}, [userInfo]);

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
					<Link to="/home/timer">타이머만들기</Link>
				</nav>
				<div>
					<button onClick={requestLogout}>로그아웃</button>
				</div>
			</div>

			<Routes>
				<Route path="timer" element={<TimerPage />} />
				<Route path="mypage" element={<MyPage />} />
			</Routes>

			{todoList &&
				todoList.map((todo, index) => {
					return (
						<div key={todo.uid}>
							<span>{todo.title}</span>
							<span>
								{todo.focusTime} / {todo.restTime}
							</span>
						</div>
					);
				})}
		</>
	);
};

export default HomePage;
