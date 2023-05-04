const { BatchInfo } = require('@applitools/eyes-selenium');
const { waitUntilLogOutIsComplete, acceptAlert } = require('../utils');
const {
	APPLITOOLS_APP,
	useEyesToCheckWholePage,
	getEyesConfig,
} = require('./applitoolsEyesUtils');
const { logInWithCredentials } = require('./loginPageUtils');

function logInPage() {
	describe('User at login page', () => {
		beforeAll(async () => {
			getEyesConfig().setBatch(new BatchInfo(`${APPLITOOLS_APP} @ Login page`));
		});

		describe('with valid credentials', () => {
			it('can log in', async () => {
				await useEyesToCheckWholePage('Login');
				await logInWithCredentials();
				await useEyesToCheckWholePage('Search');
			});

			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});
		});

		describe('without valid credentials', () => {
			it("can't log in", async () => {
				// eyes
				await logInWithCredentials('username', 'password', 'apiKey');
				await acceptAlert();
				// eyes
			});
		});
	});
}

module.exports = logInPage;
