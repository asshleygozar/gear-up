'use client';

import { useState, useContext, createContext } from 'react';

type StorageContextType = {
	netWorth: number;
	setNetWorth: React.Dispatch<React.SetStateAction<number>>;
	totalAssets: number;
	setTotalAssets: React.Dispatch<React.SetStateAction<number>>;
	totalLiabilities: number;
	setTotalLiabilities: React.Dispatch<React.SetStateAction<number>>;
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
	const [netWorth, setNetWorth] = useState(0);
	const [totalAssets, setTotalAssets] = useState(0);
	const [totalLiabilities, setTotalLiabilities] = useState(0);

	return (
		<StorageContext.Provider
			value={{
				netWorth,
				setNetWorth,
				totalAssets,
				setTotalAssets,
				totalLiabilities,
				setTotalLiabilities,
			}}
		>
			{children}
		</StorageContext.Provider>
	);
}

export function useStorage() {
	const context = useContext(StorageContext);
	if (!context) {
		throw new Error('useStorage must be used inside of Storage provider');
	}
	return context;
}
