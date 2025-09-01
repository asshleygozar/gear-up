import { LeftSidebar } from '@/components/LeftSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getCurrentUser } from '@/model/user';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const getUser = await getCurrentUser();
	if (!getUser) {
		redirect('/signin');
	}
	return (
		<SidebarProvider>
			<LeftSidebar />
			<main className='h-full w-full'>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
