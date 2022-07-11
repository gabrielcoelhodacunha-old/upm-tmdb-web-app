import { forwardRef, useId } from 'react';

function LabelledInput(props: Props): JSX.Element {
	const { label, type, _ref } = props;
	const id = useId();
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<Input ref={_ref} id={id} type={type} />
		</div>
	);
}

type Props = {
	label: string;
	type?: string;
	_ref?: any;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
	<input {...props} ref={ref} />
));

type InputProps = {
	id: string;
	type?: string;
};

export default LabelledInput;
