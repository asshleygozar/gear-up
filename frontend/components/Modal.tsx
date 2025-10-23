import { useState } from 'react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Form, FormGroup, FormInput, FormLabel } from './ui/Form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { format } from 'date-fns';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { SelectAccount } from './Accounts';

export default function Modal() {
	// Date select state
	const dateToday = format(new Date(), 'yyyy-MM-dd');

	// Initial state transaction
	const initialTransaction = {
		amount: '',
		type: '',
		account: '',
		category: '',
		date: dateToday,
		description: '',
	};
	// Store transaction field states
	const [transaction, setTransaction] = useState(initialTransaction);

	// Validates the amount field
	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		// Test if user input is number and only allow two decimal places
		const numericRegex = /^\d*\.?\d{0,2}$/;

		// if field length is less than or equal to zero set amount to empty
		if (value.length <= 1) {
			setTransaction((prev) => ({ ...prev, amount: '' }));
		}

		// Test if current field value match the regex if not then do not set
		if (numericRegex.test(value)) {
			setTransaction((prev) => ({ ...prev, amount: value }));
		}
	};

	// Handle and validates the form submission
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			!transaction.amount.length ||
			!transaction.account.length ||
			!transaction.category.length ||
			!transaction.date.length ||
			!transaction.type.length
		) {
			toast(`Please fill out all the fields ${transaction.category}`);
			return;
		}

		try {
			const response = await fetch('/api/transaction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transaction),
			});
			const data = await response.json();

			toast(data.message);

			if (data.success) {
				setTransaction(initialTransaction);
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Add new transaction</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>New Transaction</DialogTitle>
					<DialogDescription>Enter new transaction</DialogDescription>
				</DialogHeader>
				<Form
					onSubmit={handleSubmit}
					className='grid gap-4'
				>
					<FormGroup className='grid gap-4'>
						<FormGroup className='grid gap-3'>
							<FormLabel htmlFor='amount'>Amount</FormLabel>
							<FormInput
								id='amount'
								name='amount'
								type='text'
								inputMode='decimal'
								step={'0.01'}
								required
								placeholder='0.00'
								value={transaction.amount}
								onChange={handleAmountChange}
								className='px-[1rem] py-[0.5rem] border border-white-100 rounded'
							/>
						</FormGroup>
						<FormGroup className='grid grid-cols-2 gap-3'>
							<FormGroup className='grid gap-3'>
								<FormLabel htmlFor='type'>Type</FormLabel>
								<Select
									name='type'
									required
									value={transaction.type}
									onValueChange={(event) =>
										setTransaction((prev) => ({ ...prev, type: event }))
									}
								>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='income'>Income</SelectItem>
										<SelectItem value='expense'>Expense</SelectItem>
									</SelectContent>
								</Select>
							</FormGroup>
							<FormGroup className='grid gap-3'>
								<FormLabel htmlFor='category'>Category</FormLabel>
								<Select
									name='category'
									required
									value={transaction.category}
									onValueChange={(event) =>
										setTransaction((prev) => ({ ...prev, category: event }))
									}
								>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Category' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='food'>Food</SelectItem>
										<SelectItem value='shopping'>Shopping</SelectItem>
										<SelectItem value='transport'>Transport</SelectItem>
									</SelectContent>
								</Select>
							</FormGroup>
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel htmlFor='account'>Account</FormLabel>
							<SelectAccount
								account={transaction.account}
								onValueChange={(value) =>
									setTransaction((prev) => ({ ...prev, account: value }))
								}
							/>
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel
								htmlFor='date'
								className='block'
							>
								Date
							</FormLabel>
							<FormInput
								id='date'
								name='date'
								type='date'
								required
								min={dateToday}
								defaultValue={transaction.date}
								onChange={(event) =>
									setTransaction((prev) => ({
										...prev,
										date: event.target.value,
									}))
								}
								className='px-[1rem] py-[0.5rem] border border-white-100 rounded'
							/>
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel htmlFor='description'>
								Description (Optional)
							</FormLabel>
							<Textarea
								id='description'
								name='description'
								placeholder='Maximum of 100 characters'
								value={transaction.description}
								onChange={(event) =>
									setTransaction((prev) => ({
										...prev,
										description: event.target.value,
									}))
								}
								maxLength={100}
							/>
						</FormGroup>
					</FormGroup>
					<DialogFooter className='grid grid-cols-2'>
						<DialogClose asChild>
							<Button variant={'outline'}>Cancel</Button>
						</DialogClose>
						<Button type='submit'>Save</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
