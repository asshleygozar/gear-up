import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().min(1, "Email is required").check(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required"),
});

export const SignUpSchema = z.object({
    email: z.email().min(1, "Email is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export type SignInValidation = z.infer<typeof SignInSchema>;
export type SignUpValidation = z.infer<typeof SignUpSchema>;
