'use client';

import { useState, useContext, createContext } from 'react';

type NavigationTypes = {
	navigation: string;
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
};

const NavigationContext = createContext<NavigationTypes | null>(null);

export function NavigationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [navigation, setNavigation] = useState('new-transaction');

	return (
		<NavigationContext.Provider value={{ navigation, setNavigation }}>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation() {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error('useNavigation must be used inside of Navigation provider');
	}
	return context;
}
