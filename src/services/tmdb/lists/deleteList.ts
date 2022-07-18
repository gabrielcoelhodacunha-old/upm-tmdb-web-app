import { TUserData } from 'common/types';
import { getUserData } from 'utils/axios';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function deleteList(listId: string) {
	await _deleteList(getUserData(), listId);
}

async function _deleteList(
	{ apiKey, sessionId }: TUserData,
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
