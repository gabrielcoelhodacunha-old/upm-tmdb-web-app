import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLists, selectLists } from 'redux/tmdb';
import { createList } from 'services/tmdb';
import { getItem, setItem } from 'utils/localStorage';
import { CreateListForm, ListTable } from './components';

function ListsContainer(): JSX.Element {
	const name = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectLists);

	useEffect(() => {
		fillFieldsWithPreviousValues();
	}, []);

	const fillFieldsWithPreviousValues = () => {
		if (!name.current || !description.current) return;
		name.current.value = getItem('listName');
		description.current.value = getItem('listDescription');
		setFieldsInLocalStorage();
	};

	const setFieldsInLocalStorage = () => {
		if (!name.current || !description.current) return;
		setItem('listName', name.current.value);
		setItem('listDescription', description.current.value);
	};

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
		dispatch(getLists());
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
