import { useMemo } from 'react';
import { CreateListForm, ListTable } from './components';

function ListsContainer(): JSX.Element {
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
			<CreateListForm />
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
