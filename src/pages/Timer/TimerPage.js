import TimerForm from "../../components/Timer/TimerForm";

const TimerPage = () => {
	const handleClickedAction = (action, { currentTitle, currentTagColor, currentFocusTime, currentRestTime }) => {
		if (action === "cancel") {
		} else {
			console.log("SAVE THIS DATA", currentTitle, currentTagColor, currentFocusTime, currentRestTime);
		}
	};
	return (
		<>
			<TimerForm emitClickedAction={handleClickedAction}></TimerForm>
		</>
	);
};

export default TimerPage;
