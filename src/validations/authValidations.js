import { z } from "zod";

const signupValidation = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.max(50, { message: "Name cannot be longer than 50 characters." })
		.nonempty({ message: "Name is required." }),

	email: z
		.string()
		.email({ message: "Invalid email address." })
		.nonempty({ message: "Email is required." }),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(100, { message: "Password cannot be longer than 100 characters." })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number." })
		.regex(/[^A-Za-z0-9]/, {
			message: "Password must contain at least one special character.",
		}),
});

const loginValidation = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address." })
		.nonempty({ message: "Email is required." }),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.nonempty({ message: "Password is required." }),
});

export { signupValidation, loginValidation };
