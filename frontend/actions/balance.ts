'use server';

import {
	getNetBalance as queryNetBalance,
	getAllIncomes as queryTotalIncome,
	getAllExpenses as queryTotalExpense,
} from '@/model/accounts';
import { ServerResponse } from './response';

export async function getNetBalance(): Promise<ServerResponse<number[]>> {
	try {
		const netBalance = await queryNetBalance();
		if (!netBalance.success || netBalance.data === null) {
			return {
				success: false,
				message: 'No net balance data found!',
			};
		}

		return {
			success: true,
			message: 'Successfull!',
			data: netBalance.data,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: 'An error occured while fetching net balance data',
			error: `${error}`,
		};
	}
}

export async function getTotalIncomes(): Promise<ServerResponse<number[]>> {
	try {
		const netIncome = await queryTotalIncome();

		if (
			!netIncome.success ||
			netIncome.data === null ||
			netIncome.data === undefined
		) {
			return {
				success: false,
				message: 'No net income data found',
			};
		}

		return {
			success: true,
			message: 'Successful!',
			data: netIncome.data,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: ' An error occured whil fetching net income balance',
			error: `${error}`,
		};
	}
}

export async function getTotalExpenses(): Promise<ServerResponse<number[]>> {
	try {
		const netIncome = await queryTotalExpense();

		if (
			!netIncome.success ||
			netIncome.data === null ||
			netIncome.data === undefined
		) {
			return {
				success: false,
				message: 'No net income data found',
			};
		}

		return {
			success: true,
			message: 'Successful!',
			data: netIncome.data,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: ' An error occured whil fetching net income balance',
			error: `${error}`,
		};
	}
}
