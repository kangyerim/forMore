import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTodosCollection from "../../hooks/useTodosCollection";
import TimerPage from "./TimerPage";

const TodoList = () => {
	const { getTodoList } = useTodosCollection();
	const userInfo = useSelector((state) => state.authenSlice);
	const [todoList, setTodoList] = useState([]);
	const [isUpdateMode, setUpdateMode] = useState(true);
	const [action, setAction] = useState("");

	useEffect(() => {
		if (userInfo.email) {
			getTodoList().then((result) => {
				setTodoList(() => {
					return [...result, { title: "+", color: "grey", uid: String(new Date()) }];
				});
			});
		}
	}, [userInfo]);

	const changeOrder = (event, index) => {
		const textContent = event.target.textContent;
		if (textContent === "+") {
			setAction(() => {
				return "create";
			});
			const temp = todoList.splice(0, todoList.length - 1);
			setTodoList(() => {
				return [{ title: "", focusTime: 25, restTime: 5, uid: String(new Date()) }, ...temp];
			});

			return setUpdateMode(() => {
				return !isUpdateMode;
			});
		}
		let currentList = todoList.splice(0, todoList.length - 1);

		let front = currentList.splice(index, currentList.length);
		let back = currentList.splice(0, index);
		setTodoList(() => {
			return [...front, ...back, { title: "+", color: "grey", uid: String(new Date()) }];
		});
	};

	const changeMode = () => {
		setUpdateMode(() => {
			return !isUpdateMode;
		});
	};

	return (
		<>
			<div className="flex items-center">
				{todoList &&
					todoList.map((todo, index) => {
						return index === 0 ? (
							<div className={`w-4/5 z-10 h-screen bg-${todo.color}-200 flex relative`} key={todo.uid}>
								{isUpdateMode ? (
									<>
										{" "}
										<h1 className="h-fit top-20 text-7xl font-bold align-middle absolute ">{todo.title}</h1>
										<div className="absolute bottom-20">
											<span className="text-9xl font-bold"> {todo.focusTime}/</span>
											<span className="text-9xl font-bold">{todo.restTime}</span>
											<button className="underline" onClick={changeMode}>
												수정
											</button>
										</div>
									</>
								) : (
									<TimerPage todo={todo} isUpdateMode={isUpdateMode} action={action} onCancel={changeMode} />
								)}
							</div>
						) : (
							<div className={`w-20 h-screen bg-${todo.color}-200 flex items-center justify-center`} key={todo.uid}>
								<h1
									className="text-2xl font-bold align-middle whitespace-nowrap -rotate-90"
									onClick={(e) => changeOrder(e, index)}
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
