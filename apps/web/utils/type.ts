export type APIResponse = {
	success: boolean;
	message: string;
	error?: string;
	errors?: ValidationIssue[];
};

export type ValidationIssue = {
	field: string;
	message: string;
};
