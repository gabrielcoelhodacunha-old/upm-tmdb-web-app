import { render, screen } from '@testing-library/react/pure';
import LabelledInput from './LabelledInput';

describe('LabelledInput component', () => {
	it('should have label', () => {
		const props = { label: 'Name', onBlur: () => {} };
		render(<LabelledInput {...props} />);
		const input = screen.getByLabelText(props.label);
		expect(input).toBeInTheDocument();
	});
});
