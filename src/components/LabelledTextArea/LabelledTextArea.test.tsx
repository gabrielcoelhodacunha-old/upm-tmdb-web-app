import { render, screen } from '@testing-library/react/pure';
import LabelledTextArea from './LabelledTextArea';

describe('LabelledTextArea component', () => {
	it('should have label', () => {
		const props = { label: 'Name' };
		render(<LabelledTextArea {...props} />);
		const textArea = screen.getByLabelText(props.label);
		expect(textArea).toBeInTheDocument();
	});
});
