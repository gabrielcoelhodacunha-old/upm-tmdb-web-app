import { TList } from 'common/types';
import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function getLists() {
	const username = getItem('username');
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	return await _gesLists(username, apiKey, sessionId);
}

async function _gesLists(
	username: string,
	apiKey: string,
	sessionId: string
): Promise<TList[]> {
	const url = removeAllWhiteSpaces(
		`/account/${username}/lists
    ?api_key=${apiKey}
    &session_id=${sessionId}`
	);
	const response = await api.get(url);
	const results = response.data.results as any[];
	let lists: TList[] = [];
	for (const { id, name, description } of results) {
		const items = (await getListById(apiKey, id)) as any[];
		let movies = [] as any[];
		items.forEach(({ id, poster_path, title }) => {
			movies.push({ id: String(id), poster_path, title });
		});
		lists.push({ id: String(id), name, description, items: movies });
	}
	return lists;
}

async function getListById(apiKey: string, listId: string): Promise<any> {
	const url = removeAllWhiteSpaces(
		`/list/${listId}
    ?api_key=${apiKey}`
	);
	const response = await api.get(url);
	return response.data.items;
}

export default getLists;
