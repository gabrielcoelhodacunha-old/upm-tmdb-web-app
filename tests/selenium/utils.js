const { Builder, By, until } = require('selenium-webdriver');

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

async function waitUntilLogOutScriptEnds(driver) {
	await driver.wait(until.elementLocated(By.id('logOut'))).click();
	let localStorageLength;
	do {
		localStorageLength = await driver.executeScript(() => localStorage.length);
	} while (localStorageLength > 0);
}

module.exports = { configureChromeWebDriver, waitUntilLogOutScriptEnds };
