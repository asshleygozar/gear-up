import { useState } from 'react';
import { AccountSelect } from './Accounts';
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
import { CategorySelect } from './Category';
import { useCategory } from '@/context/useCategory';

export default function Modal() {
	const dateToday = format(new Date(), 'yyyy-MM-dd'); // Date select state
	const { value } = useCategory(); // Category select state from useCategory context

	const [transaction, setTransaction] = useState({
		amount: '',
		type: '',
		account: '',
		category: value,
		date: dateToday,
		description: '',
	});

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
	return (
		<Dialog>
			<Form>
				<DialogTrigger asChild>
					<Button variant='outline'>Add new transaction</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>New Transaction</DialogTitle>
						<DialogDescription>Enter new transaction</DialogDescription>
					</DialogHeader>
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
									defaultValue={'expense'}
									onValueChange={(typeValue) =>
										setTransaction((prev) => ({ ...prev, type: typeValue }))
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
								<CategorySelect />
							</FormGroup>
						</FormGroup>
						<FormGroup className='grid gap-3'>
							<FormLabel htmlFor='account'>Account</FormLabel>
							<AccountSelect />
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
				</DialogContent>
			</Form>
		</Dialog>
	);
}
