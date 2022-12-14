import { useSelector } from "react-redux";
import MyInfoForm from "../../components/Auth/MyInfoForm";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { getAuth, sendPasswordResetEmail, updateEmail, updateProfile } from "firebase/auth";
import Modal from "../../components/Auth/common/Modal";

const MyPage = () => {
	const navigate = useNavigate();
	const auth = getAuth();
	const userInfo = useSelector((state) => state.authen);
	const [isUpdateMode, setUpdateMode] = useState(false);

	const clickedButtonHandler = (action, { currentEmail, currentDisplayName }) => {
		console.log("clickedButtonHandler   ", action);

		switch (action) {
			case "navigate":
				navigate("/home");
				break;
			case "changeMode":
				setUpdateMode(!isUpdateMode);
				break;
			case "changePass":
				changePassword();
				break;
			case "save":
				changeUserInfo(currentEmail, currentDisplayName);
				break;
		}
	};

	const changePassword = async () => {
		await sendPasswordResetEmail(auth, userInfo.email);
	};

	const changeUserInfo = async (currentEmail, currentDisplayName) => {
		await updateEmail(auth.currentUser, currentEmail);
		await updateProfile(auth.currentUser, { displayName: currentDisplayName });
	};

	return (
		<>
			{/* <Modal></Modal> */}
			<div className="grid grid-cols-1 justify-items-center my-60">
				<MyInfoForm
					userInfo={userInfo}
					isUpdateMode={isUpdateMode}
					emitClickedAction={clickedButtonHandler}
				></MyInfoForm>
			</div>
		</>
	);
};

export default MyPage;
