import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenActions } from "../store/authenSlice";
import MyPage from "../pages/Auth/MyPage";
import useUserAuth from "../hooks/UseUserAuth";
import TimerPage from "./Timer/TimerPage";
import useUserCollection from "../hooks/useUserCollection";
import useTodosCollection from "../hooks/useTodosCollection";

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
			<div className="h-14 flex justify-between items-center">
				<h1 className="text-2xl font-bold mx-4" onClick={goHome}>
					forMore( )
				</h1>
				<div>
					<Link to="/home/mypage" className="mx-4">
						내 정보
					</Link>
					<button onClick={requestLogout} className="mx-4">
						로그아웃
					</button>
				</div>
			</div>

			<Routes>
				<Route path="timer" element={<TimerPage />} />
				<Route path="mypage" element={<MyPage />} />
			</Routes>

			{/* {todoList &&
				todoList.map((todo, index) => {
					return (
						<div key={todo.uid}>
							<span>{todo.title}</span>
							<span>
								{todo.focusTime} / {todo.restTime}
							</span>
						</div>
					);
				})} */}
		</>
	);
};

export default HomePage;
