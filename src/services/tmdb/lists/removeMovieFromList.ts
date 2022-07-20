import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function removeMovieFromList(movieId: string, listId: string) {
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	await _removeMovieFromList(apiKey, sessionId, movieId, listId);
}

async function _removeMovieFromList(
	apiKey: string,
	sessionId: string,
	movieId: string,
	listId: string
): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/list/${listId}/remove_item
      ?api_key=${apiKey}
      &session_id=${sessionId}`
	);
	await api.post(url, { media_id: movieId });
}

export default removeMovieFromList;
