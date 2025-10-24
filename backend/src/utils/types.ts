export type ServerResponseProps = {
	success: boolean;
	message: string;
	error?: string;
	errors?: Record<string, string[]>;
};
