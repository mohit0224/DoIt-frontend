const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	user: {},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		currentUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { currentUser } = authSlice.actions;
export default authSlice.reducer;
