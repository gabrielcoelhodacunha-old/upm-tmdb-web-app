import { getItem } from 'utils/localStorage';

function isLoggedIn(): boolean {
	return getItem('isLoggedIn') === 'true';
}

export default isLoggedIn;
