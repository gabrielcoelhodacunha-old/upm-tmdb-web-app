import { getItem, getParsed, setParsed } from 'utils/localStorage';
import { removeAllWhiteSpaces } from 'utils/string';
import api from '../api';

async function createList(name: string, description: string): Promise<void> {
	const lists = getParsed<any[]>('lists');
	if (lists.some((list) => list.name === name)) {
		return alert(`A lista '${name}' ja existe!`);
	}
	const apiKey = getItem('apiKey');
	const sessionId = getItem('sessionId');
	const url = removeAllWhiteSpaces(
		`/list
    ?api_key=${apiKey}
    &session_id=${sessionId}`
	);
	const data = { name, description, language: 'pt-br' };
	await api.post(url, data);
}

export default createList;
