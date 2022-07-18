import { TUserData } from 'common/types';
import instance from 'services/tmdb/api';

function configureUserData(configs: Object) {
	const env = instance.defaults.env as any;
	if (!env) return;
	env.userData = {} as TUserData;
	Object.entries(configs).forEach(([key, value]) => {
		env.userData[key] = value;
	});
}

function getUserData(): TUserData {
	const env = instance.defaults.env as any;
	if (!env || !env.userData) return {} as TUserData;
	return env.userData as TUserData;
}

function deleteUserData() {
	const env = instance.defaults.env as any;
	if (!env) return;
	env.userData = {};
}

export { configureUserData, getUserData, deleteUserData };
