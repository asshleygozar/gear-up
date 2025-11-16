'use client';
import {
	Form,
	FormLabel,
	FormInput,
	FormGroup,
	FormError,
} from '@/components/ui/Form';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { cn } from '@/lib/utils';
import type { APIResponse } from '@/utils/type';
import Link from 'next/link';
import { toast } from 'sonner';

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

export default function SignUpPage() {
	const router = useRouter();

	const handleSubmit = async (prevState: APIResponse, formData: FormData) => {
		try {
			const data = {
				email: formData.get('email'),
				password: formData.get('password'),
				confirmPassword: formData.get('confirmPassword'),
			};
			const result = await fetch(
				`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/signup/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			const response = await result.json();
			if (response.success) {
				toast('Created successfully!');
				router.push('/dashboard');
			}

			return response;
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: 'An error occured while creating your account',
				error: 'An error occured while creating your account',
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
				className='bg-card rounded-xl p-8 w-md h-fit flex flex-col gap-4 shadow-md'
				action={formAction}
			>
				<h1 className='text-center text-2xl font-semibold'>
					Create an account
				</h1>
				{!state.success && state?.message && (
					<FormError className='text-red-500'>{state.message}</FormError>
				)}
				<FormGroup className='flex flex-col gap-2'>
					{state?.errors && state?.errors && state.errors?.length > 0 && (
						<FormError className='text-red-500 text-[0.9rem]'>
							{state.errors.find((field) => field.field === 'email')?.message}
						</FormError>
					)}
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						type='email'
						name='email'
						autoComplete='email'
						placeholder='Enter email'
						disabled={isPending}
						required
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
						type='password'
						name='password'
						autoComplete='password'
						placeholder='Create password'
						disabled={isPending}
						required
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
								state.errors.find((field) => field.field === 'confirmPassword')
									?.message
							}
						</FormError>
					)}
					<FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
					<FormInput
						id='confirmPassword'
						type='password'
						name='confirmPassword'
						placeholder='Re-type password'
						disabled={isPending}
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<Button
					className='bg-primary text-white text-md font-inter font-medium hover:bg-violet-400'
					disabled={isPending}
					variant={'secondary'}
					size={'lg'}
					type='submit'
				>
					{isPending ? <Loader2Icon className='animate-spin' /> : 'Sign up'}
				</Button>
				<p className='text-center text-sm'>
					Already have an account?{' '}
					<Link href={'/signin'}>
						<span className='text-primary'>Sign in</span>
					</Link>{' '}
					instead
				</p>
			</Form>
		</div>
	);
}
