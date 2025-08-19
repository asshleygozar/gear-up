'use client';
import {
	Form,
	FormLabel,
	FormInput,
	FormGroup,
	Button,
	FormError,
} from '@/components/ui/Form';
import { ActionResponse, signUp } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

export default function SignUpPage() {
	const router = useRouter();
	const initialState: ActionResponse = {
		success: false,
		message: '',
		error: '',
		errors: undefined,
	};

	const handleSubmit = async (
		prevState: ActionResponse,
		formData: FormData
	) => {
		try {
			const result = await signUp(formData);

			if (result.success) {
				// Sign up successfully maybe add toast here
				router.push('/dashboard');
			}

			return result;
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: 'An error occured while creating your account',
				error: 'An error occured while creating your account',
			};
		}
	};

	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(handleSubmit, initialState);

	return (
		<div className='h-screen flex justify-center items-center shadow-md'>
			<Form
				className='bg-white rounded-xl p-[2rem] w-md h-fit flex flex-col gap-[1rem]'
				action={formAction}
			>
				<h1 className='text-center text-2xl'>Sign Up</h1>
				{!state.success && state.error && (
					<FormError className='text-red-400'>{state.message}</FormError>
				)}
				<FormGroup className=''>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						type='email'
						name='email'
						autoComplete='email'
						required
						className='border border-black-300 w-full bg-grey-300 rounded-md'
					/>
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormInput
						id='password'
						type='password'
						name='password'
						autoComplete='password'
						required
						className='border border-black-200 block w-full rounded-md'
					/>
					<FormGroup>
						<FormLabel htmlFor='confirm-password'>Confirm password</FormLabel>
						<FormError className='text-red-400'>
							{state?.errors?.email}
						</FormError>
						<FormInput
							id='confirmPassword'
							type='password'
							name='confirmPassword'
							required
							className='block w-full border border-black-200 rounded-md'
						/>
					</FormGroup>
					<Button
						className='bg-green-300 rounded-xl text-white p-[1rem]'
						type='submit'
						isLoading={isPending}
					>
						Sign up
					</Button>
				</FormGroup>
			</Form>
		</div>
	);
}
