export type ModelResponse<T = unknown> = {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
	data?: T;
};
