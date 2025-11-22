export const env = {
	NEXT_PUBLIC_API_ORIGIN:
		process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:8080',
	NODE_ENV: process.env.NODE_ENV || 'development',
	APP_STAGE: process.env.APP_STAGE || 'dev',
};

