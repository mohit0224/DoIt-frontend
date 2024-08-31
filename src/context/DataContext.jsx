"use client";

import authServices from "@/api-services/authService";
import taskServices from "@/api-services/taskService";
import { currentUser } from "@/store/slices/authSlice";
import { getAllTask, getCompletedTasks } from "@/store/slices/taskSlice";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const dispatch = useDispatch();

	const [view, setView] = useState(false);
	const [openSideBar, setOpenSideBar] = useState(true);
	const [getTasks, setGetTasks] = useState("all tasks");
	const [searchBoxValue, setSearchBoxValue] = useState("");

	const monitorCookieAndDeleteToken = () => {
		const checkInterval = 10000;

		const intervalId = setInterval(async () => {
			const response = await authServices.checkCookie();

			const cookieExists = response.data?.cookieExists;
			const localStorageExists = localStorage.getItem("token");

			if (!cookieExists) {
				localStorage.removeItem("token");
			}
			if (!cookieExists && !localStorageExists) clearInterval(intervalId);
		}, checkInterval);
	};

	const getCurrentUser = async () => {
		const result = await authServices.currentUser();
		dispatch(currentUser(result.data.data));
	};

	const getAllTasks = async () => {
		try {
			if (getTasks === "all tasks") {
				const result = await taskServices.getAllTasks();
				dispatch(getAllTask(result.data.data));

				const res = await taskServices.getCompletedTasks();
				dispatch(getCompletedTasks(res.data.data));
			} else if (getTasks === "today") {
				const result = await taskServices.getTodayTasks();
				dispatch(getAllTask(result.data.data));

				const res = await taskServices.getCompletedTasks();
				dispatch(getCompletedTasks(res.data.data));
			} else if (getTasks === "important") {
				const result = await taskServices.getImportantTasks();
				dispatch(getAllTask(result.data.data));

				const res = await taskServices.getCompletedTasks();
				dispatch(getCompletedTasks(res.data.data));
			}
		} catch (error) {
			console.log(err);
		}
	};

	// ----------------------------------------------------------------
	// ----------------------------------------------------------------

	const callAllFunctions = () => {
		monitorCookieAndDeleteToken();
		getCurrentUser();
		getAllTasks();
	};

	useEffect(() => {
		const tokenExists = localStorage.getItem("token");
		if (tokenExists) {
			getAllTasks();
		}
	}, [getTasks]);

	useEffect(() => {
		const tokenExists = localStorage.getItem("token");

		if (tokenExists) {
			callAllFunctions();
		}
	}, []);

	return (
		<DataContext.Provider
			value={{
				callAllFunctions,
				view,
				setView,
				openSideBar,
				setOpenSideBar,
				setSearchBoxValue,
				searchBoxValue,
				getTasks,
				setGetTasks,
				getAllTasks,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
