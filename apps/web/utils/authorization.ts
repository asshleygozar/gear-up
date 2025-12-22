import { redirect } from 'next/navigation';

export const isAuthorized = async (statusCode: number) => {
	if (statusCode === 401 || statusCode === 403) {
		redirect('/');
	}
};
