import TagColor from "../../constants/TagColor";
import TimerTime from "../../constants/TimerTime";
import { useRef } from "react";

const TimerForm = ({ emitClickedAction }) => {
	const timerTitleRef = useRef();
	const tagColorRef = useRef();
	const focusTimeRef = useRef();
	const restTimeRef = useRef();

	const onClickButton = (action) => {
		const currentTitle = timerTitleRef.current.value;
		const currentTagColor = tagColorRef.current.value;
		const currentFocusTime = focusTimeRef.current.value;
		const currentRestTime = restTimeRef.current.value;

		emitClickedAction(action, { currentTitle, currentTagColor, currentFocusTime, currentRestTime });
	};

	return (
		<>
			<h1 className="font-semibold text-xl font-black my-2">타이머 등록</h1>
			<form>
				<input
					ref={timerTitleRef}
					type="text"
					id="title"
					placeholder="이름"
					className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
					required
				/>

				<select ref={tagColorRef}>
					{TagColor.map((tag) => {
						return (
							<option key={tag.code} value={tag.code}>
								{tag.name}
							</option>
						);
					})}
				</select>
				<select ref={focusTimeRef}>
					{TimerTime.map((time) => {
						return (
							<option key={time.time} value={time.time}>
								{time.text}
							</option>
						);
					})}
				</select>
				<select ref={restTimeRef}>
					{TimerTime.map((time) => {
						return (
							<option key={time.time} value={time.time}>
								{time.text}
							</option>
						);
					})}
				</select>

				<button
					type="button"
					className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
					onClick={(e) => onClickButton("cancel")}
				>
					취소
				</button>
				<button
					type="button"
					className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
					onClick={(e) => onClickButton("delete")}
				>
					생성
				</button>
			</form>
		</>
	);
};

export default TimerForm;
