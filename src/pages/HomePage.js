import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";
import useUserAuth from "../hooks/UseUserAuth";
import TimerPage from "./Timer/TimerPage";
import useUserCollection from "../hooks/useUserCollection";
import useTodosCollection from "../hooks/useTodosCollection";
import TodoList from "./Todo/TodoList";

const HomePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const goHome = () => {
		navigate("/home");
	};

	return (
		<>
			<div className="w-full h-14 z-10 flex justify-between items-center absolute ">
				<h1 className="text-2xl font-bold mx-4" onClick={goHome}>
					forMore( )
				</h1>
				<div>
					<Link to="/home/mypage" className="mx-4 font-bold">
						내 정보
					</Link>
					<button onClick={requestLogout} className="mx-4 font-bold">
						로그아웃
					</button>
				</div>
			</div>

			<Routes>
				<Route path="" element={<TodoList />} />
				<Route path="timer/:todo/:focus/:rest" element={<TimerPage />} />
				<Route path="mypage" element={<MyPage />} />
			</Routes>
		</>
	);
};

export default HomePage;
