import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { databaseService } from "../firebase";
import { useSelector } from "react-redux";
import USER_STATUS from "../constants/UserStatus";
import { async } from "@firebase/util";

const UseUserCollection = () => {
	const { displayName, email } = useSelector((state) => state.authen);

	// cloud firestore에 사용자 콜렉션 생성, 최초 한 번만 생성
	const createUserCollection = () => {
		const citiesRef = collection(databaseService, "users");
		console.log("˚₊·—̳͟͞͞♡  citiesRef", citiesRef);
	};

	// 사용자 콜렉션에 사용자 정보(도큐먼트)저장
	const addUserDocument = async () => {
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
		// const userDocRef = databaseService.collection("users").doc(email);
		const userDocRef = doc(databaseService, "users", email);
		const docSnap = await getDoc(userDocRef);
		console.log("˚₊·—̳͟͞͞♡  userDocRef", docSnap);
	};

	// 사용자 정보(도큐먼트) 삭제
	const deleteUserDocument = () => {};

	return {
		createUserCollection,
		addUserDocument,
		updateUserDocument,
		deleteUserDocument,
	};
};

export default UseUserCollection;
