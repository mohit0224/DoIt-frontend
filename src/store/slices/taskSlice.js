const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	allTask: [],
	completedTasks: [],
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		getAllTask: (state, action) => {
			state.allTask = action.payload;
		},
		getCompletedTasks: (state, action) => {
			state.completedTasks = action.payload;
		},
	},
});

export const { getAllTask, getCompletedTasks } = taskSlice.actions;
export default taskSlice.reducer;
