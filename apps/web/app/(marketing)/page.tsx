import { BrandNameLogo } from '@/components/Brand';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const navigation = [
	{
		name: 'Features',
		path: '/features',
	},
	{
		name: 'About',
		path: '/about',
	},
	{
		name: 'Pricing',
		path: '/pricing',
	},
];

const Home = () => {
	return (
		<div className='flex flex-col gap-15 justify-between'>
			<nav className='flex justify-between items-center gap-10 h-[70px] py-4 px-14 shadow-md'>
				<BrandNameLogo />
				<ul className='flex gap-5'>
					{navigation.map((item, index) => (
						<Link
							key={index}
							href={item.path}
						>
							<li className='text-foreground hover:text-primary font-inter font-semibold cursor-pointer'>
								{item.name}
							</li>
						</Link>
					))}
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
							variant={'default'}
							className='font-quick-sand font-medium cursor-pointer'
						>
							Sign up
						</Button>
					</Link>
				</div>
			</nav>
			<main className='px-14'>
				<section className='grid grid-cols-2 items-center h-[60vh]'>
					<section className='flex flex-col gap-4'>
						<h1 className='text-foreground font-inter font-bold text-6xl'>
							Take Control of Your{' '}
							<span className='text-primary'>Finances</span>
						</h1>
						<h2 className='text-foreground font-inter text-xl'>
							Track expenses, manage savings, and achieve financial freedom with
							ease.
						</h2>
						<div className='flex gap-5'>
							<Link href={'/'}>
								<Button
									variant={'default'}
									className='text-primary-foreground font-inter text-lg px-8 py-6 hover:bg-blend-lighten hover:text-primary-foreground cursor-pointer'
								>
									Get started
								</Button>
							</Link>
							<Link href={'/'}>
								<Button
									variant={'secondary'}
									className='text-foreground font-inter text-lg px-8 py-6 cursor-pointer'
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
