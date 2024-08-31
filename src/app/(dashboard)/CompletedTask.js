import taskServices from "@/api-services/taskService";
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/context/DataContext";
import { Star } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CompletedTask = () => {
	const allTasks = useSelector((state) => state.taskSlice.completedTasks);
	const { getAllTasks } = useData();

	const handleChange = async (e, id) => {
		try {
			const res = taskServices.isCompleted(id, { isCompleted: e });
			toast.promise(res, {
				loading: "Please wait...",
				success: (res) => res.data.message,
				error: (err) => err.response.data.message,
			});

			await res;
			getAllTasks();
		} catch (err) {}
	};

	return (
		<div className="hiddenScrollbar pt-5 min-h-40 max-h-96 overflow-y-scroll">
			<h2 className="text-lg">Completed</h2>
			<ul className="mt-3">
				{allTasks.map((data, i) => (
					<li
						className="py-3 flex items-center justify-between border-b px-2"
						key={i}
					>
						<div className="flex items-center gap-3">
							<Checkbox
								checked={data.isCompleted}
								onCheckedChange={(e) => handleChange(e, data._id)}
							/>
							<h3>{data.task}</h3>
						</div>
						<div>
							<Star
								className="cursor-pointer bg-transparent"
								strokeWidth={data.isImportant ? 1 : 1.5}
								fill={`${data.isImportant ? "yellow" : "transparent"}`}
								onClick={() => handleImportant(!data.isImportant, data._id)}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CompletedTask;
