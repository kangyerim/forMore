import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TimerPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [todoName, setTodoName] = useState("");
	const [focusTime, setFocusTime] = useState(-1);
	const [restTime, setRestTime] = useState(-1);
	const [mode, setMode] = useState("none"); // focus,rest,none
	let countDownInterval = useRef(null);

	useEffect(() => {
		if (params) {
			const { focus, rest, todo } = params;
			setFocusTime(() => focus * 60);
			setRestTime(() => rest * 60);
			setTodoName(() => todo);
		} else {
			handleBack();
		}
	}, []);

	const handleStart = () => {
		setMode(() => "focus");
		countDownInterval.current = setInterval(countDown, 1000);
	};

	const countDown = useCallback(() => {
		setFocusTime((preTime) => {
			if (preTime > 1) return preTime - 1;
			else return 0;
		});
	}, []);

	const handleStop = () => {
		clearInterval(countDownInterval.current);
	};

	const formatedTimeByMinSecond = (time) => {
		const timeByNumber = Number(time);
		let min = Math.floor(timeByNumber / 60);
		let second = 10 > timeByNumber % 60 ? `0${timeByNumber % 60}` : timeByNumber % 60;

		return `${min}:${second}`;
	};

	const handleBack = () => {
		navigate("/home");
	};

	return (
		<>
			<div className="py-10">
				<h1>{todoName}</h1>
				<h1>{formatedTimeByMinSecond(focusTime)}</h1>
				<h1>{restTime}</h1>

				<div>
					<button onClick={handleStart}>start </button>
					<button onClick={handleStop}>stop </button>
					<button onClick={handleBack}>back</button>
				</div>
			</div>
		</>
	);
};

export default TimerPage;
