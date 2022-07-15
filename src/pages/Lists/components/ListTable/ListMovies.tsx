function ListMovies({ items }: Props): JSX.Element {
	return (
		<div>
			<select disabled={!items.length}>
				{items.map((item) => (
					<option key={item.id} value={item.id}>
						{item.title}
					</option>
				))}
			</select>
			<button>Deletar filme da lista</button>
		</div>
	);
}

type Props = {
	items: any[];
};

export default ListMovies;
