import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	try {
		const token = request.cookies.get('token')?.value;
		const protectedRoutes = ['/dashboard'];
		const publicRoutes = ['/'];
		const authRoutes = ['/signin', '/signup'];

		const isProtectedRoute = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		const isPublicRoutes = publicRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		const isAuthRoute = authRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);

		// Checks if has token + on landing page or auth page then if token is valid, redirects to dashboard
		if (token && (isPublicRoutes || isAuthRoute)) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		// Checks is no token and accessing protected routes
		if (!token && isProtectedRoute) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		// Checks if has token and accessing protected routes
		if (token && isProtectedRoute) {
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
				return NextResponse.redirect(new URL('/signin', request.url));
			}
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/', '/signin', '/signup', '/dashboard/:path*'],
};
