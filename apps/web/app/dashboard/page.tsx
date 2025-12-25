'use client';
import {
	Accounts,
	NetIncome,
	TotalExpenses,
	TotalIncome,
} from '@/components/Accounts';
import { TransactionsCard } from '@/components/TransactionsCard';

function Home() {
	return (
		<div className='xl:h-screen lg:h-full w-full bg-background-color grid gap-4 p-8'>
			<section className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4'>
				<NetIncome />
				<Accounts />
			</section>
			<section className='grid grid-cols-3 grid-rows-[repeat(2,200px)] gap-4'>
				<TotalIncome />
				<TotalExpenses />
				<TransactionsCard />
			</section>
		</div>
	);
}

export default Home;
