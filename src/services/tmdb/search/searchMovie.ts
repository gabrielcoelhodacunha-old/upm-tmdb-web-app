import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function searchMovie(query: string, page = 1): Promise<any> {
	const apiKey = localStorage.getItem('apiKey') || '';
	const url = removeAllWhiteSpaces(
		`/search/movie?
    api_key=${apiKey}
    &query=${encodeURI(query)}
    &page=${page}`
	);
	const response = await api.get(url);
	return response.data.results;
}

export default searchMovie;
