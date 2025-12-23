import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { useQuery } from '@tanstack/react-query';
import { APIResponse } from '@/utils/types';

type AccountType = {
	account_id: number;
	account_name: string;
	account_type?: string;
	total_balance?: number;
	total_income?: number;
	total_expense?: number;
};

const fetchAccounts = async (): Promise<APIResponse<AccountType[]>> => {
	const response = await fetch('/api/accounts', {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch accounts');
	}
	return response.json();
};

export const AccountSelect = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['accounts'],
		queryFn: fetchAccounts,
	});
	return (
		<Select name='account_id'>
			<SelectTrigger>
				<SelectValue placeholder='Choose account' />
			</SelectTrigger>
			<SelectContent>
				{isLoading && (
					<SelectItem
						value='loading'
						disabled
					>
						Loading...
					</SelectItem>
				)}
				{isError && (
					<SelectItem
						value='error'
						disabled
					>
						Error loading accounts
					</SelectItem>
				)}
				{data?.data?.map((account) => (
					<SelectItem
						key={account.account_id}
						value={account.account_id.toString()}
					>
						{account.account_name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
