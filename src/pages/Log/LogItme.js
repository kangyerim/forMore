const LogItem = ({ uid, todoName, time, logTime, mode }) => {
	const formattedLogTime = (payload) => {
		const logTimedate = payload.toDate();
		return logTimedate.toLocaleString();
	};

	const formattedTimerTime = (timerTime) => {
		let result = timerTime;

		const min = 60;
		const hour = 3600;

		if (min > timerTime) return (result = `${timerTime}초`);
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
			<div className="h-16 border-b-black border-b-2 p-2">
				<div className="flex justify-between align-middle">
					<span className="text-lg font-semibold">{todoName}</span>
					<div className="inline">
						{mode === "focus" ? (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4 inline"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
									/>
								</svg>
							</>
						) : (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4 inline"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
									/>
								</svg>
							</>
						)}

						<span>{formattedTimerTime(time)}</span>
					</div>
				</div>

				<div className="text-sm text-right"> {formattedLogTime(logTime)}</div>
			</div>
		</>
	);
};

export default LogItem;
