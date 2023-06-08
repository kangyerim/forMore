import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { databaseService } from "../firebase";
import { useSelector } from "react-redux";

const useLoggerCollection = () => {
	const { email } = useSelector((state) => state.authenSlice);

	if (email) {
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "logs");

		const createLog = async (payload) => {
			const { mode, todoUID, todoName, focusTime } = payload;

			if (mode === "none") return;
			console.log("useLoggerCollection  :  createLog()", mode, todoUID, todoName, focusTime);

			try {
				await addDoc(collectionRef, payload);
				return true;
			} catch (error) {
				return false;
			}
		};

		const getLogList = async () => {
			const querySnapshot = await getDocs(collectionRef);
			let result = [];
			querySnapshot.forEach((doc) => {
				const todoRef = Object.assign(doc.data(), { uid: doc.id });
				result.push(todoRef);
			});

			return result;
		};

		return {
			createLog,
			getLogList,
		};
	} else {
		return {
			createLog: () => {},
			getLogList: () => {},
		};
	}
};

export default useLoggerCollection;
