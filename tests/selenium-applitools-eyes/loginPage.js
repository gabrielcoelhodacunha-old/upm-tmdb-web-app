const { PAGES, waitUntilLogOutIsComplete } = require('../selenium/utils');
const { setBatchInfoForPage, checkPage } = require('./utils');
const { logInWithCredentials } = require('../selenium/loginPageUtils');

function logInPage() {
	describe(`Usuário na página ${PAGES.LOGIN}`, () => {
		beforeAll(async () => {
			await setBatchInfoForPage(PAGES.LOGIN);
		});

		describe('com credenciais válidas', () => {
			it('consegue acessar a aplicação', async () => {
				await checkPage(PAGES.LOGIN);
				await logInWithCredentials();
				await checkPage(PAGES.SEARCH);
			});

			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});
		});
	});
}

module.exports = logInPage;
