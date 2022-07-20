import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function addMovieToList(movieId: string, listId: string) {
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	await _addMovieToList(apiKey, sessionId, movieId, listId);
}

async function _addMovieToList(
	apiKey: string,
	sessionId: string,
	movieId: string,
	listId: string
): Promise<any> {
	const url = removeAllWhiteSpaces(
		`/list/${listId}/add_item
      ?api_key=${apiKey}
      &session_id=${sessionId}`
	);
	const data = { media_id: movieId };
	await api.post(url, data);
}

export default addMovieToList;
