'use client';

import { SignIn } from '@/components/Auth';
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
						Use your email to continue with GearUp.
					</h2>
				</header>
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
