function MovieTitle({ title, image }: Props): JSX.Element {
	return (
		<div>
			<img src={image} alt={selectAltText(title, image)} />
			<p>{title}</p>
		</div>
	);
}

type Props = {
	title: string;
	image?: string;
};

function selectAltText(title: string, image?: string): string {
	return image ? `Poster for ${title}` : 'Poster not found';
}

export default MovieTitle;
