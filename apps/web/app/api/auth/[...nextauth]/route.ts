import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env';
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
