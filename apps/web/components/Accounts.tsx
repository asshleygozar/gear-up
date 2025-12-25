import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { useQuery } from '@tanstack/react-query';
import { APIResponse } from '@/utils/types';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

type AccountType = {
	account_id: number;
	account_name: string;
	account_type: string;
	total_balance: number;
	total_income: number;
	total_expense: number;
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

export const NetIncome = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['net-income'],
		queryFn: fetchAccounts,
	});
	return (
		<Card className='col-span-2'>
			<CardHeader>
				<CardTitle>Net Income</CardTitle>
				<CardDescription>Total balance</CardDescription>
				<CardContent>
					{isLoading ? (
						<Skeleton className='w-full' />
					) : (
						<p>
							{data?.data
								?.map((element) => element.total_balance)
								.reduce((preValue, accumulator) => preValue + accumulator)}
						</p>
					)}
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export const TotalExpenses = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['total-expense'],
		queryFn: fetchAccounts,
	});
	return (
		<Card className='row-span-1'>
			<CardHeader>
				<CardTitle>Expenses</CardTitle>
				<CardDescription>Total expenses</CardDescription>
				<CardContent>
					{isLoading ? (
						<Skeleton className='w-full' />
					) : (
						<p>
							{data?.data
								?.map((element) => element.total_expense)
								.reduce((preValue, accumulator) => preValue + accumulator)}
						</p>
					)}
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export const TotalIncome = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['total-income'],
		queryFn: fetchAccounts,
	});
	return (
		<Card className='row-span-1'>
			<CardHeader>
				<CardTitle>Income</CardTitle>
				<CardDescription>Total income balance</CardDescription>
				<CardContent>
					{isLoading ? (
						<Skeleton className='w-full' />
					) : (
						<p>
							{data?.data
								?.map((element) => element.total_income)
								.reduce((preValue, accumulator) => preValue + accumulator)}
						</p>
					)}
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export const Accounts = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Accounts</CardTitle>
				<CardDescription>Your accounts</CardDescription>
			</CardHeader>
			<CardContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<p key={index}>{`Account No. ${index}`}</p>
				))}
			</CardContent>
		</Card>
	);
};
