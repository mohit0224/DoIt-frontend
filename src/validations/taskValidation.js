import { z } from "zod";

const taskValidation = z.object({
	task: z
		.string()
		.min(2, { message: "Task must be at least 2 characters long." })
		.max(100, { message: "Task cannot be longer than 50 characters." })
		.nonempty({ message: "Task is required." }),
});

export default taskValidation;
