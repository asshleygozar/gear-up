import 'dotenv/config.js';
import { PrismaClient, users } from '../../generated/prisma/client.js';
import { hash, compare } from 'bcryptjs';
import { ModelResponse } from '../utils/response.js';

const prisma = new PrismaClient();

// Query user info
type UserCredentials = Pick<users, 'email' | 'password' | 'user_id'>;
export async function getUserInfo(
	email: string
): Promise<ModelResponse<UserCredentials>> {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email: email,
			},
			select: {
				user_id: true,
				email: true,
				password: true,
			},
		});

		if (!user)
			return {
				success: false,
				message: 'User not found',
				data: undefined,
				error: 'No user found',
			};

		return {
			success: true,
			message: 'User found',
			data: user,
		};
	} catch (error) {
		console.error('An error occured: ', error);
		return {
			success: false,
			message: 'Failed to query',
			data: undefined,
			error: 'Database error',
		};
	}
}

export async function verifyPassword({
	password,
	recordedPassword,
}: {
	password: string;
	recordedPassword: string;
}): Promise<ModelResponse> {
	try {
		const isPasswordValid = await compare(password, recordedPassword);

		if (!isPasswordValid)
			return {
				success: false,
				message: 'Invalid password',
			};

		return {
			success: true,
			message: 'Valid password',
		};
	} catch (error) {
		console.error('An error occured: ', error);
		return {
			success: false,
			message: 'Failed to verify password',
			error: 'Server error',
		};
	}
}
