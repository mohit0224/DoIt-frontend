"use client";

import React from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import CompletedTask from "./CompletedTask";

const page = () => {
	return (
		<>
			<div>
				<AddTask />
				<TaskList />
				<CompletedTask />
			</div>
		</>
	);
};

export default page;
