"use client";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { useData } from "@/context/DataContext";
import { Input } from "./ui/input";
import { currentUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import authServices from "@/api-services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MobileHeader = () => {
	const navigate = useRouter();
	const dispatch = useDispatch();
	const { setSearchBoxValue, getTasks, setGetTasks } = useData();
	const [openSearchBox, setOpenSearchBox] = useState(false);

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
		<>
			<header className="w-full fixed top-0 left-0 right-0 z-50 px-5 xl:px-0 block md:hidden  ">
				<div className="max-w-7xl mx-auto h-[65px] flex items-center justify-between">
					<div className="logo flex items-center gap-4">
						<p className="text-pretty text-lg font-semibold tracking-widest">
							DoIt
						</p>
					</div>
					<nav>
						<ul className="flex items-center gap-1 sm:gap-5">
							<li className="cursor-pointer select-none">
								{!openSearchBox ? (
									<Search onClick={() => setOpenSearchBox(!openSearchBox)} />
								) : (
									<div className="flex items-center gap-2">
										<Input
											type="search"
											placeholder="Search..."
											onChange={(e) => setSearchBoxValue(e.target.value)}
										/>
										<X onClick={() => setOpenSearchBox(!openSearchBox)} />
									</div>
								)}
							</li>

							<li className="cursor-pointer">
								<ModeToggle />
							</li>

							<li>
								<Sheet>
									<SheetTrigger asChild>
										<Button variant="outline">Menu</Button>
									</SheetTrigger>
									<SheetContent className="flex flex-col justify-between">
										<SheetHeader>
											<SheetTitle>Welcome, mohit</SheetTitle>
											<SheetDescription>
												<ul className="text-pretty bg-slate-100 dark:bg-slate-800 rounded-md py-4 space-y-1">
													{link.map((link) => (
														<li key={link.name}>
															<button
																className={`${
																	getTasks === link.name &&
																	"bg-slate-200 dark:bg-slate-900"
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
											</SheetDescription>
										</SheetHeader>

										<SheetFooter className="mt-5">
											<Button className="w-full" onClick={handleLogout}>
												Logout
											</Button>
										</SheetFooter>
									</SheetContent>
								</Sheet>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default MobileHeader;
