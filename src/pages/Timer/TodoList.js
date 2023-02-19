import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTodosCollection from "../../hooks/useTodosCollection";
import TimerPage from "./TimerPage";

const TodoList = () => {
	const { getTodoList } = useTodosCollection();
	const userInfo = useSelector((state) => state.authenSlice);
	const [clickedTodo, setClickedTodo] = useState({});
	const [todoList, setTodoList] = useState([]);
	const [isUpdateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		if (userInfo.email) {
			getTodoList().then((result) => {
				const firstTodo = result[0];
				setClickedTodo(() => {
					return { ...firstTodo };
				});
				const restTodoList = result.splice(1, result.length);
				setTodoList(() => {
					return [...restTodoList, { title: "+", color: "grey", uid: String(new Date()) }];
				});
			});
		}
	}, [userInfo]);

	const changeOrder = (event, index) => {
		console.log("˚₊·—̳͟͞͞♡  event, index", event, index);
		// let currentList = todoList.splice(0, todoList.length - 1);

		// let front = currentList.splice(index, currentList.length);
		// let back = currentList.splice(0, index);

		// setTodoList(() => {
		// 	return [...front, ...back, { title: "+", color: "grey", uid: String(new Date()) }];
		// });
	};

	const changeMode = () => {
		console.log("˚₊·—̳͟͞͞♡  changeMode");
	};

	return (
		<>
			<div className="flex items-center">
				<div className={`w-4/5 h-screen bg-${clickedTodo.color}-200 flex justify-center relative`}>
					<h1 className="h-fit top-3 text-2xl font-bold align-middle absolute ">{clickedTodo.title}</h1>
					<div className="absolute top-20">
						<div>
							<button onClick={changeMode}>수정</button>
						</div>
						<TimerPage todo={clickedTodo} />
						<div>
							<span className="text-2xl font-bold"> {clickedTodo.focusTime}/</span>
							<span className="text-2xl font-bold">{clickedTodo.restTime}</span>
						</div>
					</div>
				</div>

				{todoList.map((todo, todoIndex) => {
					return (
						<div className={`w-20 h-screen bg-${todo.color}-200 flex items-center justify-center`} key={todoIndex}>
							<h1
								className="text-2xl font-bold align-middle whitespace-nowrap -rotate-90"
								onClick={(e) => changeOrder(e, todoIndex)}
							>
								{todo.title}
							</h1>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default TodoList;
