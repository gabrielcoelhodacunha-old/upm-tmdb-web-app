const { until, By } = require('selenium-webdriver');
const {
	getPage,
	getDriver,
	waitUntilLogOutIsComplete,
	acceptAlert,
} = require('../utils');

function logInPage() {
	describe('User at login page', () => {
		beforeEach(async () => {
			await getPage();
		});

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

const TMDB_USERNAME = process.env.TMDB_USERNAME;
const TMDB_PASSWORD = process.env.TMDB_PASSWORD;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function logInWithCredentials(
	username = TMDB_USERNAME,
	password = TMDB_PASSWORD,
	apiKey = TMDB_API_KEY
) {
	const usernameInput = await getDriver().wait(
		until.elementLocated(By.id('username'))
	);
	const passwordInput = await getDriver().wait(
		until.elementLocated(By.id('password'))
	);
	const apiKeyInput = await getDriver().wait(
		until.elementLocated(By.id('apiKey'))
	);

	await getDriver().executeScript(
		`
		arguments[0].value = "${username}"
		arguments[1].value = "${password}"
		arguments[2].value = "${apiKey}"
	`,
		usernameInput,
		passwordInput,
		apiKeyInput
	);

	await getDriver()
		.wait(until.elementLocated(By.id('logIn')))
		.click();
}

module.exports = { logInPage, logInWithCredentials };
