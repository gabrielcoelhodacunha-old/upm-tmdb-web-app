import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteSession(): Promise<void> {
	const apiKey = localStorage.getItem('apiKey') || '';
	const url = removeAllWhiteSpaces(
		`/authentication/session
		?api_key=${apiKey}`
	);
	const session_id = getItem('sessionId');
	const data = { session_id };
	await api.delete(url, { data });
	localStorage.clear();
}

export default deleteSession;
