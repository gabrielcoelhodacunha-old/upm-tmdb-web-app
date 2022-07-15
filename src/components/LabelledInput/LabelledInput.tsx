import { forwardRef, RefObject } from 'react';
import { LabelStyle } from 'assets/styles';

function LabelledInput({ id, label, type, _ref, onBlur }: Props): JSX.Element {
	const inputProps = { id, type, ref: _ref, onBlur };
	return (
		<LabelStyle>
			{label}
			<Input {...inputProps} />
		</LabelStyle>
	);
}

type Props = {
	label: string;
	_ref?: RefObject<HTMLInputElement>;
} & InputProps;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
	<input {...props} ref={ref} />
));

type InputProps = {
	id?: string;
	type?: string;
	onBlur(): void;
};

export default LabelledInput;
