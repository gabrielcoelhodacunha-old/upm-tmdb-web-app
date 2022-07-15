import { TList } from 'common/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createList, getMoviesLists } from 'services/tmdb';
import { getItem, getParsed, setItem } from 'utils/localStorage';
import { CreateListForm, ListTable } from './components';

function ListsContainer(): JSX.Element {
	const name = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLTextAreaElement>(null);
	const [lists, setLists] = useState<TList[]>(getParsed('lists'));

	useEffect(() => {
		if (!name.current || !description.current) return;
		name.current.value = getItem('listName');
		description.current.value = getItem('listDescription');
	}, []);

	const create = async () => {
		const nameValue = name.current ? name.current.value : '';
		if (!nameValue) return alert(`O campo 'Nome' deve ser preenchido!`);
		const descriptionValue = description.current
			? description.current.value
			: '';
		await createList(nameValue, descriptionValue);
		if (!name.current || !description.current) return;
		name.current.value = '';
		description.current.value = '';
		setItem('listName', name.current.value);
		setItem('listDescription', description.current.value);

		setLists(await getMoviesLists());
	};

	const formProps = {
		name: { _ref: name },
		description: { _ref: description },
		create,
	};

	const tableProps = useMemo(() => {
		return { lists };
	}, [lists]);
	return (
		<div id='lists_container'>
			<CreateListForm {...formProps} />
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
