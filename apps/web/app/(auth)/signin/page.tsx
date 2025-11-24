'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Form,
	FormError,
	FormGroup,
	FormInput,
	FormLabel,
} from '@/components/ui/Form';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { APIResponse } from '@/utils/type';

const initialState: APIResponse = {
	success: false,
	message: '',
	error: '',
	errors: [
		{
			field: '',
			message: '',
		},
	],
};

export default function SignInPage() {
	const router = useRouter();

	const handleSubmit = async (prevState: APIResponse, formData: FormData) => {
		try {
			const data = {
				email: formData.get('email'),
				password: formData.get('password'),
			};
			const result = await fetch(
				`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/signin/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(data),
				}
			);

			const response = await result.json();

			if (response.success) {
				// Maybe add toast here like success

				router.push('/dashboard');
			}

			return response;
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

	const [state, formAction, isPending] = useActionState<APIResponse, FormData>(
		handleSubmit,
		initialState
	);

	return (
		<div className='h-screen flex justify-center items-center'>
			<Form
				action={formAction}
				className='bg-card rounded-xl p-8 w-md h-fit flex flex-col gap-4 shadow-md'
			>
				<h1 className='text-center text-2xl font-inter font-semibold'>
					Log into your account
				</h1>
				<FormError className='text-red-500'>{state.message}</FormError>
				<FormGroup className='flex flex-col gap-2'>
					{state?.errors && state?.errors && state.errors?.length > 0 && (
						<FormError className='text-red-500 text-[0.9rem]'>
							{state.errors.find((field) => field.field === 'email')?.message}
						</FormError>
					)}
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						name='email'
						type='email'
						disabled={isPending}
						required
						placeholder='Enter email'
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<FormGroup className='flex flex-col gap-2'>
					{state?.errors && state?.errors && state.errors?.length > 0 && (
						<FormError className='text-red-500 text-[0.9rem]'>
							{
								state.errors.find((field) => field.field === 'password')
									?.message
							}
						</FormError>
					)}
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormInput
						id='password'
						name='password'
						type='password'
						required
						disabled={isPending}
						placeholder='Enter password'
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<Button
					type='submit'
					disabled={isPending}
					className='bg-primary text-white text-md font-inter font-medium hover:bg-violet-500 cursor-pointer'
				>
					{isPending ? <Loader2Icon className='animate-spin' /> : 'Sign in'}
				</Button>
				<p className='text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href={'/signup'}>
						<span className='text-primary'>Sign up</span>
					</Link>{' '}
					instead
				</p>
			</Form>
		</div>
	);
}
