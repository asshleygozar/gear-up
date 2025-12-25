export type APIResponse<T = unknown> = {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
	errors?: ValidationIssue[];
};

export type ValidationIssue = {
	field: string;
	message: string;
};

export type TransactionType = {
	transaction_id?: number;
	transaction_amount: string;
	account_id: string;
	transaction_type: string;
	transaction_category: string;
	transaction_date: string;
	transaction_description?: string;
};
