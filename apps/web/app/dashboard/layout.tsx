'use client';
import QueryProvider from './provider';
import DashboardNavigation from '@/components/DashboardNavigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryProvider>
			<DashboardNavigation />
			<main className='h-full w-full p-12'>{children}</main>
		</QueryProvider>
	);
};

export default DashboardLayout;
