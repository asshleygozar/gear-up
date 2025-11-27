'use client';

import { SignIn } from '@/components/Auth';
import { Button } from '@/components/ui/button';
import { handleGoogleSignIn } from '@/lib/auth';
import Image from 'next/image';

export default function SignInPage() {
	return (
		<main className='h-screen grid grid-cols-2 items-center justify-items-center'>
			<div className='grid gap-5'>
				<header className='grid gap-3'>
					<h1 className='text-center text-5xl font-inter font-extrabold'>
						Welcome Back!
					</h1>
					<h2 className='text-center text-[1rem] text-muted-foreground font-quick-sand font-medium'>
						Use other services or use your email to continue with GearUp.
					</h2>
				</header>
				<Button
					variant={'secondary'}
					onClick={handleGoogleSignIn}
					className='px-8 py-6 flex gap-8 text-foreground text-[1rem] font-quick-sand font-semibold '
				>
					<Image
						src={'/google-icon.svg'}
						alt='Google logo'
						height={30}
						width={30}
					/>
					Continue with Google
				</Button>
				<p className='text-center'>or</p>
				<SignIn />
			</div>
			<div className='bg-primary h-screen w-[50vw] grid'>
				<Image
					src={'/gearup-logo-light.svg'}
					alt=''
					height={450}
					width={450}
					className='place-self-center'
				/>
			</div>
		</main>
	);
}
