'use client';
import { format } from 'date-fns';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import user from '@/utils/accounts';
import NetBalance from '@/components/DashboardCards';

function Home() {
	return (
		<div className='xl:h-screen lg:h-full w-full bg-background-color grid xl:grid-rows-[210px_minmax(0,_1fr)] lg:grid-rows-auto-fit gap-[1rem] p-[2rem]'>
			<section className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-[1rem] h-full'>
				<NetBalance />
				<Card className='relative'>
					<CardHeader>
						<CardTitle>Total income</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-3xl'>$ {user[0].accounts[0].cash.totalIncome}</p>
					</CardContent>
					<CardFooter className='absolute bottom-5 right-1'>
						{format(new Date(), 'MMMM dd, yyyy')}
					</CardFooter>
				</Card>
				<Card className='relative'>
					<CardHeader>
						<CardTitle>Total expenses</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-3xl'>
							$ {user[0].accounts[0].cash.totalExpense}
						</p>
					</CardContent>
					<CardFooter className='absolute bottom-5 right-1'>
						{format(new Date(), 'MMMM dd, yyyy')}
					</CardFooter>
				</Card>
			</section>
			<section className='grid xl:grid-cols-2 lg:grid-cols-1 gap-[1rem]'>
				<Card>
					<CardHeader>
						<CardTitle>Recent transactions</CardTitle>
					</CardHeader>
					<div className='p-[1rem]'>
						<Table>
							<TableBody>
								{user[0].transactions.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell className='font-quick-sand'>
											{transaction.category}
										</TableCell>
										<TableCell className='text-brand'>
											${transaction.amount}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</section>
		</div>
	);
}

export default Home;
