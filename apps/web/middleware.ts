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

		if (!token) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}
		if (response.ok && isPublic) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
		if (response.status === 401 || response.status === 403) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}
		if (!isProtectedRoutes) {
			return NextResponse.next();
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/', '/signin', '/signup', '/dashboard/:path*'],
};
