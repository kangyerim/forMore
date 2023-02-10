import useTodosCollection from "../../hooks/useTodosCollection";
import TimerForm from "../../components/Timer/TimerForm";

const TimerPage = () => {
	const { createTodo, updateTodo, deleteTodo } = useTodosCollection();

	const handleClickedAction = (
		action,
		{ currentTitle: title, currentTagColor: color, currentFocusTime: focusTime, currentRestTime: restTime }
	) => {
		if (action === "cancel") {
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
			<TimerForm emitClickedAction={handleClickedAction}></TimerForm>
		</>
	);
};

export default TimerPage;
