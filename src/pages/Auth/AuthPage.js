import AuthForm from "../../components/Auth/AuthForm";
import { useNavigate } from "react-router-dom";
import useUserAuth from "../../hooks/UseUserAuth";
import useModal from "../../hooks/UseModal";
import Modal from "../../components/common/Modal";
import UseUserCollection from "../../hooks/useUserCollection";
import { useDispatch, useSelector } from "react-redux";
import { authenActions } from "../../store/authenSlice";

const AuthPage = () => {
	const navigate = useNavigate();
	const { requestLogin } = useUserAuth();
	const { showModal, modalTitle, modalBody, openModal } = useModal();
	const { addUserDocument, updateUserDocument } = UseUserCollection();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authen);

	const onEnteredDataHandler = async (enteredData) => {
		const { email, password, cookieLogin } = enteredData;

		if (cookieLogin) {
			// 브라우저에 쿠키 구워넣기
		} else if (!cookieLogin) {
			// 브라우저에 쿠키 지우기
		}

		if (email && password) {
			const { result, message, returnedValue } = await requestLogin(email, password);

			if (!result || !returnedValue) {
				openModal("로그인 실패", message);
			} else {
				dispatch(authenActions.logIn(returnedValue));
				updateUserDocument();
			}
		}
	};

	const onRouteToSignUp = () => {
		navigate("/sign_up");
	};

	return (
		<>
			{showModal && <Modal title={modalTitle} body={modalBody}></Modal>}
			<div className="grid grid-cols-1 justify-items-center my-60">
				<AuthForm onEnteredData={onEnteredDataHandler} />
				<span className="text-sm my-2">
					아직 계정이 없으신가요?{" "}
					<b className="hover:cursor-pointer" onClick={onRouteToSignUp}>
						회원가입
					</b>
				</span>
			</div>
		</>
	);
};

export default AuthPage;
