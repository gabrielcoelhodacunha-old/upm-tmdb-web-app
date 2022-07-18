import deleteList from './deleteList';

function ListName({ id, name }: Props): JSX.Element {
	const onClick = () => deleteList(id);
	return (
		<div>
			<button onClick={onClick}>Deletar lista</button>
			<p>{name}</p>
		</div>
	);
}

type Props = {
	id: string;
	name: string;
};

export default ListName;
