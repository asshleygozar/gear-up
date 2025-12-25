'use client';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormGroup, FormLabel } from './ui/Form';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { AccountSelect } from './Accounts';
import { APIResponse, TransactionType } from '@/utils/types';

// Request to API Proxy
const createTransaction = async (
	data: TransactionType
): Promise<APIResponse> => {
	const response = await fetch('/api/transactions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const result = await response.json();
	if (!response.ok) {
		toast.error(result.message);
	}

	return result;
};

export const NewTransaction = () => {
	const [amount, setAmount] = useState('');
	const query = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createTransaction,
		onSuccess: (data) => {
			query.invalidateQueries({ queryKey: ['net-income'] });
			query.invalidateQueries({ queryKey: ['total-expense'] });
			query.invalidateQueries({ queryKey: ['total-income'] });
			toast.success(data.message || 'Transaction created successfully');
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Failed to create transaction');
		},
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dateValue = formData.get('transaction_date') as string;
		const isoDate = new Date(dateValue).toISOString();
		const data = {
			transaction_amount: formData.get('transaction_amount') as string,
			account_id: formData.get('account_id') as string,
			transaction_type: formData.get('transaction_type') as string,
			transaction_category: formData.get('transaction_category') as string,
			transaction_date: isoDate,
			transaction_description:
				(formData.get('transaction_description') as string) || undefined,
		};
		setAmount('');
		mutate(data);
	};
	const handleAmountOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const regex = /^(\d+\.?\d{0,2}|\.\d{0,2})$/;

		if (value === '' || regex.test(value)) {
			setAmount(value);
		}
	};

	return (
		<Dialog>
			<DialogTrigger className='flex items-center bg-primary p-2 rounded-2xl hover:opacity-80 shadow-sm cursor-pointer'>
				<p className='flex gap-2 items-center text-[0.8rem] text-background'>
					<Plus /> Create
				</p>
			</DialogTrigger>
			<DialogContent>
				<Form
					className='grid gap-4'
					onSubmit={handleSubmit}
				>
					<DialogHeader>
						<DialogTitle className='text-center'>New Transaction</DialogTitle>
					</DialogHeader>

					<FormGroup className='grid gap-3'>
						<FormLabel className='text-[0.9rem]'>Amount</FormLabel>
						<Input
							id='transaction_amount'
							name='transaction_amount'
							type='text'
							placeholder='0.00'
							onChange={handleAmountOnChange}
							required
							value={amount}
						/>
					</FormGroup>

					<FormGroup className='grid gap-3 grid-cols-2'>
						<FormGroup className='grid gap-3'>
							<FormLabel className='text-[0.9rem]'>Account</FormLabel>
							<AccountSelect />
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel className='text-[0.9rem]'>Type</FormLabel>
							<Select
								name='transaction_type'
								defaultValue={'expense'}
								required
							>
								<SelectTrigger id='transaction_type'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='income'>Income</SelectItem>
									<SelectItem value='expense'>Expense</SelectItem>
								</SelectContent>
							</Select>
						</FormGroup>
					</FormGroup>
					<FormGroup className='grid gap-3 grid-cols-2'>
						<FormGroup className='grid gap-3'>
							<FormLabel className='text-[0.9rem]'>Category</FormLabel>
							<Select
								name='transaction_category'
								required
							>
								<SelectTrigger id='transaction_category'>
									<SelectValue placeholder='Select Category' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Food & Drinks</SelectLabel>
										<SelectItem value='food'>Food</SelectItem>
										<SelectItem value='drinks'>Drinks</SelectItem>
									</SelectGroup>
									<SelectGroup>
										<SelectLabel>Shopping</SelectLabel>
										<SelectItem value='beauty'>Beauty</SelectItem>
										<SelectItem value='electronics'>Electronics</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel className='text-[0.9rem]'>Date</FormLabel>
							<Input
								id='transaction_date'
								name='transaction_date'
								type='datetime-local'
								required
							/>
						</FormGroup>
					</FormGroup>

					<FormGroup className='grid gap-3'>
						<FormLabel className='text-[0.9rem]'>
							Description (optional)
						</FormLabel>
						<Textarea
							id='transaction_description'
							name='transaction_description'
							placeholder='I bought...'
							maxLength={255}
						/>
					</FormGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant={'outline'}
								className='cursor-pointer'
								type='button'
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							variant={'default'}
							type='submit'
							className='cursor-pointer'
						>
							Save
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
