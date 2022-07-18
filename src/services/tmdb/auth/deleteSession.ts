import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteSession(apiKey: string, sessionId: string): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/authentication/session
		?api_key=${apiKey}`
	);
	const data = { session_id: sessionId };
	await api.delete(url, { data });
}

export default deleteSession;
