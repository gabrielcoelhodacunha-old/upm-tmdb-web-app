import { useMemo, useRef } from 'react';
import { LabelledInput, LabelledTextArea } from 'components';

function CreateListForm({}: Props): JSX.Element {
	const name = useRef(null);
	const description = useRef(null);

	const nameProps = useMemo(() => {
		return { label: 'Nome', _ref: name };
	}, [name]);
	const descriptionProps = useMemo(() => {
		return { label: 'Descricao', _ref: description };
	}, [description]);
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<LabelledInput {...nameProps} />
			<LabelledTextArea {...descriptionProps} />
			<button>Criar Lista</button>
		</form>
	);
}

type Props = {};

export default CreateListForm;
