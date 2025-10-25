function Home() {
	return (
		<div className='xl:h-screen lg:h-full w-full bg-background-color grid xl:grid-rows-[210px_minmax(0,_1fr)] lg:grid-rows-auto-fit gap-[1rem] p-[2rem]'>
			<section className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-[1rem] h-full'></section>
			<section className='grid xl:grid-cols-2 lg:grid-cols-1 gap-[1rem]'></section>
		</div>
	);
}

export default Home;
