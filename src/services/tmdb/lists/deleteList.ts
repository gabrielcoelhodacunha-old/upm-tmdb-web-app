import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteList(listId: string): Promise<void> {
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	const url = removeAllWhiteSpaces(
		`/list/${listId}
    ?api_key=${apiKey}
    &session_id=${sessionId}`
	);
	await api.delete(url).catch(() => {});
}

export default deleteList;
