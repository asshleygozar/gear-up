import { PrismaClient, users } from '@/lib/generated/prisma';
import { getSession } from '@/lib/session';
import { hash, compare } from 'bcryptjs';
import { cache } from 'react';
import { ModelResponse } from './response';
const prisma = new PrismaClient();

// Gte current user session
export const getCurrentUserSession = cache(
	async (): Promise<ModelResponse<users>> => {
		try {
			const cookieSession = await getSession();

			if (!cookieSession || cookieSession === null) {
				return {
					success: false,
					message: 'No current user session',
				};
			}

			const result = await prisma.users.findUnique({
				where: {
					user_id: cookieSession.userId,
				},
			});

			if (!result || result.user_id === null || result.user_id === undefined) {
				return {
					success: false,
					message: 'No current user session found',
				};
			}

			return {
				success: true,
				message: 'Session fetching successful!',
				data: result,
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: 'Query failed',
				error: `${error}`,
			};
		}
	}
);

// Get user by their email
export const getUserByEmail = cache(
	async (email: string): Promise<ModelResponse<string>> => {
		try {
			const userEmail = await prisma.users.findUnique({
				where: {
					email: email,
				},
			});

			if (!userEmail || userEmail.email === null) {
				return {
					success: false,
					message: 'Failed to query email data',
				};
			}

			return {
				success: true,
				message: 'Email queried successfully!',
				data: userEmail.email,
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: 'Query data failed',
				error: `${error}`,
			};
		}
	}
);

// Get user info (email and password)
export async function getUserInfo(
	email: string
): Promise<ModelResponse<users>> {
	try {
		const userInfo = await prisma.users.findUnique({
			where: {
				email: email,
			},
		});

		if (!userInfo || userInfo === null || userInfo === undefined) {
			return {
				success: false,
				message: 'Data could null or do not exists',
			};
		}

		return {
			success: true,
			message: 'Data queried successfully!',
			data: userInfo,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Query failed',
			error: `${error}`,
		};
	}
}

// Insert user info
export async function createUser(
	email: string,
	username: string,
	password: string,
	dateAccountCreated: Date
): Promise<ModelResponse<users>> {
	try {
		const hashedPassword = await hash(password, 10);
		const insertUser = await prisma.users.create({
			data: {
				email: email,
				name: username,
				password: hashedPassword,
				user_account_date_created: dateAccountCreated,
			},
		});

		if (!insertUser) {
			return {
				success: false,
				message: 'Failed to created user',
			};
		}

		return {
			success: true,
			message: 'User created successfully!',
			data: insertUser,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'User creation failed',
			error: `${error}`,
		};
	}
}

//Check if password is valid
export async function verifyPassword(
	password: string,
	recordedPassword: string
): Promise<ModelResponse> {
	try {
		const isPasswordValid = await compare(password, recordedPassword);

		if (!isPasswordValid) {
			return {
				success: false,
				message: 'Invalid password',
			};
		}

		return {
			success: true,
			message: 'Password verified!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Verification failed',
			error: `${error}`,
		};
	}
}

