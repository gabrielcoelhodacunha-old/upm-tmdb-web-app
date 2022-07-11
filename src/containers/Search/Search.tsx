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
			{ id: '1', name: 'Listao' },
			{ id: '2', name: 'Oat' },
		],
	};
	return (
		<div id='search_container'>
			<LabelledInput {...titleProps} />
			<button onClick={() => {}}>Pesquisar</button>
			<MovieTable {...tableProps} />
		</div>
	);
}

export default SearchContainer;
