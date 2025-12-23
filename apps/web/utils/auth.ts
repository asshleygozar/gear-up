import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getToken = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	return token;
};

export const isAuthorized = async (statusCode: number) => {
	if (statusCode === 401 || statusCode === 403) {
		redirect('/');
	}
};
