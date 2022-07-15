import { useMemo, useRef } from 'react';
import { LabelledInput } from 'components';

function SearchForm({}: Props): JSX.Element {
	const title = useRef(null);

	const titleProps = useMemo(() => {
		return { label: 'Titulo', _ref: title };
	}, [title]);
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<LabelledInput {...titleProps} />
			<button>Pesquisar</button>
		</form>
	);
}

type Props = {};

export default SearchForm;
