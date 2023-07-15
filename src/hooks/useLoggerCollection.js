import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { databaseService } from "../firebase";
import { useSelector } from "react-redux";
import { logActions } from "../store/logSlice";

const useLoggerCollection = () => {
	const { email } = useSelector((state) => state.authenSlice);

	if (email) {
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "logs");

		const createLog = async (payload) => {
			const { mode } = payload;

			if (mode === "none") return;

			try {
				await addDoc(collectionRef, payload);
				return true;
			} catch (error) {
				return false;
			}
		};

		const getLogList = async () => {
			let result = [];

			await getDocs(collectionRef).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const todoRef = Object.assign({}, { uid: doc.id }, doc.data());
					result.push(todoRef);
				});
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
