import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const apiResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/signup`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		const data = await apiResponse.json();

		if (!apiResponse.ok)
			return NextResponse.json(data, { status: apiResponse.status });

		const response = await NextResponse.json(data);
		response.cookies.set('token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/',
		});

		return response;
	} catch (error) {
		console.error('Server error: ', error);
	}
}
