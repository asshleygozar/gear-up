'use client';
import {
	Form,
	FormLabel,
	FormInput,
	FormGroup,
	FormError,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/button';
import { ActionResponse, signUp } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { cn } from '@/lib/utils';

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
				className='bg-white rounded-xl p-[2rem] w-md h-fit flex flex-col gap-[1rem] shadow-lg'
				action={formAction}
			>
				<h1 className='text-center text-2xl'>Sign Up</h1>
				{!state.success && state.error && (
					<FormError className='text-red-400'>
						{state.message} {state?.errors?.email}
					</FormError>
				)}
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormInput
						id='email'
						type='email'
						name='email'
						autoComplete='email'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormInput
						id='password'
						type='password'
						name='password'
						autoComplete='password'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<FormGroup className='flex flex-col gap-2'>
					<FormLabel htmlFor='confirm-password'>Confirm password</FormLabel>
					<FormInput
						id='confirmPassword'
						type='password'
						name='confirmPassword'
						required
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
						)}
					/>
				</FormGroup>
				<Button
					className='w-[100%] bg-blue-400 text-white hover:bg-blue-300'
					disabled={isPending}
					variant={'secondary'}
					size={'lg'}
					type='submit'
				>
					Sign up
				</Button>
			</Form>
		</div>
	);
}
