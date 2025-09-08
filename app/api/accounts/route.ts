import { getUserAccount } from '@/model/transaction';
import { NextResponse } from 'next/server';

export async function GET() {
	const userAccounts = await getUserAccount();

	if (!userAccounts) {
		return NextResponse.json(
			{ message: 'No accounts found.' },
			{ status: 404 }
		);
	}

	return NextResponse.json(userAccounts, { status: 200 });
}
