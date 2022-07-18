import { deleteList } from 'services/tmdb';

function ListName({ id, name }: Props): JSX.Element {
	async function _deleteList(listId: string) {
		await deleteList(listId);
		window.location.reload();
	}

	return (
		<div>
			<button onClick={() => _deleteList(id)}>Deletar lista</button>
			<p>{name}</p>
		</div>
	);
}

type Props = {
	id: string;
	name: string;
};

export default ListName;
