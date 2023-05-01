const { Builder, By, until } = require('selenium-webdriver');

const TMDB_USERNAME = process.env.TMDB_USERNAME;
const TMDB_PASSWORD = process.env.TMDB_PASSWORD;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

let driver;
const getDriver = () => driver;

function configureSeleniumSetupAndTeardown() {
	beforeEach(async () => {
		driver = await configureChromeWebDriver();
	});

	afterEach(async () => {
		await driver.quit();
	});
}

async function configureChromeWebDriver() {
	const driver = new Builder()
		.withCapabilities({
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: [],
			},
		})
		.build();

	await driver.manage().window().maximize();

	return driver;
}

async function getPage(page = '') {
	await driver.get(`http://localhost:3000/${page}`);
}

async function logInWithCredentials(
	username = TMDB_USERNAME,
	password = TMDB_PASSWORD,
	apiKey = TMDB_API_KEY
) {
	await driver.wait(until.elementLocated(By.id('username'))).sendKeys(username);

	await driver.wait(until.elementLocated(By.id('password'))).sendKeys(password);

	await driver.wait(until.elementLocated(By.id('apiKey'))).sendKeys(apiKey);

	await driver.wait(until.elementLocated(By.id('logIn'))).click();
}

async function waitUntilLogOutIsComplete() {
	await driver.wait(until.elementLocated(By.id('logOut'))).click();
	while ((await driver.executeScript(() => localStorage.length)) > 0);
}

module.exports = {
	getDriver,
	configureSeleniumSetupAndTeardown,
	getPage,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
};
