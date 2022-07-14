import MovieTitle from './MovieTitle';
import MovieLists from './MovieLists';

function MovieItem({ id, title, image }: TMovie, lists: any[]) {
	const movieTitleProps = { title, image };
	const listsProps = { id, lists };
	return {
		Filme: <MovieTitle {...movieTitleProps} />,
		Listas: <MovieLists {...listsProps} />,
	};
}

type TMovie = {
	id: string;
	title: string;
	image?: string;
};

export default MovieItem;
