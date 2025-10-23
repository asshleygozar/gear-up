'use server';

import * as z from 'zod';
import {
	createUser,
	verifyPassword,
	getUserInfo,
	getUserByEmail,
} from '@/model/user';
import { createSession } from '../lib/session';
import { createDefaultAccount } from '@/model/accounts';

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

// Sign in server action
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

		const user = await getUserInfo(data.email);

		if (!user || user.data === null || typeof user.data !== 'object') {
			return {
				success: false,
				message: 'Invalid email or password',
				errors: {
					email: ['Invalid email or password'],
				},
			};
		}

		const isPasswordValid = await verifyPassword(
			data.password,
			user.data.password ?? ''
		);

		if (!isPasswordValid.success) {
			return {
				success: false,
				message: 'Invalid username or password',
				error: 'Invalid username or password',
			};
		}

		await createSession(user.data.user_id);

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

// Sign up server action
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

		const isUserExists = await getUserByEmail(data.email);

		if (isUserExists) {
			return {
				success: false,
				message: 'Email is already taken',
				error: 'Email is already taken',
			};
		}

		const dateAccountCreated = new Date();
		const username = data.email.split('@')[0];
		const createNewUser = await createUser(
			data.email,
			username,
			data.password,
			dateAccountCreated
		);
		if (
			!createNewUser.success ||
			createNewUser.data === null ||
			typeof createNewUser.data !== 'object' ||
			createNewUser.data === undefined
		) {
			return {
				success: false,
				message: 'Failed to create user',
				error: 'Failed to create user',
			};
		}

		const createAccount = await createDefaultAccount(
			createNewUser.data.user_id
		);

		if (!createAccount.success) {
			return {
				success: false,
				message: 'Failed to create default account',
				error: 'Failed to create default account',
			};
		}

		await createSession(createNewUser.data.user_id);

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
