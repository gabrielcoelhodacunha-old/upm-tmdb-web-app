import { render, screen } from '@testing-library/react/pure';
import Table from './Table';

describe('Table component', () => {
	it('should render', () => {
		const props = { data: [], columns: [] };
		render(<Table {...props} />);
		const textArea = screen.getByRole('table');
		expect(textArea).toBeInTheDocument();
	});
});
