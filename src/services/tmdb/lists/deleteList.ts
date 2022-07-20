import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteList(listId: string) {
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	await _deleteList(apiKey, sessionId, listId);
}

async function _deleteList(
	apiKey: string,
	sessionId: string,
	listId: string
): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/list/${listId}
    ?api_key=${apiKey}
    &session_id=${sessionId}`
	);
	await api.delete(url).catch(() => {});
}

export default deleteList;
