import { useSelector } from "react-redux";
import MyInfoForm from "../../components/Auth/MyInfoForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/UseModal";
import useUserAuth from "../../hooks/UseUserAuth";

const MyPage = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authenSlice);
	const [isUpdateMode, setUpdateMode] = useState(false);
	const { showModal, modalTitle, modalBody, openModal } = useModal();
	const { changeLoginPassword, changeUserInfo } = useUserAuth();

	const clickedButtonHandler = async (action, { currentEmail, currentDisplayName }) => {
		switch (action) {
			case "navigate":
				navigate("/home");
				break;
			case "changeMode":
				setUpdateMode(!isUpdateMode);
				break;
			case "changePass":
				await changeLoginPassword();
				openModal("패스워드 변경", `${userInfo.email} 이메일을 확인해주세요.`);
				break;
			case "save":
				await changeUserInfo(currentEmail, currentDisplayName);
				openModal("내 정보 변경", "수정이 완료되었습니다.");
				setTimeout(() => {
					window.location.reload();
				}, 3000);
				break;
		}
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
