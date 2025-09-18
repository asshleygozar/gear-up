import { getNetBalance } from '@/model/accounts';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const balance = await getNetBalance();

		if (!balance.success || balance.data === null) {
			return NextResponse.json(
				{ success: false, message: 'No net balance found!', data: [] },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ success: true, message: 'Sucessful!', data: balance.data },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, message: 'Server side error', data: [] },
			{ status: 500 }
		);
	}
}
