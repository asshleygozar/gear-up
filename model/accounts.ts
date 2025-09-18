import { PrismaClient } from '@/lib/generated/prisma';
import { ModelResponse } from './response';
import { getCurrentUserSession } from './user';

const prisma = new PrismaClient();

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
