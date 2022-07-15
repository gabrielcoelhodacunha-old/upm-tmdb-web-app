import { forwardRef, RefObject } from 'react';
import { LabelStyle } from 'assets/styles';

function LabelledTextArea({ label, _ref, onBlur }: Props): JSX.Element {
	const textAreaProps = { ref: _ref, onBlur };
	return (
		<LabelStyle>
			{label}
			<TextArea {...textAreaProps} />
		</LabelStyle>
	);
}

type Props = {
	label: string;
	_ref?: RefObject<HTMLTextAreaElement>;
} & TextAreaProps;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, ref) => <textarea {...props} ref={ref} />
);

type TextAreaProps = {
	onBlur(): void;
};

export default LabelledTextArea;
