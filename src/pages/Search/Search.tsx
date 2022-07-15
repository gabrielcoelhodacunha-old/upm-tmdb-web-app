import { useEffect, useMemo, useRef, useState } from 'react';
import { searchMovie } from 'services/tmdb';
import { SearchForm, MovieTable } from './components';

function SearchContainer(): JSX.Element {
	const title = useRef<HTMLInputElement>(null);
	const [movies, setMovies] = useState<[]>(
		JSON.parse(localStorage.getItem('movies') || '[]')
	);

	useEffect(() => {
		if (!title.current) return;
		title.current.value = localStorage.getItem('searchQuery') || '';
	}, []);

	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(movies));
		if (!title.current) return;
		localStorage.setItem('searchQuery', title.current.value);
	}, [movies]);

	const search = async () => {
		if (!title.current) return;
		const query = title.current.value;
		if (!query) return setMovies([]);
		setMovies(await searchMovie(query));
	};

	const formProps = {
		titleRef: title,
		search,
	};

	const tableProps = useMemo(() => {
		return {
			movies,
			lists: [
				{ id: '1', name: 'Anime' },
				{ id: '2', name: 'Filmes baseados em jogos' },
			],
		};
	}, [movies]);

	return (
		<div id='search_container'>
			<SearchForm {...formProps} />
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
