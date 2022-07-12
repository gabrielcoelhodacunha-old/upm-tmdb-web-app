import { useRef } from 'react';
import { LabelledInput, LabelledTextArea, ListTable } from '../../components';

function ListsContainer(): JSX.Element {
	const name = useRef(null);
	const description = useRef(null);

	const nameProps = { label: 'Nome', _ref: name };
	const descriptionProps = { label: 'Descricao', _ref: description };
	const tableProps = {
		lists: [
			{
				id: '1',
				name: 'Anime',
				description: 'Anime list',
				items: [{ id: '1', title: '1' }],
			},
			{
				id: '2',
				name: 'Anime 2',
				description: 'Anime list 2',
				items: [{ id: '1', title: '1' }],
			},
		],
	};
	return (
		<div id='lists_container'>
			<LabelledInput {...nameProps} />
			<LabelledTextArea {...descriptionProps} />
			<button onClick={() => {}}>Criar Lista</button>
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
