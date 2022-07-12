function ListItem({ id, name, description, items }: Props) {
	return {
		Nome: (
			<div>
				<button>Deletar lista</button>
				<p>{name}</p>
			</div>
		),
		Descricao: <p>{description}</p>,
		Filmes: (
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
		),
	};
}

type Props = {
	id: string;
	name: string;
	description: string;
	items: any[];
};

export default ListItem;
