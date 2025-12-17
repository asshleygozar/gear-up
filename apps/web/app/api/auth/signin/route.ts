import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();

		const apiResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/signin`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);

		const data = await apiResponse.json();

		if (!apiResponse.ok || !data.success) {
			return NextResponse.json(data, { status: apiResponse.status });
		}

		const response = NextResponse.json(data);
		response.cookies.set('token', data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/',
		});
		return response;
	} catch (error) {
		if (error) {
			return NextResponse.json({
				success: false,
				message: 'An error occured',
			});
		}
	}
};
