import * as z from 'zod';

const SignInSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.check(z.email('Invalid email address')),
	password: z.string().min(1, 'Password is required'),
});

const SignUpSchema = z
	.object({
		email: z
			.string()
			.min(1, 'Email is required')
			.check(z.email('Invalid email address')),
		password: z.string().min(8, 'Password must be atleast 8 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match",
		path: ['confirmPassword'],
	});

export type SignInValidation = z.infer<typeof SignInSchema>;
export type SignUpValidation = z.infer<typeof SignUpSchema>;
