const LogItem = ({ uid, todoName, time, logTime, mode }) => {
	const formattedLogTime = (payload) => {
		const logTimedate = payload.toDate();
		return logTimedate.toLocaleString();
	};

	const formattedTimerTime = (timerTime) => {
		let result = timerTime;

		const min = 60;
		const hour = 3600;

		if (min > timerTime) return result;
		if (hour > timerTime) {
			let timerMin = Math.floor(timerTime / min);
			result = `${timerMin}분`;
		}
		if (timerTime > hour) {
		}

		return result;
	};

	return (
		<>
			<div className="h-16">
				<span className="text-lg font-black">{todoName}</span> <span>{mode}</span>
				<span>{formattedTimerTime(time)}</span>
				<div className="text-sm"> {formattedLogTime(logTime)}</div>
			</div>
		</>
	);
};

export default LogItem;
