import { deleteList as _deleteList } from 'services/tmdb';

async function deleteList(listId: string) {
	await _deleteList(listId);
}

export default deleteList;
