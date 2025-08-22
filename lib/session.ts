import 'server-only';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { cache } from 'react';

interface JWTPayload {
	userId: number;
	[key: string]: string | number | boolean | null | undefined;
}

const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET_TOKEN ||
		'2839b2e8yztbt7178v267e853785ev32863vx76bzx7826z782bw892shajbaosh8&6575bi'
);
const JWT_EXPIRATION = '7d';

async function generateJWT(payload: JWTPayload) {
	return await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRATION)
		.sign(JWT_SECRET);
}

async function verifyJWTToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jose.jwtVerify(token, JWT_SECRET);
		return payload as JWTPayload;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function deleteSession() {
	const sessionCookies = await cookies();
	sessionCookies.delete('user_token');
}

export async function createSession(userId: number) {
	try {
		// Create JWT token with user data
		const token = await generateJWT({ userId });

		const cookieStore = await cookies();
		cookieStore.set({
			name: 'user_token',
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7,
			path: '/',
			sameSite: 'lax',
		});

		return true;
	} catch (error) {
		console.error('Error creating session', error);
		return false;
	}
}

export const getSession = cache(async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('user_token')?.value;

		if (!token) return null;

		const payLoad = await verifyJWTToken(token);
		return payLoad ? { useId: payLoad.userId } : null;
	} catch (error) {
		console.error(error);
	}
});
