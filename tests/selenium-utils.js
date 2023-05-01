const { Builder, By, until } = require('selenium-webdriver');

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

async function waitUntilLogOutIsComplete() {
	await driver.wait(until.elementLocated(By.id('logOut'))).click();
	while ((await driver.executeScript(() => localStorage.length)) > 0);
}

module.exports = {
	getDriver,
	configureSeleniumSetupAndTeardown,
	waitUntilLogOutIsComplete,
};
