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
import { ActionResponse, signUp } from '@/controller/auth';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
		<div className='h-screen flex justify-center items-center'>
			<Form
				className='bg-card rounded-xl p-[2rem] w-md h-fit flex flex-col gap-[1rem] shadow-md'
				action={formAction}
			>
				<h1 className='text-center text-2xl font-semibold'>
					Create an account
				</h1>
				{state?.errors?.email && (
					<FormError className='text-red-400'>
						{state.errors.email[0]}
					</FormError>
				)}
				{!state.success && state?.message && (
					<FormError className='text-red-400'>{state.message}</FormError>
				)}
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						type='email'
						name='email'
						autoComplete='email'
						placeholder='Enter email'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				{state?.errors?.password && (
					<FormError className='text-red-400'>
						{state.errors.password[0]}
					</FormError>
				)}
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormInput
						id='password'
						type='password'
						name='password'
						autoComplete='password'
						placeholder='Create password'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				{state?.errors?.confirmPassword && (
					<FormError className='text-red-400'>
						{state.errors.confirmPassword[0]}
					</FormError>
				)}
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='confirm-password'>Confirm password</FormLabel>
					<FormInput
						id='confirmPassword'
						type='password'
						name='confirmPassword'
						placeholder='Re-type password'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<Button
					className='bg-brand text-white text-md font-inter font-medium hover:bg-blue-300'
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
						<span className='text-brand'>Sign in</span>
					</Link>{' '}
					instead
				</p>
			</Form>
		</div>
	);
}
