const { until, By } = require('selenium-webdriver');
const { getDriver } = require('../utils');

async function logInWithCredentials(
	username = process.env.TMDB_USERNAME,
	password = process.env.TMDB_PASSWORD,
	apiKey = process.env.TMDB_API_KEY
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

module.exports = { logInWithCredentials };
