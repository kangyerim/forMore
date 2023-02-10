import { createSlice } from "@reduxjs/toolkit";

const initedUserInfo = {
	uid: "",
	email: "",
	displayName: "",
	accessToken: "",
	emailVerified: false,
	photoURL: "",
	lastLoginDate: new Date(),
	loginDevice: "",
	status: "",
};

export const authenSlice = createSlice({
	name: "authen",
	initialState: initedUserInfo,
	reducers: {
		logIn: (state, { payload: userInfo }) => {
			state.uid = userInfo.uid;
			state.accessToken = userInfo.accessToken;
			state.email = userInfo.email;
			state.displayName = userInfo.displayName;
		},
		logOut: (state) => {
			state.uid = "";
			state.accessToken = "";
			state.email = "";
			state.displayName = "";
		},
		signUp: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const authenActions = authenSlice.actions;

export default authenSlice.reducer;
