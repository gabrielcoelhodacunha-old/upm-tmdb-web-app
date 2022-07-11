import { forwardRef, useId } from 'react';

function LabelledTextArea(props: Props): JSX.Element {
	const { label, _ref } = props;
	const id = useId();
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<TextArea ref={_ref} id={id} />
		</div>
	);
}

type Props = {
	label: string;
	_ref?: any;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, ref) => <textarea {...props} ref={ref} />
);

type TextAreaProps = {
	id: string;
};

export default LabelledTextArea;
