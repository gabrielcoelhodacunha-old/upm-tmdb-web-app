import { cleanup, render, screen } from '@testing-library/react/pure';
import Login from './Login';

describe('Login component', () => {
	beforeAll(() => render(<Login />));
	afterAll(cleanup);

	it('should render login field', () => {
		const login = screen.getByLabelText('Login');
		expect(login).toBeInTheDocument();
	});

	it('should render password field', () => {
		const password = screen.getByLabelText('Password');
		expect(password).toBeInTheDocument();
	});

	it('should render api key field', () => {
		const apiKey = screen.getByLabelText('Api Key');
		expect(apiKey).toBeInTheDocument();
	});
});
