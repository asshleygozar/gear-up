import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	try {
		const { pathname } = request.nextUrl;
		const token = request.cookies.get('token')?.value;
		const protectedRoutes = ['/dashboard'];
		const publicRoutes = ['/', '/signin', '/signup'];
		const isProtectedRoutes = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		const isPublic = publicRoutes.includes(pathname);

		if (!token) {
			if (isProtectedRoutes) {
				return NextResponse.redirect(new URL('/signin', request.url));
			}
			return NextResponse.next();
		}
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

		if (!response.ok) {
			if (isProtectedRoutes) {
				NextResponse.redirect(new URL('/signin', request.url));
			}

			return NextResponse.next();
		}
		if (response.ok && isPublic) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/', '/signin', '/signup', '/dashboard/:path*'],
};
