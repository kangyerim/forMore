import { useRef } from "react";

const MyInfoForm = ({ userInfo, isUpdateMode, emitClickedAction }) => {
	const { email, displayName } = userInfo;
	const emailInputRef = useRef();
	const displayNameInputRef = useRef();

	const onClickButton = (action) => {
		if (action === "save") {
			const currentEmail = emailInputRef.current.value;
			const currentDisplayName = displayNameInputRef.current.value;

			emitClickedAction(action, { currentEmail, currentDisplayName });
		} else {
			emitClickedAction(action, {});
		}
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
						<button
							type="button"
							className="w-80 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={(e) => onClickButton("changePass", e)}
						>
							비밀번호 변경 이메일 보내기
						</button>
					</div>
				)}

				{isUpdateMode && (
					<>
						<button
							type="button"
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={(e) => onClickButton("changeMode", e)}
						>
							취소
						</button>
						<button
							type="button"
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={(e) => onClickButton("save", e)}
						>
							저장
						</button>
					</>
				)}

				{!isUpdateMode && (
					<>
						<button
							type="button"
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={(e) => onClickButton("navigate", e)}
						>
							확인
						</button>
						<button
							type="button"
							className="w-40 h-10  border-slate-300 rounded-md mb-2 my-4 text-white bg-black"
							onClick={(e) => onClickButton("changeMode", e)}
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
