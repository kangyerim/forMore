import useTodosCollection from "../../hooks/useTodosCollection";
import TimerTest from "../../components/Timer/TimerTest";

const TimerPage = ({ todo, action, onCancel, test }) => {
	const { createTodo, updateTodo, deleteTodo } = useTodosCollection();

	const handleClickedAction = async (
		requestedAction,
		{ uniqueID, currentTitle: title, currentTagColor: color, currentFocusTime: focusTime, currentRestTime: restTime }
	) => {
		if (requestedAction === "cancel") {
			onCancel();
		} else if (requestedAction === "create") {
			const response = await createTodo({ title, color, focusTime, restTime, id: new Date() });
			test(requestedAction, response);
		} else if (requestedAction === "update") {
			const response = await updateTodo(uniqueID, { title, color, focusTime, restTime });
			test(requestedAction, response);
		} else if (requestedAction === "delete") {
			const response = await deleteTodo();
			test(requestedAction, response);
		}
	};
	return (
		<>
			<TimerTest todo={todo} action={action} emitClickedAction={handleClickedAction}></TimerTest>
		</>
	);
};

export default TimerPage;
