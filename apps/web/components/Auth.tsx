'use client';
import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogTrigger,
	DialogDescription,
} from './ui/dialog';
import { Form, FormError, FormGroup, FormLabel } from '@/components/ui/Form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useActionState } from 'react';
import { APIResponse } from '@/utils/type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
export const SignIn = () => {
	const router = useRouter();

	const handleSubmit = async (prevState: APIResponse, formData: FormData) => {
		try {
			const data = {
				email: formData.get('email'),
				password: formData.get('password'),
			};
			const result = await fetch(`http://localhost:8080/auth/signin/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const response = await result.json();

			if (response.success) {
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
		<Dialog>
			<DialogTrigger className='px-8 py-3 bg-primary text-primary-foreground text-[1rem] text-center font-quick-sand font-semibold  border rounded-md'>
				Continue with email
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-center text-3xl font-inter font-bold'>
						Sign in
					</DialogTitle>
					<DialogDescription className='text-center text-[1rem] text-muted-foreground font-quick-sand font-medium'>
						Sign in with your email here
					</DialogDescription>
				</DialogHeader>
				<Form
					action={formAction}
					className='w-md h-fit flex flex-col gap-4'
				>
					<FormError className='text-red-500'>{state.message}</FormError>
					<FormGroup className='flex flex-col gap-2'>
						{state?.errors && state?.errors && state.errors?.length > 0 && (
							<FormError className='text-red-500 text-[0.9rem]'>
								{state.errors.find((field) => field.field === 'email')?.message}
							</FormError>
						)}
						<FormLabel
							htmlFor='email'
							className='text-[0.9rem]'
						>
							Email
						</FormLabel>
						<Input
							id='email'
							name='email'
							type='email'
							disabled={isPending}
							required
							placeholder='Enter email'
							className='font-quick-sand font-medium text-[1.5rem] py-5'
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
						<FormLabel
							htmlFor='password'
							className='text-[0.9rem]'
						>
							Password
						</FormLabel>
						<Input
							id='password'
							name='password'
							type='password'
							required
							disabled={isPending}
							placeholder='Enter password'
							className='font-quick-sand font-medium text-[1.5rem] py-5'
						/>
					</FormGroup>
					<Button
						variant={'default'}
						type='submit'
						disabled={isPending}
						className='px-8 py-6 flex gap-8 text-background text-[1rem] font-quick-sand font-semibold '
					>
						{isPending ? <Loader2Icon className='animate-spin' /> : 'Log in'}
					</Button>

					<p className='text-center text-sm font-quick-sand font-medium'>
						Don&apos;t have an account?{' '}
						<Link href={'/signup'}>
							<span className='text-primary'>Sign up</span>
						</Link>{' '}
						instead
					</p>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
