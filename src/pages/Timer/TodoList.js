import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTodosCollection from "../../hooks/useTodosCollection";

const TodoList = () => {
	const { getTodoList } = useTodosCollection();
	const userInfo = useSelector((state) => state.authenSlice);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		if (userInfo.email) {
			getTodoList().then((result) => {
				setTodoList(() => {
					return [...result];
				});
			});
		}
	}, [userInfo]);

	return (
		<>
			<div className="flex items-center">
				{todoList &&
					todoList.map((todo, index) => {
						return (
							<div className="h-screen bg-slate-200" key={todo.uid}>
								<span>{todo.title}</span>
								<span>
									{todo.focusTime} / {todo.restTime}
								</span>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default TodoList;
