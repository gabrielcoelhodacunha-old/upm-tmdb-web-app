import { useMemo } from 'react';
import { SearchForm, MovieTable } from './components';

function SearchContainer(): JSX.Element {
	const tableProps = useMemo(() => {
		return {
			movies: [
				{ id: '1', title: 'Uno' },
				{ id: '2', title: 'Dos' },
				{ id: '3', title: 'Tres' },
			],
			lists: [
				{ id: '1', name: 'Anime' },
				{ id: '2', name: 'Filmes baseados em jogos' },
			],
		};
	}, []);
	return (
		<div id='search_container'>
			<SearchForm />
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
