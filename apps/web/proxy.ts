import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Validate if has token on the middleware and do the proper validation on the dashboard instead using fetch
export default function proxy(request: NextRequest) {
	try {
		const { pathname } = request.nextUrl;
		const token = request.cookies.get('token')?.value;
		const protectedRoutes = ['/dashboard'];
		const publicRoutes = ['/'];
		const authRoutes = ['/signin', '/signup'];

		const isProtectedRoute = protectedRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route),
		);
		const isPublicRoute = publicRoutes.includes(pathname);
		const isAuthRoute = authRoutes.some((route) =>
			request.nextUrl.pathname.startsWith(route),
		);

		// Checks if has token + on landing page or auth page then automatically redirects to dashboard
		if (token && (isPublicRoute || isAuthRoute)) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		// Checks if no token and accessing protected routes
		if (!token && isProtectedRoute) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		// Checks if the incoming request is proxy and will rewrite current api proxy to the actual server path
		if (request.nextUrl.pathname.startsWith('/api')) {
			const requestHeaders = new Headers(request.headers);

			if (token) requestHeaders.set('Authorization', `Bearer ${token}`);
			const apiPath = request.nextUrl.pathname.replace(/^\/api/, '');
			const targetURL = new URL(
				`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/${apiPath}`,
			);

			return NextResponse.rewrite(targetURL, {
				request: {
					headers: requestHeaders,
				},
			});
		}

		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/', '/signin', '/signup', '/dashboard/:path*', '/api/:path*'],
};
