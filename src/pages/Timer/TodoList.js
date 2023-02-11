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
					return [...result, { title: "더하기", color: "grey" }];
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
							<>
								{" "}
								<div className={`w-4/5 h-screen bg-${todo.color}-200 flex justify-center`} key={todo.uid}>
									<h1 className="text-2xl font-bold align-middle ">{todo.title}</h1>
								</div>
							</>
						) : (
							<>
								<div className={`w-20 h-screen bg-${todo.color}-200 flex items-center justify-center`} key={todo.uid}>
									<h1 className="text-2xl font-bold align-middle whitespace-nowrap -rotate-90">{todo.title}</h1>
								</div>
							</>
						);
					})}
			</div>
		</>
	);
};

export default TodoList;
