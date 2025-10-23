import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserSession } from '@/model/user';
import {
	findAccount,
	getAccountExpense,
	getAccountIncome,
	updateAccountExpense,
	updateAccountIncome,
	updateTotalBalance,
} from '@/model/accounts';
import { createTransaction } from '@/model/transaction';
import { ServerResponse } from '@/actions/response';

export type TransactionTypes = {
	amount: number;
	type: string;
	account: string;
	category: string;
	date: Date;
	description?: string | null;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
	const body = await request.json();
	const user = await getCurrentUserSession();

	// destructure to get the incoming payload
	const { amount, type, account, category, date, description } = body;

	if (!user || !user.data?.user_id) {
		return NextResponse.json(
			{
				success: false,
				message: 'Unauthorized user',
				error: 'No user ID found',
			},
			{ status: 401 }
		);
	}

	// Parse the amount into number
	const parseAmount = Number(amount);

	// Convert to date
	const parseDate = new Date(date);

	// Find the account id number
	const userAccount = await findAccount(user.data.user_id, account);

	// Checks if the user account exists
	if (
		!userAccount ||
		!userAccount.data ||
		typeof userAccount.data !== 'number'
	) {
		return NextResponse.json({
			success: false,
			message: 'Account not found',
			error: 'Account does not exists',
		});
	}

	// Transaction payload types
	const transactionPayload: TransactionTypes = {
		amount: parseAmount,
		type: type,
		account: account,
		category: category,
		date: parseDate,
		description: description,
	};

	// Insert new transaction
	const transaction = await createTransaction({
		id: user.data.user_id,
		accountId: userAccount.data,
		transaction: transactionPayload,
	});

	if (!transaction.success) {
		return NextResponse.json(
			{ success: false, message: `Creating transaction failed` },
			{ status: 401 }
		);
	}

	// Checks the type if income or expense and update the account balance
	const updateAccount = await updateAccountTransaction({
		userId: user.data.user_id,
		accountId: userAccount.data,
		amount: transactionPayload.amount,
		type: transactionPayload.type,
	});

	if (!updateAccount.success) {
		return NextResponse.json(
			{ success: false, message: 'Failed to update user account' },
			{ status: 401 }
		);
	}

	// Update current total balance
	const currentBalance = await updateCurrentTotalBalance({
		userId: user.data.user_id,
		accountId: userAccount.data,
	});

	if (!currentBalance.success) {
		return NextResponse.json(
			{ success: false, message: currentBalance.message },
			{ status: 401 }
		);
	}

	// Return success if all meets the validation
	return NextResponse.json(
		{
			success: true,
			message: 'Transaction updated successfully!',
		},
		{ status: 200 }
	);
}

// User transaction account type
type TransactionAccountType = {
	userId: number;
	accountId: number;
	amount: number;
	type?: string;
};

type UserAccountType = {
	userId: number;
	accountId: number;
};

async function updateCurrentTotalBalance({
	userId,
	accountId,
}: UserAccountType): Promise<ServerResponse> {
	const income = await getAccountIncome({ id: userId, accountId: accountId });
	const expense = await getAccountExpense({ id: userId, accountId: accountId });

	// Checks if type of number
	if (typeof income !== 'number' || typeof expense !== 'number') {
		return {
			success: false,
			message: 'Invalid value format',
			error: 'Failed to fetch income or expense balance',
		};
	}

	// Checks if fetching is successful
	if (income === null || expense === null) {
		return {
			success: false,
			message: 'Income or Expense balance could be null',
		};
	}

	// Insert amount to total balance
	const totalBalance = income - expense;
	const newBalance = await updateTotalBalance({
		id: userId,
		accountId: accountId,
		amount: totalBalance,
	});

	if (!newBalance.success) {
		return {
			success: false,
			message: 'Failed to update the total balance',
		};
	}

	return {
		success: true,
		message: 'Total balance updated successfully!',
	};
}

async function updateAccountTransaction({
	userId,
	accountId,
	amount,
	type,
}: TransactionAccountType): Promise<ServerResponse> {
	switch (type) {
		case 'income':
			const previousIncome = await getAccountIncome({
				id: userId,
				accountId: accountId,
			});
			if (typeof previousIncome !== 'number') {
				return {
					success: false,
					message: 'Failed to fetch income balance',
				};
			}

			const newIncome = previousIncome + amount;
			const income = await updateAccountIncome({
				id: userId,
				accountId: accountId,
				amount: newIncome,
			});

			if (!income) {
				return {
					success: false,
					message: 'Failed to update income balance',
				};
			}

			return {
				success: true,
				message: 'Income balance updated successfully!',
			};

		case 'expense':
			const previousExpense = await getAccountIncome({
				id: userId,
				accountId: accountId,
			});
			if (typeof previousExpense !== 'number') {
				return {
					success: false,
					message: 'Failed to fetch income balance',
				};
			}

			const newExpense = previousExpense + amount;
			const expense = await updateAccountExpense({
				id: userId,
				accountId: accountId,
				amount: newExpense,
			});

			if (!expense) {
				return {
					success: false,
					message: 'Failed to update the expense balance',
				};
			}

			return {
				success: true,
				message: 'Expense balance updated successfully!',
			};
		default:
			return {
				success: false,
				message: 'Invalid transaction type!',
				error: 'Invalid transaction type!',
			};
	}
}
