import { TMovie } from 'common/types';
import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function searchMovie(query: string, page = 1) {
	if (!query) return [];
	const apiKey = getItem('apiKey');
	return await _searchMovie(apiKey, query, page);
}

async function _searchMovie(
	apiKey: string,
	query: string,
	page: number
): Promise<TMovie[]> {
	const url = removeAllWhiteSpaces(
		`/search/movie
		?api_key=${apiKey}
    &query=${encodeURI(query)}
    &page=${page}`
	);
	const response = await api.get(url);
	const results = response.data.results as any[];
	let movies = [] as TMovie[];
	results.forEach(({ id, poster_path, title }) => {
		movies.push({ id: String(id), poster_path, title });
	});
	return movies;
}

export default searchMovie;
