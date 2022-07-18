import { getItem } from 'utils/localStorage';

function isLoggedIn(): boolean {
	return getItem('sessionId') !== '';
}

export default isLoggedIn;
