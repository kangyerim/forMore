import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	getAuth,
	sendPasswordResetEmail,
	updateEmail,
	updateProfile,
	signOut,
} from "firebase/auth";
import { authService } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenActions } from "../store/authenSlice";

const useUserAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth();
	const userInfo = useSelector((state) => state.authen);

	const requestLogin = async (email, password) => {
		let response = {};

		await setPersistence(authService, browserSessionPersistence);
		await signInWithEmailAndPassword(authService, email, password)
			.then((UserCredentialImpl) => {
				const { user } = UserCredentialImpl;

				dispatch(authenActions.logIn(user));
				navigate("/home");

				response = { result: true, message: "" };
			})
			.catch((error) => {
				let errorMessage = "Authentiacation Failed!";
				if (error?.message) {
					const errorCode = error.message;

					if (errorCode.includes("user-not-found")) {
						errorMessage = "아이디를 다시 확인해주세요.";
					} else if (errorCode.includes("password")) {
						errorMessage = "비밀번호를 다시 확인해주세요.";
					} else if (errorCode.includes("too-many-requests")) {
						errorMessage = "로그인 시도 횟수를 초과하였습니다. 잠시후 다시 시도해주세요.";
					}
				}
				response = { result: false, message: errorMessage };
			});

		return response;
	};

	const changeLoginPassword = async () => {
		await sendPasswordResetEmail(auth, userInfo.email);
	};
	const changeUserInfo = async (currentEmail, currentDisplayName) => {
		await updateEmail(auth.currentUser, currentEmail);
		await updateProfile(auth.currentUser, { displayName: currentDisplayName });
	};

	const requestLogout = async () => {
		await dispatch(authenActions.logOut());
		await signOut(authService);
		sessionStorage.removeItem(`firebase:authUser:${process.env.REACT_APP_APIKEY}:[DEFAULT]`);

		console.log("Sign-out successful");
		navigate("/");
	};

	return {
		requestLogin,
		changeLoginPassword,
		changeUserInfo,
		requestLogout,
	};
};

export default useUserAuth;
