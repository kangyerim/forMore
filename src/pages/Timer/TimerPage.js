import useTodosCollection from "../../hooks/useTodosCollection";
import TimerForm from "../../components/Timer/TimerForm";
import TimerTest from "../../components/Timer/TimerTest";

const TimerPage = ({ todo, action, onCancel }) => {
	const { createTodo, updateTodo, deleteTodo } = useTodosCollection();

	const handleClickedAction = (
		requestedAction,
		{ uniqueID, currentTitle: title, currentTagColor: color, currentFocusTime: focusTime, currentRestTime: restTime }
	) => {
		if (requestedAction === "cancel") {
			onCancel();
		} else if (requestedAction === "create") {
			createTodo({ title, color, focusTime, restTime, id: new Date() });
		} else if (requestedAction === "update") {
			updateTodo(uniqueID, { title, color, focusTime, restTime });
		} else if (requestedAction === "delete") {
			deleteTodo();
		}
	};
	return (
		<>
			{/* <TimerForm todo={todo} isUpdateMode={isUpdateMode} emitClickedAction={handleClickedAction}></TimerForm> */}
			<TimerTest todo={todo} action={action} emitClickedAction={handleClickedAction}></TimerTest>
		</>
	);
};

export default TimerPage;
