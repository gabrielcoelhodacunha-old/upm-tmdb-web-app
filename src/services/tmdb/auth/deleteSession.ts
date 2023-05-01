import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';
import { getItem } from 'utils/localStorage';

async function deleteSession() {
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	await _deleteSession(apiKey, sessionId);
	localStorage.clear();
}

async function _deleteSession(
	apiKey: string,
	sessionId: string
): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/authentication/session
		?api_key=${apiKey}`
	);
	const data = { session_id: sessionId };
	await api.delete(url, { data });
}

export default deleteSession;
