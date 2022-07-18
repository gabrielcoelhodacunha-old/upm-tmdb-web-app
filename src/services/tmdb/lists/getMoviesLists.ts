import { TList } from 'common/types';
import { getItem } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function getMoviesLists(): Promise<TList[]> {
	const username = getItem('username');
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	const url = removeAllWhiteSpaces(
		`/account/${username}/lists
    ?api_key=${apiKey}
    &session_id=${sessionId}`
	);
	const response = await api.get(url);
	const results = response.data.results as any[];
	let lists: TList[] = [];
	for (const { id, name, description } of results) {
		const items = await getListById(apiKey, id);
		lists.push({ id, name, description, items });
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

export default getMoviesLists;
