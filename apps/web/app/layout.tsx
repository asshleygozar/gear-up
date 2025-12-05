import type { Metadata } from 'next';
import { Outfit, Quicksand } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const outfit = Outfit({
	variable: '--font-outfit',
	subsets: ['latin'],
});

const quickSand = Quicksand({
	variable: '--font-quick-sand',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'GearUp',
	description: 'Financial manager for everyone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${outfit.variable} ${quickSand.variable} antialiased`}>
				<Toaster position='top-center' />
				{children}
			</body>
		</html>
	);
}
