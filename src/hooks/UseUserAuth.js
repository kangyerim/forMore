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
		await setPersistence(authService, browserSessionPersistence);
		await signInWithEmailAndPassword(authService, email, password)
			.then((UserCredentialImpl) => {
				const { user } = UserCredentialImpl;

				dispatch(authenActions.logIn(user));
				navigate("/home");
			})
			.catch((error) => {
				let errorMsg = "Authentiacation Failed!";
				if (error?.message) {
					errorMsg = error.message;
				}
				alert(errorMsg);
			});
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
