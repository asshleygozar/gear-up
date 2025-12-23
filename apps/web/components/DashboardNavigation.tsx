import { BrandNameLogo } from './Brand';
import { NewTransaction } from './NewTransactionCard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';

export default function DashboardNavigation() {
	return (
		<nav className='flex justify-between gap-14 px-8 py-6 h-12 shadow-accent'>
			<BrandNameLogo />
			<Input
				type='search'
				placeholder='Search'
				width={200}
				className='w-xl'
			/>
			<NewTransaction />
		</nav>
	);
}
