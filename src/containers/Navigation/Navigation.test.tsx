import { cleanup, render, screen } from '@testing-library/react/pure';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation container', () => {
	beforeAll(() =>
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		)
	);
	afterAll(cleanup);

	it('should render button Pesquisar', () => {
		const searchButton = screen.getByText('Pesquisar');
		expect(searchButton).toBeInTheDocument();
	});

	it('should render button Listas', () => {
		const listsButton = screen.getByText('Listas');
		expect(listsButton).toBeInTheDocument();
	});
});
