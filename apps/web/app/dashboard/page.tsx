'use client';
import { NetIncome, TotalExpenses, TotalIncome } from '@/components/Accounts';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

function Home() {
	return (
		<div className='xl:h-screen lg:h-full w-full bg-background-color grid xl:grid-rows-[210px_minmax(0,1fr)] lg:grid-rows-auto-fit gap-4 p-8'>
			<section className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4 h-full'>
				<NetIncome />
				<TotalExpenses />
				<TotalIncome />
			</section>
			<section className='grid lg:grid-cols-1 gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>History Transactions</CardTitle>
						<CardDescription>See recent transactions</CardDescription>
					</CardHeader>
				</Card>
			</section>
		</div>
	);
}

export default Home;
