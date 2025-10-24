import { Response, Request } from 'express';
import * as jose from 'jose';

interface JWTPayload {
	userId: number;
	[key: string]: string | number | boolean | null | undefined;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_TOKEN);
const JWT_EXPIRATION = '7d';
const COOKIE_NAME = 'gear_up_user_token';

async function generateJWT(payload: JWTPayload) {
	return await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRATION)
		.sign(JWT_SECRET);
}

export async function createSession({
	userId,
	response,
}: {
	userId: number;
	response: Response;
}) {
	try {
		const token = await generateJWT({ userId });

		response.cookie(COOKIE_NAME, token, {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
			path: '/',
			sameSite: 'lax',
		});

		return true;
	} catch (error) {
		console.error('Error creation: ', error);
		return false;
	}
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

export async function deleteSession(response: Response) {
	response.clearCookie(COOKIE_NAME, {
		path: '/',
		httpOnly: true,
	});
}

export const getSession = async (request: Request) => {
	try {
		const token = request.cookies[COOKIE_NAME];

		if (!token) return null;

		const payLoad = await verifyJWTToken(token);
		return payLoad ? { userId: payLoad.userId } : null;
	} catch (error) {
		console.error('Error accessing cookie session: ', error);
		return null;
	}
};
