'use server';

import { getNetBalance as queryNetBalance } from '@/model/accounts';
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
