'use client';

type ModalNavigationType = {
	className?: string;
	name: string;
	icon: React.ReactNode;
	path: string;
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
};

const ModalNavigationButton = ({
	className,
	name,
	icon,
	path,
	setNavigation,
}: ModalNavigationType) => {
	return (
		<button
			className={className}
			onClick={() => setNavigation(path)}
		>
			<span>{icon}</span>
			<span>{name}</span>
		</button>
	);
};

export default ModalNavigationButton;
