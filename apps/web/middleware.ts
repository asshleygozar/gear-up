import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from './env';

export async function middleware(request: NextRequest) {
	try {
		const protectedRoutes = ['/dashboard'];

		const isProtectedRoutes = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		if (!isProtectedRoutes) return NextResponse.next();

		const response = await fetch(
			`${env.NEXT_PUBLIC_API_ORIGIN}/auth/validate`,
			{
				method: 'POST',
				credentials: 'include',
			}
		);

		if (response.status === 401)
			return NextResponse.redirect(new URL('/signin', request.url));
		NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
