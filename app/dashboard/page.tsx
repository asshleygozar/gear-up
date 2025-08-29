'use client';
import { format } from 'date-fns';
import { useStorage } from '@/context/useStorage';
import RightSideBar from '@/components/RightSideBar';
import { MainCard, SubCard, AccountCard } from '@/components/ui/MockCard';
import MainModal from '@/components/MainModal';
import accounts from '@/utils/accounts';
import { useEffect, useState } from 'react';
import { NavigationProvider } from '@/context/useNavigation';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

function Home() {
	// temporary storage using context for development purposes
	const { isClick, netWorth, totalAssets, totalLiabilities } = useStorage();
	const [timeStamp, setTimeStamp] = useState('');

	useEffect(() => {
		const formattedDate = format(new Date(), 'MMMM, dd, yyyy');
		setTimeStamp(formattedDate);
	}, []);

	return (
		<div className='h-[100vh] w-full bg-background-color'>
			<h1>Hello</h1>

			<NavigationProvider>{isClick ? <MainModal /> : ''}</NavigationProvider>
		</div>
	);
}

export default Home;
