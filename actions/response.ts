export type ServerResponse<T = undefined> = {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
	errors?: Record<string, string[]>;
};
