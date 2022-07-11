import { useRef } from 'react';
import { LabelledInput, LabelledTextArea } from '../../components';

function ListsContainer(): JSX.Element {
	const name = useRef(null);
	const description = useRef(null);

	const nameProps = { label: 'Nome', _ref: name };
	const descriptionProps = { label: 'Descricao', _ref: description };
	return (
		<div id='lists_container'>
			<LabelledInput {...nameProps} />
			<LabelledTextArea {...descriptionProps} />
			<button onClick={() => {}}>Criar Lista</button>
		</div>
	);
}

export default ListsContainer;
