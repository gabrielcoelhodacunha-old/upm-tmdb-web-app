function MovieItem({ id, title, image }: Props, lists: any[]) {
	const hasLists = lists.length > 0;
	const isMovieInSelectedList = false;
	return {
		Filme: (
			<div>
				<img src={image} alt={altTextForImage(title, image)} />
				<p>{title}</p>
			</div>
		),
		Listas: (
			<div>
				<select disabled={!lists.length}>
					{lists.map((list) => (
						<option key={list.id} value={list.id}>
							{list.name}
						</option>
					))}
				</select>
				<button
					onClick={() => {}}
					disabled={!hasLists || isMovieInSelectedList}
				>
					Adicionar
				</button>
				<button
					onClick={() => {}}
					disabled={!hasLists || !isMovieInSelectedList}
				>
					Remover
				</button>
			</div>
		),
	};
}

type Props = {
	id: string;
	title: string;
	image?: string;
};

function altTextForImage(title: string, image?: string): string {
	return image ? `Poster for ${title}` : 'Poster not found';
}

export default MovieItem;
