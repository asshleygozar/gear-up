import { NextResponse } from 'next/server';
import { getToken } from '@/utils/auth';

export async function GET() {
	try {
		const token = await getToken();
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/accounts/`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('An error occurred: ', error);
		return NextResponse.json(
			{ error: 'Failed to fetch accounts' },
			{ status: 500 },
		);
	}
}
