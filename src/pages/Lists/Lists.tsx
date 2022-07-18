import { TList } from 'common/types';
import { useEffect, useRef, useState } from 'react';
import { createList, getMoviesLists } from 'services/tmdb';
import { getItem, getParsed, setItem, setParsed } from 'utils/localStorage';
import { CreateListForm, ListTable } from './components';

function ListsContainer(): JSX.Element {
	const name = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLTextAreaElement>(null);
	const [lists, setLists] = useState<TList[]>([]);

	useEffect(() => {
		getLists();
		fillFieldsWithPreviousValues();
	}, []);

	useEffect(() => {
		setParsed('lists', lists);
	}, [lists]);

	async function getLists() {
		const localStorageLists = getParsed<TList[]>('lists');
		const newLists = localStorageLists.length
			? localStorageLists
			: await getMoviesLists();
		setLists(newLists);
	}

	function fillFieldsWithPreviousValues() {
		if (!name.current || !description.current) return;
		name.current.value = getItem('listName');
		description.current.value = getItem('listDescription');
		setFieldsInLocalStorage();
	}

	function setFieldsInLocalStorage() {
		if (!name.current || !description.current) return;
		setItem('listName', name.current.value);
		setItem('listDescription', description.current.value);
	}

	const clearFieldsValues = () => {
		if (!name.current || !description.current) return;
		name.current.value = '';
		description.current.value = '';
		setFieldsInLocalStorage();
	};

	const create = async () => {
		const nameValue = name.current ? name.current.value : '';
		if (!nameValue) return alert(`O campo 'Nome' deve ser preenchido!`);
		const descriptionValue = description.current
			? description.current.value
			: '';
		await createList(nameValue, descriptionValue);
		clearFieldsValues();
		setLists(await getMoviesLists());
	};

	const formProps = {
		name: { _ref: name },
		description: { _ref: description },
		create,
	};

	const tableProps = { lists };

	return (
		<div id='lists_container'>
			<CreateListForm {...formProps} />
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
