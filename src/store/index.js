import { configureStore } from "@reduxjs/toolkit";
import authenReducer from "../store/authenSlice";

export default configureStore({
	reducer: {
		authen: authenReducer,
	},
});
