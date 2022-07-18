import { getUserData } from 'utils/axios';

function isLoggedIn(): boolean {
	return getUserData('sessionId') !== '';
}

export default isLoggedIn;
