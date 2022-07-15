import { TMDB_IMAGES } from 'common/constants/urls';

function MovieTitle({ title, poster_path }: Props): JSX.Element {
	const image = poster_path ? TMDB_IMAGES + poster_path : '/';
	return (
		<div>
			<img src={image} alt={selectAltText(title, poster_path)} />
			<p>{title}</p>
		</div>
	);
}

type Props = {
	title: string;
	poster_path?: string;
};

function selectAltText(title: string, poster_path?: string): string {
	return poster_path ? `Poster for ${title}` : 'Poster not found';
}

export default MovieTitle;
