import { cleanup, render, screen } from '@testing-library/react/pure';
import Lists from './Lists';

describe('Lists container', () => {
	beforeAll(() => render(<Lists />));
	afterAll(cleanup);

	it('should render name field', () => {
		const name = screen.getByLabelText('Nome');
		expect(name).toBeInTheDocument();
	});

	it('should render description field', () => {
		const description = screen.getByLabelText('Descricao');
		expect(description).toBeInTheDocument();
	});

	it('should render create list button', () => {
		const createListButton = screen.getByRole('button', { name: /Criar/ });
		expect(createListButton).toBeInTheDocument();
	});
});
