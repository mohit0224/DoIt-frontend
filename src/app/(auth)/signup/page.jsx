"use client";

import Container from "@/components/Container";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import authServices from "@/api-services/authService";
import { toast } from "sonner";
import { signupValidation } from "@/validations/authValidations";
import { useRouter } from "next/navigation";

const Page = () => {
	const navigate = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(signupValidation),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);

			const res = authServices.signup(data);
			toast.promise(res, {
				loading: "Please wait...",
				success: (res) => res.data.message,
				error: (err) => err.response.data.message,
			});

			const result = await res;
			if (result) {
				setIsLoading(false);
				form.reset({
					email: "",
					password: "",
					name: "",
				});
				navigate.replace("/login");
			}
		} catch (err) {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Container className={"max-w-5xl py-16"}>
				<div>
					<h1 className="text-4xl">Create new account</h1>

					<div className="mt-10">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter your name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter your email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="Enter your password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={isLoading}>
									Signup
								</Button>
							</form>
						</Form>
					</div>

					<p className="mt-5">
						Have an account ? <Link href={"/login"}>Login</Link>
					</p>
				</div>
			</Container>
		</>
	);
};

export default Page;
