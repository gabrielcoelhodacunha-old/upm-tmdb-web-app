import { TList } from 'common/types';
import { useEffect, useRef, useState } from 'react';
import { searchMovie } from 'services/tmdb';
import {
	getItem,
	getParsed,
	keepInputValue,
	setParsed,
} from 'utils/localStorage';
import { SearchForm, MovieTable } from './components';

function SearchContainer(): JSX.Element {
	const title = useRef<HTMLInputElement>(null);
	const [movies, setMovies] = useState<[]>(getParsed('movies'));
	const [lists, _] = useState<TList[]>(getParsed('lists'));

	useEffect(() => {
		if (!title.current) return;
		title.current.value = getItem('searchQuery');
	}, []);

	useEffect(() => {
		setParsed('movies', movies);
	}, [movies]);

	const search = async () => {
		if (!title.current) return;
		const query = title.current.value;
		if (!query) return setMovies([]);
		setMovies(await searchMovie(query));
	};

	const formProps = {
		title: {
			_ref: title,
			onBlur: () => keepInputValue(title, 'searchQuery'),
		},
		search,
	};

	const tableProps = { movies, lists };

	return (
		<div id='search_container'>
			<SearchForm {...formProps} />
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
