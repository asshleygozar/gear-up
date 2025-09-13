export type ServerResponse = {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
};
