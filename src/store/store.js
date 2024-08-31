import authSlice from "./slices/authSlice";
import taskSlice from "./slices/taskSlice";
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
	reducer: {
		authSlice,
		taskSlice,
	},
});

export default store;
