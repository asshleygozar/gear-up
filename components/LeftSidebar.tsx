import { Home, CreditCard, Settings, Coins } from 'lucide-react';

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
		<Sidebar className='p-[1rem]'>
			<SidebarContent>
				<BrandNameLogo />
				<SidebarGroup>
					<SidebarGroupContent>
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
	);
}
