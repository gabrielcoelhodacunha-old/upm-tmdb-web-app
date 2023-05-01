const {
	configureChromeWebDriver,
	waitUntilLogOutScriptEnds,
} = require('./utils');

let driver;

function configureSetupAndTeardown() {
	beforeAll(async () => {});

	beforeEach(async () => {
		driver = await configureChromeWebDriver();
	});

	afterEach(async () => {
		await waitUntilLogOutScriptEnds(driver);
		await driver.quit();
	});

	afterAll(async () => {});
}

const getDriver = () => driver;

module.exports = { configureSetupAndTeardown, getDriver };
