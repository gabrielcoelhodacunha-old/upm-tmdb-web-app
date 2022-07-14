import { useMemo, useRef } from 'react';
import { LabelledInput, LabelledTextArea, ListTable } from '../../components';

function ListsContainer(): JSX.Element {
	const name = useRef(null);
	const description = useRef(null);

	const nameProps = useMemo(() => {
		return { label: 'Nome', _ref: name };
	}, [name]);
	const descriptionProps = useMemo(() => {
		return { label: 'Descricao', _ref: description };
	}, [description]);
	const tableProps = useMemo(() => {
		return {
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
	}, []);
	return (
		<div id='lists_container'>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<LabelledInput {...nameProps} />
				<LabelledTextArea {...descriptionProps} />
				<button>Criar Lista</button>
			</form>
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
