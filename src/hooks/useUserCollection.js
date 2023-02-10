import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { databaseService } from "../firebase";
import { useSelector } from "react-redux";
import USER_STATUS from "../constants/UserStatus";

const useUserCollection = () => {
	const { displayName, email } = useSelector((state) => state.authenSlice);

	// cloud firestore에 사용자 콜렉션 생성, 최초 한 번만 생성
	const createUserCollection = () => {
		const usersRef = collection(databaseService, "users");
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "todos");
		const citiesRef = collection(databaseService, "users");
		console.log("˚₊·—̳͟͞͞♡  citiesRef", citiesRef);
	};

	// 사용자 콜렉션에 사용자 정보(도큐먼트)저장
	const addUserDocument = async () => {
		const usersRef = collection(databaseService, "users");
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "todos");
		if (email) {
			try {
				const resultDocRef = await addDoc(collection(databaseService, "users"), {
					displayName,
					email,
					status: USER_STATUS.LOG_OFF,
					loginDevice: navigator.userAgent.toUpperCase(),
				});
				if (!resultDocRef.id) {
					console.error("Error adding document : There isn't DocRef ID ");
				}
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}
	};

	// 사용자 정보(도큐먼트) 수정
	const updateUserDocument = async () => {
		const usersRef = collection(databaseService, "users");
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "todos");

		await updateDoc(docRef, {
			status: USER_STATUS.LOG_IN,
			loginDevice: navigator.userAgent.toUpperCase(),
			lastLoginDate: new Date(),
		});
	};

	// 사용자 정보(도큐먼트) 삭제
	const deleteUserDocument = () => {};

	return {
		addUserDocument,
		updateUserDocument,
		deleteUserDocument,
	};
};

export default useUserCollection;
