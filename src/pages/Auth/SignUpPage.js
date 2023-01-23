import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/Auth/SignUpForm";
import Modal from "../../components/common/Modal";
import useModal from "../../hooks/UseModal";
import useUserAuth from "../../hooks/UseUserAuth";

const SignUpPage = () => {
	const navigate = useNavigate();
	const { showModal, modalTitle, modalBody, openModal } = useModal();
	const { createUser } = useUserAuth();

	const onEnteredDataHandler = async (enteredData) => {
		const { email, password, nickName } = enteredData;

		if (email && password && nickName) {
			const { result, message } = await createUser(email, password);

			openModal(`회원가입 ${result ? "성공" : "실패"}`, message);
			if (result) {
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			}
		}
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
