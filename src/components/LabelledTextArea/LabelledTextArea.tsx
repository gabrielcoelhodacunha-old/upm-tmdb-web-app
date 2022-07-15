import { forwardRef } from 'react';
import { LabelStyle } from 'assets/styles';

function LabelledTextArea({ label, _ref }: Props): JSX.Element {
	const textAreaProps = { ref: _ref };
	return (
		<LabelStyle>
			{label}
			<TextArea {...textAreaProps} />
		</LabelStyle>
	);
}

type Props = {
	label: string;
	_ref?: any;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, ref) => <textarea {...props} ref={ref} />
);

type TextAreaProps = {};

export default LabelledTextArea;
