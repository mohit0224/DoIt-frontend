"use client";
import {
	AlignJustify,
	LayoutGrid,
	List,
	LogOut,
	Search,
	X,
} from "lucide-react";
import React, { useState } from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { useData } from "@/context/DataContext";
import { Input } from "./ui/input";
import { currentUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
	const navigate = useRouter();
	const dispatch = useDispatch();
	const { view, setView, openSideBar, setOpenSideBar, setSearchBoxValue } =
		useData();
	const [openSearchBox, setOpenSearchBox] = useState(false);

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
			<header className="w-full fixed top-0 left-0 right-0 z-50 px-5 xl:px-0 hidden md:block  ">
				<div className="max-w-7xl mx-auto h-[65px] flex items-center justify-between">
					<div className="logo flex items-center gap-4">
						<button onClick={() => setOpenSideBar(!openSideBar)}>
							<AlignJustify />
						</button>
						<p className="text-pretty text-lg font-semibold tracking-widest">
							DoIt
						</p>
					</div>
					<nav>
						<ul className="flex items-center gap-5">
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
							<li
								className="cursor-pointer select-none"
								onClick={() => setView(!view)}
							>
								{!view ? <LayoutGrid /> : <List />}
							</li>
							<li className="cursor-pointer">
								<ModeToggle />
							</li>
							{!openSideBar && (
								<li className="cursor-pointer">
									<Button variant="outline" size="icon" onClick={handleLogout}>
										<LogOut className="text-sm" />
									</Button>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
