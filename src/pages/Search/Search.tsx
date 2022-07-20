import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { searchMovie, selectMovies } from 'redux/tmdb';
import { getItem, keepInputValue } from 'utils/localStorage';
import { SearchForm, MovieTable } from './components';

function SearchContainer(): JSX.Element {
	const title = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovies);

	useEffect(() => {
		if (!title.current) return;
		title.current.value = getItem('searchQuery');
	}, []);

	const search = async () => {
		if (!title.current) return;
		dispatch(searchMovie({ query: title.current.value }));
	};

	const formProps = {
		title: {
			_ref: title,
			onBlur: () => keepInputValue(title, 'searchQuery'),
		},
		search,
	};

	const tableProps = { movies };

	return (
		<div id='search_container'>
			<SearchForm {...formProps} />
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
