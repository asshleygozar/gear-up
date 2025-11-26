import 'server-only';
import * as z from 'zod';

export const envSchema = z.object({
	NEXT_PUBLIC_API_ORIGIN: z.string(),
	NEXT_AUTH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
});
export type EnvType = z.infer<typeof envSchema>;

let env: EnvType;

try {
	env = envSchema.parse(process.env);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error('Invalid environment variables');
		console.error(JSON.stringify(error.flatten().fieldErrors));
		error.issues.forEach((err) => {
			const path = err.path.join('.');
			console.error(`${path}: ${err.message}`);
		});
		process.exit(1);
	}

	throw error;
}

export { env };
