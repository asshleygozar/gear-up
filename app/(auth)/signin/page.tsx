'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Button,
	Form,
	FormError,
	FormGroup,
	FormInput,
	FormLabel,
} from '@/components/ui/Form';
import { signIn, ActionResponse } from '@/lib/auth';

const initialState: ActionResponse = {
	success: false,
	message: '',
	error: undefined,
};

export default function SignInPage() {
	const router = useRouter();

	const handleSubmit = async (
		prevState: ActionResponse,
		formData: FormData
	) => {
		try {
			const result = await signIn(formData);

			if (result.success) {
				// Maybe add toast here like success
				router.push('/dashboard');
			}

			return result;
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message:
					'Failed to signed in, An error occured while authenticating your account',
				error:
					'Failed to signed in, An error occured while authenticating your account',
			};
		}
	};

	const [state, formAction, isPending] = useActionState<
		ActionResponse,
		FormData
	>(handleSubmit, initialState);

	return (
		<div className='h-screen bg-blue-200 flex justify-center items-center'>
			<Form
				action={formAction}
				className='bg-white rounded-xl p-[2rem] w-md h-fit flex flex-col gap-[1rem] shadow-md'
			>
				<h1 className='text-center text-2xl'>Sign In</h1>
				{state?.error && state?.message && (
					<FormError className='text-red-300'>
						{state.error} {state.message}
					</FormError>
				)}
				<FormGroup>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						name='email'
						type='email'
						required
						placeholder='Email'
						className='border border-black-300 w-full bg-grey-300 rounded-md'
					/>
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormInput
						id='password'
						name='password'
						type='password'
						required
						placeholder='Password'
						className='border border-black-300 w-full bg-grey-300 rounded-md'
					/>
				</FormGroup>
				<Button
					type='submit'
					isLoading={isPending}
					className='bg-green-300 rounded-xl text-white p-[1rem]'
				>
					Sign in
				</Button>
			</Form>
		</div>
	);
}
