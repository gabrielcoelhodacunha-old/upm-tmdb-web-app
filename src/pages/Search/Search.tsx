import { useMemo, useRef } from 'react';
import { LabelledInput, MovieTable } from '../../components';

function SearchContainer(): JSX.Element {
	const title = useRef(null);

	const titleProps = useMemo(() => {
		return { label: 'Titulo', _ref: title };
	}, [title]);
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
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<LabelledInput {...titleProps} />
				<button>Pesquisar</button>
			</form>
			{tableProps.movies.length ? <MovieTable {...tableProps} /> : null}
		</div>
	);
}

export default SearchContainer;
