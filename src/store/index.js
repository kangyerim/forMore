import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";

export default configureStore({
	reducer: {
		authenSlice: authenSlice,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});
