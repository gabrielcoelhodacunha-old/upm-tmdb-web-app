import { forwardRef } from 'react';
import { LabelStyle } from 'assets/styles';

function LabelledInput({ id, label, type, _ref }: Props): JSX.Element {
	const inputProps = { id, type, ref: _ref };
	return (
		<LabelStyle>
			{label}
			<Input {...inputProps} />
		</LabelStyle>
	);
}

type Props = {
	label: string;
	_ref?: any;
} & InputProps;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
	<input {...props} ref={ref} />
));

type InputProps = {
	id?: string;
	type?: string;
};

export default LabelledInput;
