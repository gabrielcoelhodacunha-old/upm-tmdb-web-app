function MovieLists({ id, lists }: Props): JSX.Element {
	const hasLists = lists.length > 0;
	const isMovieInSelectedList = false;

	const addMovieToList = () => {
		console.log(`Added movie ${id}`);
	};

	const deleteMovieFromList = () => {
		console.log(`Deleted movie ${id}`);
	};

	return (
		<div>
			<select disabled={!lists.length}>
				{lists.map((list) => (
					<option key={list.id} value={list.id}>
						{list.name}
					</option>
				))}
			</select>
			<button
				onClick={addMovieToList}
				disabled={!hasLists || isMovieInSelectedList}
			>
				Adicionar
			</button>
			<button
				onClick={deleteMovieFromList}
				disabled={!hasLists || !isMovieInSelectedList}
			>
				Remover
			</button>
		</div>
	);
}

type Props = {
	id: string;
	lists: any[];
};

export default MovieLists;
