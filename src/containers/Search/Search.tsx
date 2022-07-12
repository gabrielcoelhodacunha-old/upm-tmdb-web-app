import { useRef } from 'react';
import { LabelledInput, MovieTable } from '../../components';

function SearchContainer(): JSX.Element {
	const title = useRef(null);

	const titleProps = { label: 'Titulo', _ref: title };
	const tableProps = {
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
	return (
		<div id='search_container'>
			<LabelledInput {...titleProps} />
			<button onClick={() => {}}>Pesquisar</button>
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
