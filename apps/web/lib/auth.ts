import { signIn } from 'next-auth/react';

export const handleGoogleSignIn = () =>
	signIn('google', {
		callbackUrl: '/dashboard',
	});
