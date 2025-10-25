import { LeftSidebar } from '@/components/LeftSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import QueryProvider from './provider';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
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
