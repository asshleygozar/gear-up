import LeftSidebar from '@/components/LeftSidebar';
import { getCurrentUser } from '@/db/dal';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const getUser = await getCurrentUser();
	if (!getUser) {
		redirect('/signin');
	}
	return (
		<main className='grid grid-cols-[250px_1fr]'>
			<LeftSidebar />
			{children}
		</main>
	);
};

export default DashboardLayout;
