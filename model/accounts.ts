import { accounts, PrismaClient } from '@/lib/generated/prisma';
import { ModelResponse } from './response';
import { getCurrentUserSession } from './user';
import { cache } from 'react';

const prisma = new PrismaClient();

// Get the current user's account details from the database
export const getUserAccount = cache(
	async (): Promise<ModelResponse<accounts[]>> => {
		try {
			const currentUser = await getCurrentUserSession();

			if (typeof currentUser.data === null || !currentUser.data) {
				return {
					success: false,
					message: 'Cannot find current user',
				};
			}

			const userAccount = await prisma.accounts.findMany({
				where: {
					user_id: currentUser.data.user_id,
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
	}
);

// Find user account
export async function findAccount(
	userId: number,
	accountName: string
): Promise<ModelResponse<number>> {
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

// Get Total Balance
export async function getNetBalance(): Promise<ModelResponse<number[]>> {
	try {
		const userId = await getCurrentUserSession();

		if (!userId.data || userId.data === null) {
			return {
				success: false,
				message: 'User not found! Session expired',
			};
		}

		const accounts = await prisma.accounts.findMany({
			where: {
				user_id: userId.data.user_id,
			},
		});

		if (!accounts) {
			return {
				success: false,
				message: 'No accounts found with this user',
			};
		}

		const netBalance = accounts.map((balance) => Number(balance.total_balance));
		return {
			success: true,
			message: 'Successful query!',
			data: netBalance,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while querying net balance',
			error: `${error}`,
		};
	}
}


// Get all total incomes per account
export async function getAllIncomes(): Promise<ModelResponse<number[]>> {
	try {
		const userId = await getCurrentUserSession();

		if (!userId.data || userId.data === null) {
			return {
				success: false,
				message: 'User not found! Session expired',
			};
		}

		const accounts = await prisma.accounts.findMany({
			where: {
				user_id: userId.data.user_id,
			},
		});

		if (!accounts) {
			return {
				success: false,
				message: 'No accounts found with this user',
			};
		}

		const incomes = accounts.map((balance) => Number(balance.total_income));

		return {
			success: true,
			message: 'Successful query!',
			data: incomes,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while querying total incomes',
			error: `${error}`,
		};
	}
}

export async function getAllExpenses(): Promise<ModelResponse<number[]>> {
	try {
		const userId = await getCurrentUserSession();
		if (!userId.data || userId.data === null) {
			return {
				success: false,
				message: 'User not found! Session expired',
			};
		}

		const accounts = await prisma.accounts.findMany({
			where: {
				user_id: userId.data.user_id,
			},
		});

		if (!accounts) {
			return {
				success: false,
				message: 'No accounts find with this user',
			};
		}

		const expenses = accounts.map((expense) => Number(expense.total_expense));

		return {
			success: true,
			message: 'Successful query!',
			data: expenses,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while querying total expenses',
		};
	}
}


// User Id and User Account Id types
type UserAccountProps = {
	id: number;
	accountId: number;
};

// Get current account balance
export async function getAccountBalance({
	id,
	accountId,
}: UserAccountProps): Promise<ModelResponse<number>> {
	try {
		const accountBalance = await prisma.accounts.findUnique({
			where: {
				user_id: id,
				account_id: accountId,
			},
		});

		if (!accountBalance || accountBalance.total_balance === null) {
			return {
				success: false,
				message: 'Failed to fetch account balance it could be null',
			};
		}

		return {
			success: true,
			message: 'Account balance fetched successfully!',
			data: Number(accountBalance.total_balance),
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to fetch account balance ',
			error:
				'Database error! An error occured while fetching you account balance',
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
}): Promise<ModelResponse<number>> {
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
}): Promise<ModelResponse<number>> {
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
