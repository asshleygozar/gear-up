import {
	PrismaClient,
	accounts,
	users,
	transaction_table,
} from '@/lib/generated/prisma';
import { cache } from 'react';
import { getCurrentUser } from './user';
import { TransactionTypes } from '@/app/api/transaction/route';

const prisma = new PrismaClient();

interface ModelResponse {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
	data?:
		| accounts[]
		| accounts
		| users[]
		| users
		| transaction_table[]
		| transaction_table
		| number;
}

// Get the current user's account details from the database
export const getUserAccount = cache(async (): Promise<ModelResponse> => {
	try {
		const currentUser = await getCurrentUser();

		if (typeof currentUser === null || !currentUser) {
			return {
				success: false,
				message: 'Cannot find current user',
			};
		}

		const userAccount = await prisma.accounts.findMany({
			where: {
				user_id: currentUser.user_id,
			},
		});

		if (typeof userAccount === null || !userAccount) {
			return {
				success: false,
				message: 'Cannot find user accounts',
			};
		}

		return {
			success: true,
			message: 'Accounts fetched successfully!',
			data: userAccount,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while fetching user accounts',
			error: `${error}`,
		};
	}
});

// Creates a default account (Cash account) upon successful sign up
export async function createDefaultAccount(id: number): Promise<ModelResponse> {
	try {
		const defaultAccount = await prisma.accounts.create({
			data: {
				account_name: 'cash',
				account_type: 'cash',
				total_balance: 0.0,
				total_income: 0.0,
				total_expense: 0.0,
				user_id: id,
			},
		});

		if (!defaultAccount) {
			return {
				success: false,
				message: 'Failed to create your account',
				error: 'Failed to create your account',
			};
		}

		return {
			success: true,
			message: 'Default account created successfully!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while creating your default account',
			error: `${error}`,
		};
	}
}

// Find user account
export async function findAccount(
	userId: number,
	accountName: string
): Promise<ModelResponse> {
	try {
		const account = await prisma.accounts.findFirst({
			where: {
				user_id: userId,
				account_name: accountName,
			},
		});

		if (!account || account === null) {
			return {
				success: false,
				message: 'Failed to find user account. It may not exists',
			};
		}

		return {
			success: true,
			message: 'User account found successfully!',
			data: account.account_id,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while finding user account',
			error: `${error}`,
		};
	}
}

// Creates new transaction
export async function createTrasaction({
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

// Fetch account income
export async function getAccountIncome({
	id,
	accountId,
}: {
	id: number;
	accountId: number;
}): Promise<ModelResponse> {
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

		return {
			success: true,
			message: 'Account income fetched successfully!',
			data: Number(income.total_income),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message:
				'Database Error! An error occured while fetching your income balance',
			error: 'Failed to fetch income data',
		};
	}
}

// Fetch account expense
export async function getAccountExpense({
	id,
	accountId,
}: {
	id: number;
	accountId: number;
}): Promise<ModelResponse> {
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

		return {
			success: false,
			message: 'Account expense fetched successfully!',
			data: Number(expense.total_expense),
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: 'Failed to fetch expense data',
			error:
				'Database Error! An error occured whil fetching your income balance data',
		};
	}
}

// Update account income
export async function updateAccountIncome({
	id,
	accountId,
	amount,
}: {
	id: number;
	accountId: number;
	amount: number;
}): Promise<ModelResponse> {
	try {
		const income = await prisma.accounts.update({
			where: {
				account_id: accountId,
				user_id: id,
			},
			data: {
				total_income: amount,
			},
		});

		if (!income) {
			return {
				success: false,
				message: 'Failed to update your account income',
			};
		}

		return {
			success: true,
			message: 'Account income updated successfully!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Database Error! An error occured while updating your account',
			error: `${error}`,
		};
	}
}

export async function updateAccountExpense({
	id,
	accountId,
	amount,
}: {
	id: number;
	accountId: number;
	amount: number;
}): Promise<ModelResponse> {
	try {
		const expense = await prisma.accounts.update({
			where: {
				account_id: accountId,
				user_id: id,
			},
			data: {
				total_expense: amount,
			},
		});

		if (!expense) {
			return {
				success: false,
				message: 'Failed to update your expense account',
			};
		}

		return {
			success: true,
			message: 'Account expense updated successfully!',
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message:
				'Database Error! An error occured while updating your expense account',
			error: `${error}`,
		};
	}
}

// Update total balance
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
