import useTodosCollection from "../../hooks/useTodosCollection";
import TimerForm from "../../components/Timer/TimerForm";
import TimerTest from "../../components/Timer/TimerTest";

const TimerPage = ({ todo, isUpdateMode, action, onCancel }) => {
	const { createTodo, updateTodo, deleteTodo } = useTodosCollection();

	const handleClickedAction = (
		action,
		{ currentTitle: title, currentTagColor: color, currentFocusTime: focusTime, currentRestTime: restTime }
	) => {
		if (action === "cancel") {
			onCancel();
		} else if (action === "create") {
			createTodo({ title, color, focusTime, restTime, id: new Date() });
		} else if (action === "update") {
			updateTodo();
		} else if (action === "delete") {
			deleteTodo();
		}
	};
	return (
		<>
			{/* <TimerForm todo={todo} isUpdateMode={isUpdateMode} emitClickedAction={handleClickedAction}></TimerForm> */}
			<TimerTest
				todo={todo}
				action={action}
				emitClickedAction={handleClickedAction}
				isUpdateMode={isUpdateMode}
			></TimerTest>
		</>
	);
};

export default TimerPage;
