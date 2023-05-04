const { waitUntilLogOutIsComplete, acceptAlert } = require('../utils');
const { logInWithCredentials } = require('./loginPageUtils');

function logInPage() {
	describe('User at login page', () => {
		describe('with valid credentials', () => {
			it('can log in', async () => {
				await logInWithCredentials();
			});

			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});
		});

		describe('without valid credentials', () => {
			it("can't log in", async () => {
				await logInWithCredentials('username', 'password', 'apiKey');
				await acceptAlert();
			});
		});
	});
}

module.exports = logInPage;
