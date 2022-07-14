import { forwardRef } from 'react';
import { LabelStyle } from '../../assets/styles';

function LabelledInput({ label, type, _ref }: Props): JSX.Element {
	const inputProps = { ref: _ref, type };
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
	type?: string;
};

export default LabelledInput;
