import { getUserInfo, verifyPassword } from '../model/user.js';
import { SignInSchema } from '../lib/auth.js';
import { Request, Response } from 'express';
import { createSession } from '../lib/session.js';

export async function signIn(request: Request, response: Response) {
	try {
		if (!request.body) {
			return response.status(400).json({
				success: false,
				message: 'No request body provided',
				error: 'Invalid request',
			});
		}

		const { email, password } = request.body;
		const data = {
			email: email as string,
			password: password as string,
		};

		const validation = SignInSchema.safeParse(data);

		if (!validation.success) {
			return response
				.json({
					success: false,
					message: 'Validation failed',
					error: 'Invalid format',
					errors: validation.error.flatten().fieldErrors,
				})
				.end();
		}

		const user = await getUserInfo(data.email);

		if (!user.success || !user.data)
			return response.json({
				success: false,
				message: 'Failed to find user',
				error: 'User not found',
			});

		const isPasswordValid = await verifyPassword({
			password: data.password,
			recordedPassword: user.data.password ?? '',
		});

		if (!isPasswordValid.success)
			return response.json({
				success: false,
				message: 'Failed to validate password',
				error: 'Invalid password',
			});

		await createSession({ userId: user.data.user_id, response: response });

		return response.json({ success: true, message: 'Signed in successfully!' });
	} catch (error) {
		console.error('Server error: ', error);
		return response.status(500).json({
			success: false,
			message: 'Authentication failed',
			error: 'Server error',
		});
	}
}
