import { createSlice } from "@reduxjs/toolkit";

const userInfo = {
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
	initialState: userInfo,
	reducers: {
		logIn: (state, { payload: userInfo }) => {
			state.uid = userInfo.uid;
			state.accessToken = userInfo.accessToken;
			state.email = userInfo.email;
			state.displayName = userInfo.displayName;
		},
		logOut: (state) => {},
		signUp: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const authenActions = authenSlice.actions;

export default authenSlice.reducer;
