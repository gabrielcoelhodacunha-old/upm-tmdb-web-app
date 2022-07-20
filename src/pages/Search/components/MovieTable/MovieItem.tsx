import MovieTitle from './MovieTitle';
import MovieLists from './MovieLists';
import { TMovie } from 'common/types';

function MovieItem({ id, title, poster_path }: TMovie) {
	const movieTitleProps = { title, poster_path };
	const listsProps = { movieId: id };
	return {
		Filme: <MovieTitle {...movieTitleProps} />,
		Listas: <MovieLists {...listsProps} />,
	};
}

export default MovieItem;
