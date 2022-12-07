import { useState, useRef } from "react";

const MyInfoForm = ({ userInfo }) => {
	const { email, displayName } = userInfo;
	const [isUpdateMode, setUpdateMode] = useState(false);
	const emailInputRef = useRef();
	const displayNameInputRef = useRef();

	const onModeHandler = (event) => {
		event.preventDefault();
		setUpdateMode(!isUpdateMode);
	};

	return (
		<>
			<h1 className="font-semibold text-xl font-black my-2">내 정보 mode: {isUpdateMode ? "update" : "read"}</h1>
			<form>
				<div>
					<label htmlFor="email" className="text-sm">
						이메일
					</label>

					{isUpdateMode ? (
						<input
							type="email"
							id="email"
							className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
							placeholder={email}
							ref={emailInputRef}
							required
						/>
					) : (
						<span className="font-semibold mx-2">{email}</span>
					)}
				</div>
				<div>
					<label htmlFor="displayName" className="text-sm">
						닉네임
					</label>
					{isUpdateMode ? (
						<input
							type="text"
							id="displayName"
							className="w-80 h-10 border-2 border-slate-300 rounded-md mb-2"
							placeholder={displayName}
							ref={displayNameInputRef}
							required
						/>
					) : (
						<span className="font-semibold mx-2">{displayName}</span>
					)}
				</div>
				{isUpdateMode && (
					<div>
						<button type="submit" className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">
							비밀번호 변경 이메일 보내기
						</button>
					</div>
				)}

				{isUpdateMode && (
					<>
						<button className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">취소</button>
						<button
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={onModeHandler}
						>
							저장
						</button>
					</>
				)}

				{!isUpdateMode && (
					<>
						<button className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black">확인</button>
						<button
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={onModeHandler}
						>
							수정
						</button>
					</>
				)}
			</form>
		</>
	);
};

export default MyInfoForm;
