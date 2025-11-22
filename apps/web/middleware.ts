import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	try {
		const token = request.cookies.get('token');
		const protectedRoutes = ['/dashboard'];
		const isProtectedRoutes = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		if (!isProtectedRoutes) return NextResponse.next();
		if (!token) return NextResponse.redirect(new URL('/signin', request.url));
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/validate`,
			{
				method: 'POST',
				headers: {
					Cookie: `token=${token}`,
				},
				credentials: 'include',
			}
		);

		if (response.status === 401)
			return NextResponse.redirect(new URL('/signin', request.url));
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
