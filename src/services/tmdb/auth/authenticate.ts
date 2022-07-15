import { TUser } from 'common/types';
import api from 'services/tmdb/api';
import { removeAllWhiteSpaces } from 'utils/string';

async function authenticate(user: TUser): Promise<void> {
	try {
		const requestToken = await createRequestToken(user);
		await login(user, requestToken);
		await createSession(user, requestToken);
	} catch {
		alert('Credenciais incorretas!');
	}
}

async function createRequestToken({ apiKey }: TUser): Promise<string> {
	const url = removeAllWhiteSpaces(
		`/authentication/token/new?
    api_key=${apiKey}`
	);
	const response = await api.get(url);
	return response.data.request_token;
}

async function login(
	{ username, password, apiKey }: TUser,
	requestToken: string
): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/authentication/token/validate_with_login?
		api_key=${apiKey}`
	);
	const data = {
		username,
		password,
		request_token: requestToken,
	};
	await api.post(url, data);
	localStorage.setItem('apiKey', apiKey);
}

async function createSession(
	{ apiKey }: TUser,
	requestToken: string
): Promise<void> {
	const url = removeAllWhiteSpaces(
		`/authentication/session/new?
		api_key=${apiKey}
		&request_token=${requestToken}`
	);
	const response = await api.get(url);
	localStorage.setItem('sessionId', response.data.session_id);
}

export default authenticate;
