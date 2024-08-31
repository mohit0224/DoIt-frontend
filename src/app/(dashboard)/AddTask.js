import taskServices from "@/api-services/taskService";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/DataContext";
import taskValidation from "@/validations/taskValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTask = () => {
	const { getAllTasks } = useData();
	const form = useForm({
		resolver: zodResolver(taskValidation),
		defaultValues: {
			task: "",
		},
	});
	const onSubmit = async (data) => {
		try {
			const res = taskServices.createTask(data);
			toast.promise(res, {
				loading: "Please wait...",
				success: (res) => res.data.message,
				error: (err) => err.response.data.message,
			});

			await res;
			getAllTasks();
			form.reset({
				task: "",
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="border-b p-5">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="task"
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Task</FormLabel> */}
								<FormControl>
									<Input
										placeholder="Add A Task"
										autoComplete="off"
										className="py-10 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-none text-lg"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button type="submit" className="">
							ADD TASK
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddTask;
