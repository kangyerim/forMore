import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import useTodosCollection from "../../hooks/useTodosCollection";
import TimerPage from "./TodoPage";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/UseModal";

const TodoList = () => {
	const { getTodoList, deleteTodo } = useTodosCollection();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authenSlice);
	const [todoList, setTodoList] = useState([]);
	const [isUpdateMode, setUpdateMode] = useState(true);
	const [action, setAction] = useState("");
	const { showModal, modalTitle, modalBody, buttonAction, useCancelButton, openModal, closeModal } = useModal();

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

	const changeMode = (action) => {
		setAction(() => {
			return action;
		});

		if (action != "delete") {
			setUpdateMode(() => {
				return !isUpdateMode;
			});
		} else {
			openModal(`타이머 삭제`, "삭제하시겠습니까?", "삭제", true);
		}

		if (action === "start") {
			const { focusTime: focus, restTime: rest, title } = todoList[0];
			navigate(`/home/timer/${title}/${focus}/${rest}`);
		}
	};

	const handleClickedAction = (requestedAction, result) => {
		if (result) {
		} else {
		}
		setTimeout(() => {
			navigate(0);
		}, 1000);
	};

	const emitModalButtonAction = async (runOrNot) => {
		if (runOrNot) {
			const result = await deleteTodo(todoList[0].uid);
			closeModal(0);
			navigate(0);
		} else {
			closeModal(0);
		}
	};

	return (
		<>
			{showModal && (
				<Modal
					title={modalTitle}
					body={modalBody}
					onHandleSubmit={buttonAction}
					onHandleCancel={useCancelButton}
					emitModalButtonAction={emitModalButtonAction}
				></Modal>
			)}
			<div className="flex items-center">
				{todoList &&
					todoList.map((todo, index) => {
						return index === 0 ? (
							<div className={`w-4/5 h-screen bg-red-200 flex relative`} key={todo.uid}>
								{isUpdateMode ? (
									<>
										<div className="absolute top-20">
											<h1 className="h-fit text-7xl font-bold inline-grid">{todo.title}</h1>
											<button className="underline" onClick={() => changeMode("start")}>
												시작하기
											</button>
										</div>

										<div className="absolute bottom-20">
											<span className="text-9xl font-bold"> {todo.focusTime}/</span>
											<span className="text-9xl font-bold">{todo.restTime}</span>
											<button className="underline" onClick={() => changeMode("update")}>
												수정
											</button>
											/
											<button className="underline" onClick={() => changeMode("delete")}>
												삭제
											</button>
										</div>
									</>
								) : (
									<TimerPage todo={todo} action={action} onCancel={changeMode} test={handleClickedAction} />
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
