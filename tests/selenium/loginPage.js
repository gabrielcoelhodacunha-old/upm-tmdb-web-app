const {
	waitUntilLogOutIsComplete,
	//acceptAlert
} = require('./utils');
const { logInWithCredentials } = require('./loginPageUtils');

function logInPage() {
	describe('Usuário na página Login', () => {
		describe('com credenciais válidas', () => {
			it('consegue acessar a aplicação', async () => {
				await logInWithCredentials();
			});

			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});
		});

		// describe('sem credenciais válidas', () => {
		// 	it('não consegue acessar a aplicação', async () => {
		// 		await logInWithCredentials('username', 'password', 'apiKey');
		// 		await acceptAlert();
		// 	});
		// });
	});
}

module.exports = logInPage;
