import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TimerPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [todoName, setTodoName] = useState("");
	const [focusTime, setFocusTime] = useState(-1);
	const [restTime, setRestTime] = useState(-1);
	const [mode, setMode] = useState("none"); // focus,rest,none

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
		setInterval(() => {
			setFocusTime((preTime) => {
				if (preTime > 1) return preTime - 1;
				else return 0;
			});
		}, 1000);
	};

	const formatedTimeByMinSecond = (time) => {
		const timeByNumber = Number(time);
		let min = Math.round(timeByNumber / 60);
		let second = timeByNumber % 60;

		console.log("˚₊·—̳͟͞͞♡  timeByNumber:", Math.round(timeByNumber / 60), timeByNumber % 60);
		return `${min}:${second}`;
	};

	const handleBack = () => {
		navigate("/home");
	};

	return (
		<>
			<h1>{todoName}</h1>
			<h1>{formatedTimeByMinSecond(focusTime)}</h1>
			<h1>{restTime}</h1>

			<div>
				<button onClick={handleStart}>start</button>
				<button onClick={handleBack}>back</button>
			</div>
		</>
	);
};

export default TimerPage;
