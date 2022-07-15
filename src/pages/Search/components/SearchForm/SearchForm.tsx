import { LabelledInput } from 'components';

function SearchForm({ titleRef, search, onBlur }: Props): JSX.Element {
	const titleProps = {
		label: 'Titulo',
		_ref: titleRef,
		onBlur,
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
	onBlur(): void;
};

export default SearchForm;
