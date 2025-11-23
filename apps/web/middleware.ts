import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Validate if has token on the middleware and do the proper validation on the dashboard instead using fetch
export async function middleware(request: NextRequest) {
	try {
		const { pathname } = request.nextUrl;
		const token = request.cookies.get('token')?.value;
		const protectedRoutes = ['/dashboard'];
		const publicRoutes = ['/'];
		const authRoutes = ['/signin', '/signup'];

		const isProtectedRoute = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);
		const isPublicRoute = publicRoutes.includes(pathname);
		const isAuthRoute = authRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route)
		);

		// Checks if has token + on landing page or auth page then automatically redirects to dashboard
		if (token && (isPublicRoute || isAuthRoute)) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		// Checks if no token and accessing protected routes
		if (!token && isProtectedRoute) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/', '/signin', '/signup', '/dashboard/:path*'],
};
