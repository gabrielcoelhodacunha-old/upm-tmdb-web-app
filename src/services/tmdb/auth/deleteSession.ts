import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteSession() {
	const apiKey = localStorage.getItem('apiKey') || '';
	const url = removeAllWhiteSpaces(`/authentication/session?api_key=${apiKey}`);
	const data = { session_id: localStorage.getItem('sessionId') || '' };
	await api.delete(url, { data });
	localStorage.clear();
}

export default deleteSession;
