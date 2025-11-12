'use client';

import { useState, useContext, createContext } from 'react';

type CategoryContextType = {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
	undefined
);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
	const [value, setValue] = useState('');

	return (
		<CategoryContext.Provider value={{ value, setValue }}>
			{children}
		</CategoryContext.Provider>
	);
}

export function useCategory() {
	const context = useContext(CategoryContext);

	if (!context) {
		throw new Error('useCategory must be used inside of Category Provider');
	}

	return context;
}
