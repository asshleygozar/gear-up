import styles from '@/styles/components/right-side-bar.module.css';
function RightSideBar({children} : {children: React.ReactNode}) {
    return (
			<aside className={styles.container}>
				<h1>Accounts</h1>
				<div className={styles.accounts}>{children}</div>
			</aside>
		);
}

export default RightSideBar;