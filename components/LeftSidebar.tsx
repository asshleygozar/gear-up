'use client';
<<<<<<< Updated upstream
import { Home, CreditCard, Settings, Coins } from 'lucide-react';
=======

import { Home, CreditCard, Settings, Coins, PlusIcon } from 'lucide-react';
>>>>>>> Stashed changes

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { BrandNameLogo } from './Brand';
import Modal from './Modal';
<<<<<<< Updated upstream
import { CategoryProvider } from '@/context/useCategory';
=======
>>>>>>> Stashed changes

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/dashboard/',
		icon: Home,
	},
	{
		title: 'Accounts',
		url: '/dashboard/accounts',
		icon: CreditCard,
	},
	{
		title: 'Invesments',
		url: '/dashboard/investments',
		icon: Coins,
	},
	{
		title: 'Settings',
		url: '/dashboard/settings',
		icon: Settings,
	},
];

export function LeftSidebar() {
	return (
<<<<<<< Updated upstream
		<CategoryProvider>
			<Sidebar className='p-[1rem]'>
				<SidebarContent>
					<BrandNameLogo />
					<SidebarGroup>
						<SidebarGroupContent>
							<Modal />
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</CategoryProvider>
=======
		<Sidebar className='p-[1rem]'>
			<SidebarContent>
				<BrandNameLogo />
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<Modal />
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
>>>>>>> Stashed changes
	);
}
