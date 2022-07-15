import ListDescription from './ListDescription';
import ListMovies from './ListMovies';
import ListName from './ListName';

function ListItem({ id, name, description, items }: TList) {
	const nameProps = { id, name };
	const descriptionProps = { description };
	const moviesProps = { items };
	return {
		Nome: <ListName {...nameProps} />,
		Descricao: <ListDescription {...descriptionProps} />,
		Filmes: <ListMovies {...moviesProps} />,
	};
}

type TList = {
	id: string;
	name: string;
	description: string;
	items: any[];
};

export default ListItem;
