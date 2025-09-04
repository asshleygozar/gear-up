import { PrismaClient } from '@/lib/generated/prisma';
import { getSession } from '@/lib/session';
import { hash, compare } from 'bcryptjs';
import { cache } from 'react';
const prisma = new PrismaClient();

// Check if user input email exists
export const getUserByEmail = cache(async (email: string) => {
	const findUser = await prisma.users.findUnique({
		where: {
			email: email,
		},
	});

	return findUser;
});

// Get user info (email and password)
export async function getUserInfo(email: string, password: string) {
	const getInfo = await prisma.users.findFirst({
		where: {
			email: email,
			password: password,
		},
	});

	return getInfo;
}

// Insert user info
export async function createUser(
	email: string,
	password: string,
	username: string,
	dateAccountCreated: Date
) {
	const hashedPassword = await hash(password, 10);
	const insertUser = await prisma.users.create({
		data: {
			email: email,
			name: username,
			password: hashedPassword,
			user_account_date_created: dateAccountCreated,
		},
	});

	return insertUser;
}

//Check if password is valid
export async function verifyPassword(
	password: string,
	recordedPassword: string
) {
	return compare(password, recordedPassword);
}

export const getCurrentUser = cache(async () => {
	const cookieSession = await getSession();

	if (!cookieSession) return null;

	try {
		const result = await prisma.users.findUnique({
			where: {
				user_id: cookieSession.userId,
			},
		});

		return result || null;
	} catch (error) {
		console.error(error);
		return null;
	}
});
