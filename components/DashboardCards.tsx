'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getNetBalance } from '@/server/balance';

export default function NetBalance() {
	const fetchData = async () => {
		const data = await getNetBalance();
		if (!data.success || data.data === null) {
			return [];
		}

		return Array.isArray(data.data) ? data.data : [];
	};

	const { data = [], isPending } = useQuery({
		queryKey: ['net-balance'],
		queryFn: fetchData,
	});

	const total = Array.isArray(data)
		? data.reduce((acc, val) => acc + val, 0)
		: 0;

	return (
		<Card className='relative'>
			<CardHeader>
				<CardTitle>Net Balance</CardTitle>
			</CardHeader>
			<CardContent>
				{isPending ? (
					<Skeleton className='h-10 w-full' />
				) : (
					<p className='text-3xl'>$ {total}</p>
				)}
			</CardContent>
			<CardFooter className='absolute bottom-5 right-1'>
				{format(new Date(), 'MMMM dd, yyyy')}
			</CardFooter>
		</Card>
	);
}
