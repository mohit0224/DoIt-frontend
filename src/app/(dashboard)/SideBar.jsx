"use client";
import authServices from "@/api-services/authService";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { currentUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const SideBar = () => {
	const navigate = useRouter();
	const dispatch = useDispatch();
	const { openSideBar, getTasks, setGetTasks } = useData();
	const user = useSelector((state) => state.authSlice.user);

	const link = [
		{
			name: "all tasks",
		},
		{
			name: "today",
		},
		{
			name: "important",
		},
	];

	const handleLogout = async () => {
		try {
			const res = authServices.logout();
			toast.promise(res, {
				loading: "Logged out...",
				success: (res) => res.data.message,
				error: (err) => err.response.data.message,
			});

			await res;
			localStorage.removeItem("token");
			dispatch(currentUser({}));
			navigate.replace("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		openSideBar && (
			<div className={`max-w-[300px] flex-1 p-5 hidden md:block`}>
				<div className="h-full flex flex-col justify-between">
					<div className="space-y-3">
						<h2 className="text-lg text-pretty bg-slate-100 dark:bg-slate-900 rounded-md py-2 px-4">
							<span className="text-xl">Welcome</span>, {user?.name}
						</h2>

						<ul className="text-pretty bg-slate-100 dark:bg-slate-800 rounded-md py-4 space-y-1">
							{link.map((link) => (
								<li key={link.name}>
									<button
										className={`${
											getTasks === link.name && "bg-slate-200 dark:bg-slate-900"
										} ${
											getTasks !== link.name &&
											"hover:bg-slate-200 dark:hover:bg-slate-700"
										} w-full text-start px-4 py-2 rounded capitalize text-sm `}
										onClick={() => setGetTasks(link.name)}
									>
										{link.name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<Button className="w-full" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</div>
		)
	);
};

export default SideBar;
