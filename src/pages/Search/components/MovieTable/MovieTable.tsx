import { Table } from 'components';
import MovieItem from './MovieItem';

function MovieTable({ movies, lists }: Props): JSX.Element {
	const tableProps = {
		columns: ['Filme', 'Listas'],
		data: movies.map((movie) => MovieItem(movie, lists)),
	};
	return <Table {...tableProps} />;
}

type Props = {
	movies: any[];
	lists: any[];
};

export default MovieTable;
