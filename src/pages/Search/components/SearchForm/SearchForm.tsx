import { LabelledInput } from 'components';

function SearchForm({ titleRef, search }: Props): JSX.Element {
	const titleProps = {
		label: 'Titulo',
		_ref: titleRef,
	};
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				search();
			}}
		>
			<LabelledInput {...titleProps} />
			<button>Pesquisar</button>
		</form>
	);
}

type Props = {
	titleRef: any;
	search(): void;
};

export default SearchForm;
