function ListDescription({ description }: Props): JSX.Element {
	return (
		<div>
			<p>{description}</p>
		</div>
	);
}

type Props = {
	description: string;
};

export default ListDescription;
