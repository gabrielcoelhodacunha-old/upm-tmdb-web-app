import { cleanup, render, screen } from '@testing-library/react/pure';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login container', () => {
	beforeAll(() =>
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		)
	);
	afterAll(cleanup);

	it('should render username field', () => {
		const username = screen.getByLabelText('Username');
		expect(username).toBeInTheDocument();
	});

	it('should render password field', () => {
		const password = screen.getByLabelText('Password');
		expect(password).toBeInTheDocument();
	});

	it('should render api key field', () => {
		const apiKey = screen.getByLabelText('Api Key');
		expect(apiKey).toBeInTheDocument();
	});

	it('should render login button', () => {
		const loginButton = screen.getByRole('button');
		expect(loginButton).toBeInTheDocument();
	});
});
