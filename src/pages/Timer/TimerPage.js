import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useLoggerCollection from "../../hooks/useLoggerCollection";

const TimerPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [todoName, setTodoName] = useState("");
	const [focusTime, setFocusTime] = useState(-1);
	const [restTime, setRestTime] = useState(-1);
	const [mode, setMode] = useState("none"); // focus,rest,none
	const countDownInterval = useRef(null);

	const { createLog } = useLoggerCollection();

	const location = useLocation();

	const initialedFocusTime = useRef(-1);
	const initialedRestTime = useRef(-1);
	const focusedTime = useRef(-1);
	const restedTime = useRef(-1);

	useEffect(() => {
		return () => {
			if (mode === "focus") {
				createLog({ mode, todoName, logTime: new Date(), time: focusedTime.current });
			} else if (mode === "rest") {
				createLog({ mode, todoName, logTime: new Date(), time: restedTime.current });
			}
		};
	}, [location.pathname, mode]);

	useEffect(() => {
		if (params) {
			setTimer();
		} else {
			handleBack();
		}
	}, []);

	useEffect(() => {
		if (mode === "focus" && 1 > focusTime) {
			setMode(() => "none");
			createLog({ mode, todoName, logTime: new Date(), time: focusTime.current });
		}
		if (mode === "rest" && 1 > restTime) {
			setMode(() => "none");
			createLog({ mode, todoName, logTime: new Date(), time: restTime.current });
			clearInterval(countDownInterval.current);

			setTimer();
		}

		focusedTime.current = initialedFocusTime.current - focusTime;
		restedTime.current = initialedRestTime.current - restTime;
	}, [focusTime, restTime]);

	useEffect(() => {
		if (mode === "focus") {
			countDownInterval.current = setInterval(countDown, 1000);
		} else if (mode === "rest") {
			countDownInterval.current = setInterval(countDownForRest, 1000);
		} else {
			clearInterval(countDownInterval.current);
		}
	}, [mode]);

	const setTimer = () => {
		const { focus, rest, todo } = params;
		setFocusTime(() => focus * 60);
		setRestTime(() => rest * 60);
		setTodoName(() => todo);

		initialedFocusTime.current = focus * 60;
		initialedRestTime.current = rest * 60;
	};

	const handleStart = () => {
		if (focusTime > 1) {
			setMode(() => "focus");
		} else {
			setMode(() => "rest");
		}
	};

	const countDown = useCallback(() => {
		setFocusTime((preTime) => {
			if (preTime > 1) return preTime - 1;
			else return 0;
		});
	}, []);

	const countDownForRest = useCallback(() => {
		setRestTime((preTime) => {
			if (preTime > 1) return preTime - 1;
			else return 0;
		});
	}, []);

	const handleStop = () => {
		setMode(() => "none");
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
				<h1>
					{todoName} {mode}
				</h1>
				<h1>{formatedTimeByMinSecond(focusTime)}</h1>
				<h1>{formatedTimeByMinSecond(restTime)}</h1>

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
