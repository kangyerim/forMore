import TagColor from "../../constants/TagColor";
import TimerTime from "../../constants/TimerTime";
import { useEffect, useRef, useState } from "react";

const TimerTest = ({ todo, emitClickedAction, action }) => {
	const timerTitleRef = useRef();
	const [tagColor, setTagColor] = useState("");
	const focusTimeRef = useRef();
	const restTimeRef = useRef();

	const onClickButton = (requestedAction) => {
		const currentTitle = timerTitleRef.current.value;
		const currentTagColor = tagColor;
		const currentFocusTime = focusTimeRef.current.value;
		const currentRestTime = restTimeRef.current.value;
		const uniqueID = todo?.uid;

		console.log(">>>>>> ", todo);
		emitClickedAction(requestedAction, { uniqueID, currentTitle, currentTagColor, currentFocusTime, currentRestTime });
	};

	const radioInputHandle = (tag) => {
		setTagColor(() => {
			return tag.name;
		});
	};

	useEffect(() => {
		if (todo) {
			timerTitleRef.current.value = todo.title;
			setTagColor(() => {
				return todo.color;
			});
			focusTimeRef.current.value = todo.focusTime;
			restTimeRef.current.value = todo.restTime;
		}
	}, [todo]);

	return (
		<>
			<form className="relative mt-16">
				<div>
					<input
						ref={timerTitleRef}
						type="text"
						id="title"
						name="title"
						placeholder="title"
						className="text-9xl peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
						required
					/>
					<label
						htmlFor="title"
						className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-lg text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-20 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-9xl peer-focus:top-0 peer-focus:pl-0 peer-focus:text-lg peer-focus:text-gray-800"
					>
						title
					</label>
				</div>

				<span>색상</span>
				<div className="flex justify-evenly">
					{TagColor.map((tag) => {
						return (
							<div key={tag.code}>
								<input
									type="radio"
									name="tagColor"
									id={tag.code}
									value={tag.name}
									onChange={() => radioInputHandle(tag)}
								/>
								<label htmlFor={tag.code}> {tag.name}</label>
							</div>
						);
					})}
				</div>

				<div>
					<label htmlFor="focusTime" className="absolute">
						FocusTime
					</label>
					<input id="focusTime" type="number" min="5" max="60" step="5" className="text-9xl" ref={focusTimeRef} />
					<label htmlFor="restTime" className="absolute">
						RestTime
					</label>
					<input id="restTime" type="number" min="5" max="60" step="5" className="text-9xl" ref={restTimeRef} />
				</div>

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
					onClick={(e) => onClickButton(action)}
				>
					{action}
				</button>
			</form>
		</>
	);
};

export default TimerTest;
