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
	let input = await driver.wait(until.elementLocated(By.id('username')));
	await driver.executeScript(`arguments[0].value='${username}'`, input);

	input = await driver.wait(until.elementLocated(By.id('password')));
	await driver.executeScript(`arguments[0].value='${password}'`, input);

	input = await driver.wait(until.elementLocated(By.id('apiKey')));
	await driver.executeScript(`arguments[0].value='${apiKey}'`, input);

	await driver.wait(until.elementLocated(By.id('logIn'))).click();
}

async function waitUntilLogOutIsComplete() {
	await driver.wait(until.elementLocated(By.id('logOut'))).click();
	while ((await driver.executeScript(() => localStorage.length)) > 0);
}

async function searchMovie(movie) {
	const input = await driver.wait(
		until.elementLocated(By.id('movie-to-search'))
	);
	await driver.executeScript(`arguments[0].value='${movie}'`, input);

	await driver
		.wait(
			until.elementLocated(
				By.xpath("//*[@id='search_container']/*/button[text()='Search']")
			)
		)
		.click();
}

module.exports = {
	getDriver,
	configureSeleniumSetupAndTeardown,
	getPage,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
	searchMovie,
};
