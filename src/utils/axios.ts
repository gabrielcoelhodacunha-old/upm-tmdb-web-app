import instance from 'services/tmdb/api';

function configureUserData(configs: Object) {
	const env = instance.defaults.env as any;
	if (!env) return;
	env.userData = {};
	Object.entries(configs).forEach(([key, value]) => {
		env.userData[key] = value;
	});
}

function getUserData(key: string) {
	const env = instance.defaults.env as any;
	if (!env || !env.userData) return '';
	return env.userData[key];
}

function deleteUserData() {
	const env = instance.defaults.env as any;
	if (!env) return;
	env.userData = null;
}

export { configureUserData, getUserData, deleteUserData };
