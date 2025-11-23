'use client';

import { LeftSidebar } from '@/components/LeftSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import QueryProvider from './provider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	useEffect(() => {
		const session = async () => {
			const token = await cookieStore.get('token');

			if (!token?.value) {
				router.push('/signin');
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/validate`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token?.value}`,
					},
					credentials: 'include',
				}
			);

			if (!response.ok) {
				await cookieStore.delete('token');
				router.push('/signin');
			}
		};

		session();
	});
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
