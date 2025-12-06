import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().min(1, "Email is required").check(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required"),
});

export const SignUpSchema = z
    .object({
        email: z.email().min(1, "Email is required"),
        password: z.string().min(8, "Password must be atleast 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });

export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
