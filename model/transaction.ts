import { PrismaClient } from '@/lib/generated/prisma';
import { cache } from 'react';
import { getCurrentUser } from './user';
import { TransactionTypes } from '@/app/api/transaction/route';

const prisma = new PrismaClient();

interface ModelResponse {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
}

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

export async function findAccount(userId: number, accountName: string) {
	const account = await prisma.accounts.findFirst({
		where: {
			user_id: userId,
			account_name: accountName,
		},
	});

	return account;
}

export async function insertTrasaction({
	id,
	accountId,
	transaction,
}: {
	id: number;
	accountId: number;
	transaction: TransactionTypes;
}): Promise<ModelResponse> {
	try {
		const transactions = await prisma.transaction_table.create({
			data: {
				transaction_amount: transaction.amount,
				transaction_category: transaction.category,
				transaction_date: transaction.date,
				transaction_description: transaction.description,
				user_id: id,
				account_id: accountId,
			},
		});

		if (!transactions) {
			return {
				success: false,
				message: 'Failed to create transaction',
			};
		}

		return {
			success: true,
			message: 'Transaction created successfully!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to insert transaction',
			error: 'An error occured while inserting your transation',
		};
	}
}

export async function getAccountIncome({
	id,
	accountId,
}: {
	id: number;
	accountId: number;
}): Promise<ModelResponse | number> {
	try {
		const income = await prisma.accounts.findUnique({
			where: {
				user_id: id,
				account_id: accountId,
			},
		});

		if (!income || income.total_income === null) {
			return {
				success: false,
				message: 'Income balance is null',
			};
		}

		return Number(income.total_income);
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while fetching your income balance',
			error: 'Failed to fetch income data',
		};
	}
}

export async function getAccountExpense({
	id,
	accountId,
}: {
	id: number;
	accountId: number;
}): Promise<ModelResponse | number> {
	try {
		const expense = await prisma.accounts.findUnique({
			where: {
				user_id: id,
				account_id: accountId,
			},
		});

		if (!expense || expense === null) {
			return {
				success: false,
				message: 'Expense balance is null or empty',
			};
		}

		return Number(expense.total_expense);
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: 'Failed to fetch expense data',
			error: 'An error occured whil fetching your income balance data',
		};
	}
}

export async function updateAccountIncome({
	id,
	accountId,
	amount,
}: {
	id: number;
	accountId: number;
	amount: number;
}) {
	const income = await prisma.accounts.update({
		where: {
			account_id: accountId,
			user_id: id,
		},
		data: {
			total_income: amount,
		},
	});

	return income;
}

export async function updateAccountExpense({
	id,
	accountId,
	amount,
}: {
	id: number;
	accountId: number;
	amount: number;
}) {
	const expense = await prisma.accounts.update({
		where: {
			account_id: accountId,
			user_id: id,
		},
		data: {
			total_expense: amount,
		},
	});

	return expense;
}

export async function updateTotalBalance({
	id,
	accountId,
	amount,
}: {
	id: number;
	accountId: number;
	amount: number;
}): Promise<ModelResponse> {
	try {
		const updateAccount = await prisma.accounts.update({
			where: {
				user_id: id,
				account_id: accountId,
			},

			data: {
				total_balance: amount,
			},
		});

		if (!updateAccount) {
			return {
				success: false,
				message: 'Failed to update total account balance',
			};
		}

		return {
			success: true,
			message: 'Update account successfully!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while updating your account',
		};
	}
}
