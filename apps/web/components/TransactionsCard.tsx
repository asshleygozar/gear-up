import { APIResponse, TransactionType } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';

const fetchTransactions = async (): Promise<APIResponse<TransactionType[]>> => {
	const response = await fetch('/api/transactions', {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch accounts');
	}

	return response.json();
};

export const TransactionsCard = () => {
	const { data, isPending } = useQuery({
		queryKey: ['transactions'],
		queryFn: fetchTransactions,
	});

	const dateNow = new Date().toISOString().slice(0, 10);
	return (
		<Card className='row-span-2'>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>See history</CardDescription>
			</CardHeader>
			<CardContent className='overflow-y-auto'>
				{isPending &&
					Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} />)}
				{data?.data
					?.filter(
						(transaction) =>
							transaction.transaction_date.slice(0, 10) === dateNow
					)
					.map((transaction) => (
						<div
							key={transaction.transaction_id}
							className='flex justify-between p-2 border-b-2'
						>
							<div className='flex gap-3 items-center'>
								<Avatar>
									<AvatarImage src={'/globe.svg'} />
								</Avatar>
								<div>
									<h1 className='text-[0.9rem]'>
										{`${transaction.transaction_category
											.at(0)
											?.toUpperCase()}${transaction.transaction_category.slice(
											1
										)}`}
									</h1>
									<h2 className='text-[0.8rem] text-popover-foreground'>
										{transaction.transaction_description}
									</h2>
								</div>
							</div>
							<div>
								<h1 className='text-[0.9rem]'>
									{transaction.transaction_type === 'income' ? (
										<span className='text-green-400'>
											{transaction.transaction_amount}
										</span>
									) : transaction.transaction_type === 'expense' ? (
										<span className='text-red-500'>
											{'-'}
											{transaction.transaction_amount}
										</span>
									) : (
										<span className='text-blue-500'>
											{transaction.transaction_amount}
										</span>
									)}
								</h1>
								<h2 className='text-[0.8rem] text-popover-foreground'>
									Date & Time
								</h2>
							</div>
						</div>
					))}
			</CardContent>
		</Card>
	);
};
