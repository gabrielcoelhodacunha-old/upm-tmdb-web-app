import MovieTitle from './MovieTitle';
import MovieLists from './MovieLists';

function MovieItem({ id, title, poster_path }: TMovie, lists: any[]) {
	const movieTitleProps = { title, poster_path };
	const listsProps = { id, lists };
	return {
		Filme: <MovieTitle {...movieTitleProps} />,
		Listas: <MovieLists {...listsProps} />,
	};
}

type TMovie = {
	id: string;
	title: string;
	poster_path?: string;
};

export default MovieItem;
