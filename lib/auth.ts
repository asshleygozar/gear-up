'use server';

import * as z from 'zod';
import { getUserEmail, createUser } from '@/db/dal';

export type ActionResponse = {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
};

const SignInSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.check(z.email('Invaid email address')),
	password: z.string().min(1, 'Password is required'),
});

const SignUpSchema = z
	.object({
		email: z
			.string()
			.min(1, 'Email is required')
			.email('Invalid email address'),
		password: z.string().min(6, 'Password must be atleast 6 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password don't match ",
		path: ['confirmPassword'],
	});

export type SignInValidation = z.infer<typeof SignInSchema>;
export type SignUpValidation = z.infer<typeof SignUpSchema>;

export async function signIn(formData: FormData): Promise<ActionResponse> {
	try {
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const dataValidationResult = SignInSchema.safeParse(data);

		if (!dataValidationResult.success) {
			return {
				success: false,
				message: 'Validation failed',
				error: 'An error occured while validating',
			};
		}

		return {
			success: true,
			message: 'Signed in successfully',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured',
			error: 'Failed to sign in',
		};
	}
}

export async function signUp(formData: FormData): Promise<ActionResponse> {
	try {
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			confirmPassword: formData.get('confirmPassword') as string,
		};

		const dataValidationResult = SignUpSchema.safeParse(data);

		if (!dataValidationResult.success) {
			return {
				success: false,
				message: 'Data validation result failed',
				error: 'An error occured while validation',
				errors: dataValidationResult.error.flatten().fieldErrors,
			};
		}

		const isUserExists = await getUserEmail(data.email);

		if (isUserExists) {
			return {
				success: false,
				message: 'Email is already taken',
				error: 'Email is already taken',
			};
		}

		const createNewUser = await createUser(data.email, data.password);
		if (!createNewUser) {
			return {
				success: false,
				message: 'Failed to create user',
				error: 'Failed to create user',
			};
		}

		return {
			success: true,
			message: 'Account created successfully',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occurred while creating your account',
			error: 'An error occured while creating your account',
		};
	}
}
