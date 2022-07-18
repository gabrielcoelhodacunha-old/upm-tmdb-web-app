import { TUserData } from 'common/types';
import { deleteUserData, getUserData } from 'utils/axios';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteSession() {
	_deleteSession(getUserData());
	deleteUserData();
	localStorage.clear();
}

async function _deleteSession({ apiKey, sessionId }: TUserData): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/authentication/session
		?api_key=${apiKey}`
	);
	const data = { session_id: sessionId };
	await api.delete(url, { data });
}

export default deleteSession;
