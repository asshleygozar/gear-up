import { BrandNameLogo } from './Brand';
import { NewTransaction } from './NewTransactionCard';
import { Input } from './ui/input';

export default function DashboardNavigation() {
	return (
		<nav className='flex justify-between items-center p-4 bg-white shadow-accent sticky top-0 border-b'>
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
