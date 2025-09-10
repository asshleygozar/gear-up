import { BrandNameLogo } from '@/components/Brand';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
	return (
		<div className='flex flex-col gap-15 justify-between'>
			<nav className='flex justify-between items-center gap-10 h-[70px] py-[1rem] px-[3.5rem] shadow-md'>
				<BrandNameLogo />
				<ul className='flex gap-5'>
					<Link href={'/features'}>
						<li className='text-foreground font-inter font-semibold cursor-pointer'>
							Features
						</li>
					</Link>
					<Link href={'/about'}>
						<li className='text-foreground font-inter font-semibold cursor-pointer'>
							About
						</li>
					</Link>
					<Link href={'/pricing'}>
						<li className='text-foreground font-inter font-semibold cursor-pointer'>
							Pricing
						</li>
					</Link>
				</ul>
				<div className='flex gap-5 self-end'>
					<Link href={'/signin'}>
						<Button
							variant={'outline'}
							className='bg-card text-card-foreground font-quick-sand font-medium cursor-pointer'
						>
							Sign in
						</Button>
					</Link>
					<Link href={'/signup'}>
						<Button
							variant={'ghost'}
							className='font-quick-sand font-medium cursor-pointer'
						>
							Sign up
						</Button>
					</Link>
				</div>
			</nav>
			<main className='px-[3.5rem]'>
				<section className='grid grid-cols-2 items-center h-[60vh]'>
					<section className='flex flex-col gap-4'>
						<h1 className='text-foreground font-inter font-bold text-6xl'>
							Take Control of Your <span className='text-brand'>Finances</span>
						</h1>
						<h2 className='text-foreground font-inter text-xl'>
							Track expenses, manage savings, and achieve financial freedom with
							ease.
						</h2>
						<div className='flex gap-5'>
							<Link href={'/'}>
								<Button
									variant={'outline'}
									className='bg-income font-inter text-lg px-[2rem] py-[1.5rem] hover:text-brand cursor-pointer'
								>
									Get started
								</Button>
							</Link>
							<Link href={'/'}>
								<Button
									variant={'secondary'}
									className='text-foreground font-inter text-lg px-[2rem] py-[1.5rem] cursor-pointer'
								>
									See demo
								</Button>
							</Link>
						</div>
					</section>
					<section>Image here</section>
				</section>
			</main>
		</div>
	);
};

export default Home;
