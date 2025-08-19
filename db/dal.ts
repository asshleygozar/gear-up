import { PrismaClient } from '@/lib/generated/prisma';
import { hash, compare } from 'bcryptjs';
const prisma = new PrismaClient();

// Check if user input email exists
export async function getUserEmail(email: string) {
	const findUser = await prisma.users.findFirst({
		where: {
			email: email,
		},
	});

	return findUser;
}

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
export async function createUser(email: string, password: string) {
	const hashedPassword = await hash(password, 10);
	const insertUser = await prisma.users.create({
		data: {
			email: email,
			password: hashedPassword,
		},
	});

	return insertUser;
}
