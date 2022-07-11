import { cleanup, render, screen } from '@testing-library/react/pure';
import Search from './Search';

describe('Search container', () => {
	beforeAll(() => render(<Search />));
	afterAll(cleanup);

	it('should render title field', () => {
		const title = screen.getByLabelText('Titulo');
		expect(title).toBeInTheDocument();
	});

	it('should render search button', () => {
		const searchButton = screen.getByRole('button', { name: /Pesquisar/ });
		expect(searchButton).toBeInTheDocument();
	});
});
