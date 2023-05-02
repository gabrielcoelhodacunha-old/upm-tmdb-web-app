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
	await driver.manage().setTimeouts({ implicit: 5000 });
	await driver.manage().window().maximize();
	return driver;
}

async function getPage(page = '') {
	await getDriver().get(`http://localhost:3000/${page}`);
}

async function waitUntilLogOutIsComplete() {
	await getDriver()
		.wait(until.elementLocated(By.id('logOut')))
		.click();
	while ((await getDriver().executeScript(() => localStorage.length)) > 0);
}

async function acceptAlert() {
	await getDriver().wait(until.alertIsPresent());
	await getDriver().switchTo().alert().accept();
}

const generateRandomString = (length = 20) =>
	Array.from(Array(length), () =>
		Math.floor(Math.random() * 36).toString(36)
	).join('');

module.exports = {
	getDriver,
	configureSeleniumSetupAndTeardown,
	getPage,
	waitUntilLogOutIsComplete,
	acceptAlert,
	generateRandomString,
};
