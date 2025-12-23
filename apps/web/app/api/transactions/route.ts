import { getToken } from '@/utils/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const token = await getToken();

		const apiResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/transactions/create`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
			}   
		);

		const data = await apiResponse.json();

		if (!apiResponse.ok || !data.success) {
			return NextResponse.json(data, { status: apiResponse.status });
		}

		return NextResponse.json(data, { status: apiResponse.status });
	} catch (error) {
		if (error) {
			return NextResponse.json({
				success: false,
				message: 'Server error',
			});
		}
	}
}
