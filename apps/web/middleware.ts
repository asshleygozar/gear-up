import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	try {
		const pathName = request.nextUrl.pathname;
		const token = request.cookies.get('token')?.value;
		const protectedRoutes = ['/dashboard'];
		const unAuthenticatedPaths = ['/', '/signin', '/signup'];
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
					Authorization: `Bearer ${token}`,
				},
				credentials: 'include',
			}
		);

		if (response.ok && unAuthenticatedPaths.includes(pathName)) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		if (response.status === 401 || response.status === 403) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
