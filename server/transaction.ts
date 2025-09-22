'use server';
import { transaction_table } from '@/lib/generated/prisma';
import { ServerResponse } from './response';
import { getAllTransactions as queryAllTransactions } from '@/model/transaction';

export async function getAllTransactions(): Promise<
	ServerResponse<transaction_table[]>
> {
	try {
		const transactions = await queryAllTransactions();
		if (!transactions.success || transactions.data === null) {
			return {
				success: false,
				message: 'No transaction found',
			};
		}

		return {
			success: true,
			message: 'Successful!',
			data: transactions.data,
		};
	} catch (error) {
		console.error('An error occured: ', error);
		return {
			success: false,
			message: 'Server error',
			error: `Server side error ${error}`,
		};
	}
}
