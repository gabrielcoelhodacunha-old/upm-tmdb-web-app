const { Builder, By, until } = require('selenium-webdriver');

const PAGES = {
	LOGIN: 'Login',
	SEARCH: 'Search',
	LISTS: 'Lists',
};
const SCREEN = {
	WIDTH: 1024,
	HEIGHT: 768,
};

let driver;
const getDriver = () => driver;

function configureSeleniumSetupAndTeardown() {
	beforeEach(async () => {
		driver = await configureChromeWebDriver();
		await getPage();
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
	await driver.manage().setTimeouts({ implicit: 1000 });
	await driver
		.manage()
		.window()
		.setRect({ x: 0, y: 0, width: SCREEN.WIDTH, height: SCREEN.HEIGHT });
	return driver;
}

async function getPage(page = '') {
	await getDriver().get(`http://localhost:3000/${page}`);
}

async function goToPageByClickingButton(buttonText) {
	await getDriver()
		.wait(until.elementLocated(By.xpath(`//button[text()='${buttonText}']`)))
		.click();
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

module.exports = {
	PAGES,
	SCREEN,
	getDriver,
	configureSeleniumSetupAndTeardown,
	goToPageByClickingButton,
	waitUntilLogOutIsComplete,
	acceptAlert,
};
