import Link from 'next/link';

type NavigationButtonProperties = {
	className?: string;
	icon: React.ReactNode;
	linkName: string;
	path: string;
};

function NavigationButton({
	className,
	icon,
	linkName,
	path,
}: NavigationButtonProperties) {
	return (
		<Link
			href={path}
			className={className}
		>
			<span>{icon}</span>
			<span>{linkName}</span>
		</Link>
	);
}

export { NavigationButton };
