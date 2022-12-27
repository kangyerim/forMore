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
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");

	const clickedButtonHandler = (action, { currentEmail, currentDisplayName }) => {
		switch (action) {
			case "navigate":
				navigate("/home");
				break;
			case "changeMode":
				setUpdateMode(!isUpdateMode);
				break;
			case "changePass":
				changePassword();
				setModalTitle("패스워드 변경");
				setModalBody(`${userInfo.email} 이메일을 확인해주세요.`);
				setShowModal(true);
				break;
			case "save":
				changeUserInfo(currentEmail, currentDisplayName);
				setModalTitle("내 정보 변경");
				setModalBody(`수정이 완료되었습니다.`);
				setShowModal(true);
				setTimeout(() => {
					window.location.reload();
				}, 3001);
				break;
		}

		setTimeout(() => {
			setShowModal(false);
		}, 3000);
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
			{showModal && <Modal title={modalTitle} body={modalBody}></Modal>}
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
