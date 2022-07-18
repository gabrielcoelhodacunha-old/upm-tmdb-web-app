import { TUserData } from 'common/types';
import { getUserData } from 'utils/axios';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function searchMovie(query: string, page = 1) {
	return _searchMovie(getUserData(), query, page);
}

async function _searchMovie(
	{ apiKey }: TUserData,
	query: string,
	page: number
): Promise<any> {
	const url = removeAllWhiteSpaces(
		`/search/movie
		?api_key=${apiKey}
    &query=${encodeURI(query)}
    &page=${page}`
	);
	const response = await api.get(url);
	return response.data.results;
}

export default searchMovie;
