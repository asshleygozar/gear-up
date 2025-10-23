import { LeftSidebar } from '@/components/LeftSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getCurrentUserSession } from '@/model/user';
import { redirect } from 'next/navigation';
import QueryProvider from './provider';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const getUser = await getCurrentUserSession();
	if (!getUser.success || !getUser.data?.user_id) {
		redirect('/signin');
	}
	return (
		<QueryProvider>
			<SidebarProvider>
				<LeftSidebar />
				<main className='h-full w-full'>
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
		</QueryProvider>
	);
};

export default DashboardLayout;
