import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTodosCollection from "../../hooks/useTodosCollection";
import TimerPage from "./TimerPage";

const TodoList = () => {
	const { getTodoList } = useTodosCollection();
	const userInfo = useSelector((state) => state.authenSlice);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		if (userInfo.email) {
			getTodoList().then((result) => {
				setTodoList(() => {
					return [...result, { title: "+", color: "grey", uid: String(new Date()) }];
				});
			});
		}
	}, [userInfo]);

	return (
		<>
			<div className="flex items-center">
				{todoList &&
					todoList.map((todo, index) => {
						return index === 0 ? (
							<div className={`w-4/5 h-screen bg-${todo.color}-200 flex justify-center relative`} key={todo.uid}>
								<h1 className="h-fit top-3 text-2xl font-bold align-middle absolute ">{todo.title}</h1>
								<div className="absolute top-20">
									<TimerPage />
								</div>
							</div>
						) : (
							<div className={`w-20 h-screen bg-${todo.color}-200 flex items-center justify-center`} key={todo.uid}>
								<h1 className="text-2xl font-bold align-middle whitespace-nowrap -rotate-90">{todo.title}</h1>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default TodoList;
