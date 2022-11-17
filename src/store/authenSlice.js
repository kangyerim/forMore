import { createSlice } from "@reduxjs/toolkit";

const userInfo = {
	uid: "",
	email: "",
	displayName: "",
	accessToken: "",
	emailVerified: false,
};

export const authenSlice = createSlice({
	name: "authen",
	initialState: userInfo,
	reducers: {
		logIn: (state) => {},
		logOut: (state) => {},
		signUp: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, signUp } = authenSlice.actions;

export default authenSlice.reducer;
