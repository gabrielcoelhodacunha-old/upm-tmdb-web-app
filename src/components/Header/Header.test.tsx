import { cleanup, render, screen } from '@testing-library/react/pure';
import Header from './Header';

describe('Header component', () => {
	beforeAll(() => render(<Header />));
	afterAll(cleanup);

	it('should render image', () => {
		const image = screen.getByRole('img');
		expect(image).toBeInTheDocument();
	});

	it('should render paragraph', () => {
		const paragraph = screen.getByText(/TMDB/);
		expect(paragraph).toBeInTheDocument();
	});
});
