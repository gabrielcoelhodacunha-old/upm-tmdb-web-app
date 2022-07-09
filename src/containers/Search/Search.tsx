function SearchContainer(): JSX.Element {
	return (
		<div id='search_container' className='show'>
			<input id='search' placeholder='Titulo' />
			<button id='search_button'>Pesquisar</button>
		</div>
	);
}

export default SearchContainer;
