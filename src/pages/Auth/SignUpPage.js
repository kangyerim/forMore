import SignUpForm from "../../components/Auth/SignUpForm";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import { useState } from "react";
import useModal from "../../hooks/UseModal";

const SignUpPage = () => {
	const navigate = useNavigate();
	const { showModal, modalTitle, modalBody, openModal } = useModal();

	const onEnteredDataHandler = async (enteredData) => {
		const { email, password, nickName } = enteredData;

		if (email && password && nickName) {
			const responsedUser = await createUser(email, password);
			if (responsedUser) {
				await updateUserNickName(responsedUser, nickName);
			}
		}
	};

	const createUser = async (email, password) => {
		const createUserResponse = await createUserWithEmailAndPassword(authService, email, password);

		if (createUserResponse?.user) {
			const createdUser = createUserResponse?.user;
			return createdUser;
		} else {
			return null;
		}
	};
	const updateUserNickName = async (user, nickName) => {
		try {
			await updateProfile(user, { displayName: nickName });
			openModal("회원가입", `반갑습니다. ${nickName}님! 가입이 완료되었습니다.`);

			setTimeout(() => {
				navigate("/login");
			}, 3000);
		} catch (error) {}
	};

	const onRouteToLogin = () => {
		navigate("/login");
	};

	return (
		<>
			{showModal && <Modal title={modalTitle} body={modalBody}></Modal>}
			<div className="grid grid-cols-1 justify-items-center my-60">
				<SignUpForm onEnteredData={onEnteredDataHandler} />
				<span className="text-sm my-2">
					가입된 계정이 있으세요?{" "}
					<b className="hover:cursor-pointer" onClick={onRouteToLogin}>
						로그인하기
					</b>
				</span>
			</div>
		</>
	);
};

export default SignUpPage;
