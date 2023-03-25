import { collection, addDoc, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { databaseService } from "../firebase";
import { useSelector } from "react-redux";

const useTodosCollection = () => {
	const { email } = useSelector((state) => state.authenSlice);

	if (email) {
		const docRef = doc(databaseService, "users", email);
		const collectionRef = collection(docRef, "todos");

		const createTodo = async (payload) => {
			try {
				await addDoc(collectionRef, payload);
				return true;
			} catch (error) {
				return false;
			}
		};

		const updateTodo = async (todoID, updatedDocValue) => {
			const todoDocRef = doc(collectionRef, todoID);
			try {
				await updateDoc(todoDocRef, updatedDocValue);
				return true;
			} catch (error) {
				return false;
			}
		};

		const deleteTodo = async (todoID) => {
			const todoDocRef = doc(collectionRef, todoID);
			try {
				await deleteDoc(todoDocRef);
				return true;
			} catch (error) {
				return false;
			}
		};

		const getTodoList = async () => {
			const querySnapshot = await getDocs(collectionRef);
			let result = [];
			querySnapshot.forEach((doc) => {
				const todoRef = Object.assign(doc.data(), { uid: doc.id });
				result.push(todoRef);
			});

			return result;
		};

		return {
			createTodo,
			getTodoList,
			updateTodo,
			deleteTodo,
		};
	} else {
		return {
			createTodo: () => {},
			getTodoList: () => {},
			updateTodo: () => {},
			deleteTodo: () => {},
		};
	}
};

export default useTodosCollection;
