import { cleanup, render, screen } from '@testing-library/react/pure';
import MovieTable from './MovieTable';

describe('Table component', () => {
	describe('with 3 movies and 2 lists', () => {
		beforeAll(() => {
			const props = {
				movies: [
					{ id: '1', title: 'Movie 1' },
					{ id: '2', title: 'Movie 2' },
					{ id: '3', title: 'Movie 3' },
				],
				lists: [
					{ id: '1', name: 'List 1' },
					{ id: '2', name: 'List 2' },
				],
			};
			render(<MovieTable {...props} />);
		});
		afterAll(cleanup);

		it('should render 3 movies', () => {
			const movies = screen.getAllByText(/Movie/);
			expect(movies.length).toBe(3);
		});

		it('should render 2 lists for each movie', () => {
			const movies = screen.getAllByText(/Movie/);
			const lists = screen.getAllByText(/List /);
			expect(lists.length).toBe(movies.length * 2);
		});
	});

	describe('without movies and with 2 lists', () => {
		beforeAll(() => {
			const props = {
				movies: [],
				lists: [
					{ id: '1', name: 'List 1' },
					{ id: '2', name: 'List 2' },
				],
			};
			render(<MovieTable {...props} />);
		});
		afterAll(cleanup);

		it('should not render movies', () => {
			const movies = screen.queryAllByText(/Movie/);
			expect(movies.length).toBe(0);
		});

		it('should not render lists', () => {
			const lists = screen.queryAllByText(/List /);
			expect(lists.length).toBe(0);
		});
	});
});
