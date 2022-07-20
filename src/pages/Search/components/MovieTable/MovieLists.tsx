import { TList } from 'common/types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
	addMovieToList,
	getLists,
	removeMovieFromList,
	selectLists,
} from 'redux/tmdb';

function MovieLists({ movieId }: Props): JSX.Element {
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectLists);
	const select = useRef<HTMLSelectElement>(null);
	const [isMovieInList, setIsMovieInList] = useState<boolean>(false);
	const hasLists = lists.length > 0;

	useEffect(() => {
		toggleButtons();
	}, [lists]);

	function toggleButtons() {
		setIsMovieInList(isMovieInSelectedList());
	}

	function isMovieInSelectedList() {
		const selectedListId = select.current ? select.current.value : '';
		if (!selectedListId) return false;
		const selectedList = lists.find((list) => list.id === selectedListId);
		if (!selectedList) return false;
		return selectedList.items.some((item) => item.id === movieId);
	}

	const _addMovieToList = async () => {
		if (!select.current) return;
		await dispatch(addMovieToList({ movieId, listId: select.current.value }));
		await dispatch(getLists());
	};

	const _removeMovieFromList = async () => {
		if (!select.current) return;
		await dispatch(
			removeMovieFromList({ movieId, listId: select.current.value })
		);
		await dispatch(getLists());
	};

	const selectProps = {
		disabled: !hasLists,
		onChange: toggleButtons,
		lists,
	};

	const addProps = {
		text: 'Adicionar',
		onClick: () => _addMovieToList(),
		disabled: !hasLists || isMovieInList,
	};

	const removeProps = {
		text: 'Remover',
		onClick: () => _removeMovieFromList(),
		disabled: !hasLists || !isMovieInList,
	};

	return (
		<div>
			<Select ref={select} {...selectProps} />
			<Button {...addProps} />
			<Button {...removeProps} />
		</div>
	);
}

type Props = {
	movieId: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ disabled, onChange, lists }, ref) => (
		<select ref={ref} disabled={disabled} onChange={onChange}>
			{lists.map((list) => (
				<option key={list.id} value={list.id}>
					{list.name}
				</option>
			))}
		</select>
	)
);

type SelectProps = {
	disabled: boolean;
	onChange(): void;
	lists: TList[];
};

function Button({ text, onClick, disabled }: ButtonProps) {
	return (
		<button onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
}

type ButtonProps = {
	text: string;
	onClick(): void;
	disabled: boolean;
};

export default MovieLists;
