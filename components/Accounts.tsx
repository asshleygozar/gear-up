'use client';

import { useEffect, useState } from 'react';
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from './ui/select';

type Account = {
	account_id: number;
	account_name: string;
	account_type: string;
	total_balance: number;
	total_income: number;
	total_expense: number;
};

export function AccountSelect() {
	const [accounts, setAccounts] = useState<Account[]>([]);

	useEffect(() => {
		const fetchAccounts = async () => {
			const response = await fetch('/api/accounts');
			const data = await response.json();
			setAccounts(data);
		};

		fetchAccounts();
	}, []);

	return (
		<Select name='account'>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select account' />
			</SelectTrigger>
			<SelectContent>
				{accounts.map((account) => (
					<SelectItem
						key={account.account_id}
						value={account.account_name}
					>
						{account.account_name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
