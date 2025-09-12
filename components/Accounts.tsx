'use client';

import { useEffect, useState } from 'react';
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from './ui/select';

type AccountProps = {
	account_id: number;
	account_name: string;
	account_type: string;
	total_balance: number;
	total_income: number;
	total_expense: number;
};

type SelectAccountProps = {
	account: string;
	onValueChange: (value: string) => void;
};

export function SelectAccount({ onValueChange, account }: SelectAccountProps) {
	const [accounts, setAccounts] = useState<AccountProps[]>([]);

	useEffect(() => {
		const fetchAccounts = async () => {
			const response = await fetch('/api/accounts');
			const data = await response.json();
			setAccounts(data.data);
		};

		fetchAccounts();
	}, []);

	return (
		<Select
			name='account'
			required
			value={account}
			onValueChange={onValueChange}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select account' />
			</SelectTrigger>
			<SelectContent>
				{accounts.map((account) => (
					<SelectItem
						key={account.account_id}
						value={account.account_name}
					>
						{`${
							account.account_name.charAt(0).toUpperCase() +
							account.account_name.slice(1)
						}`}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
