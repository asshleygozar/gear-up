import { PrismaClient } from '@/lib/generated/prisma';
import { cache } from 'react';
import { getCurrentUser } from './user';

const prisma = new PrismaClient();

// Get the current user's account details from the database
export const getUserAccount = cache(async () => {
	const currentUser = await getCurrentUser();
	const userAccount = await prisma.accounts.findMany({
		where: {
			user_id: currentUser?.user_id,
		},
	});

	return userAccount;
});

// Creates a default account (Cash account) upon successful sign up
export async function createDefaultAccount(id: number) {
	const defaultAccount = await prisma.accounts.create({
		data: {
			account_name: 'Cash',
			account_type: 'Cash',
			total_balance: 0.0,
			total_income: 0.0,
			total_expense: 0.0,
			user_id: id,
		},
	});

	return defaultAccount;
}
