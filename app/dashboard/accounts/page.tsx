'use client';
import { useStorage } from '@/context/useStorage';
import Modal from '@/components/NewTransactionModal';
import styles from '@/styles/accounts.module.css';
import { MainCard, AccountCard } from '@/components/ui/MockCard';
import { format } from 'date-fns';
import accounts from '@/utils/accounts';
import { useState, useEffect } from 'react';

function Accounts() {
	const { isClick } = useStorage();
	const [timeStamp, setTimeStamp] = useState('');

	useEffect(() => {
		const formattedDate = format(new Date(), 'MMMM, dd, yyyy');
		setTimeStamp(formattedDate);
	}, []);
	return (
		<div className={styles.container}>
			<section>
				{/* Total amount here*/}
				<MainCard
					title='Total balance'
					balance={2928}
					date={`${timeStamp}`}
				/>
			</section>
			<section className={styles.accountsContainer}>
				{accounts.map((account) => (
					<AccountCard
						key={account.id}
						balance={account.balance}
						accountName={account.accountName}
						accountCategory={account.accountCategory}
					/>
				))}
			</section>
			{isClick ? <Modal /> : ''}
		</div>
	);
}

export default Accounts;
