import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	getAuth,
	sendPasswordResetEmail,
	updateEmail,
	updateProfile,
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenActions } from "../store/authenSlice";

const useUserAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth();
	const userInfo = useSelector((state) => state.authenSlice);

	const requestLogin = async (email, password) => {
		let response = {};

		await setPersistence(authService, browserSessionPersistence);
		await signInWithEmailAndPassword(authService, email, password)
			.then((UserCredentialImpl) => {
				const { user } = UserCredentialImpl;
				response = { result: true, message: "", returnedValue: user };
			})
			.catch((error) => {
				let errorMessage = "Authentiacation Failed!";
				const errorCode = error?.message;

				if (errorCode.includes("user-not-found")) {
					errorMessage = "아이디를 다시 확인해주세요.";
				} else if (errorCode.includes("password")) {
					errorMessage = "비밀번호를 다시 확인해주세요.";
				} else if (errorCode.includes("too-many-requests")) {
					errorMessage = "로그인 시도 횟수를 초과하였습니다. 잠시후 다시 시도해주세요.";
				}

				response = { result: false, message: errorMessage ? errorMessage : errorCode };
			});

		return response;
	};

	const changeLoginPassword = async () => {
		await sendPasswordResetEmail(auth, userInfo.email);
	};
	const changeUserInfo = async (currentEmail, currentDisplayName) => {
		try {
			await updateEmail(auth.currentUser, currentEmail);
			await updateProfile(auth.currentUser, { displayName: currentDisplayName });
		} catch (error) {
			console.log("˚₊·—̳͟͞͞♡  error", error);
		}
	};

	const requestLogout = async () => {
		await dispatch(authenActions.logOut());
		await signOut(authService);
		sessionStorage.removeItem(`firebase:authUser:${process.env.REACT_APP_APIKEY}:[DEFAULT]`);

		console.log("Sign-out successful");
		navigate("/");
	};

	const createUser = async (email, password, nickName) => {
		let response = {};
		try {
			const createUserResponse = await createUserWithEmailAndPassword(authService, email, password);
			if (createUserResponse?.user) {
				const createdUser = createUserResponse?.user;
				await updateProfile(createdUser, { displayName: nickName });

				response = { result: true, message: `반갑습니다. ${nickName}님! 가입이 완료되었습니다.` };
			} else {
				return null;
			}
		} catch (error) {
			const errorCode = error?.message;
			let errorMessage = "";
			if (errorCode.includes("email-already-in-use")) {
				errorMessage = "이미 사용중인 이메일 입니다.";
			}
			response = { result: false, message: errorMessage ? errorMessage : errorCode };
		}

		return response;
	};

	return {
		requestLogin,
		changeLoginPassword,
		changeUserInfo,
		requestLogout,
		createUser,
	};
};

export default useUserAuth;
