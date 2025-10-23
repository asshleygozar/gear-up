import { PrismaClient, transaction_table } from '@/lib/generated/prisma';
import { TransactionTypes } from '@/app/api/transaction/route';
import { ModelResponse } from './response';
import { getCurrentUserSession } from './user';

const prisma = new PrismaClient();

// Creates new transaction
export async function createTransaction({
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

export async function getAllTransactions(): Promise<
	ModelResponse<transaction_table[]>
> {
	try {
		const userId = await getCurrentUserSession();
		if (!userId.data || userId.data === null) {
			return {
				success: false,
				message: 'User not found! Session expired',
			};
		}

		const transactions = await prisma.transaction_table.findMany({
			where: {
				user_id: userId.data.user_id,
			},
		});

		return {
			success: true,
			message: 'Query successful!',
			data: transactions,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'Failed to query transactions',
			error: ` An error occured: ${error}`,
		};
	}
}
