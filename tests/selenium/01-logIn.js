const { By, until } = require('selenium-webdriver');
const { getDriver, waitUntilLogOutIsComplete } = require('../selenium-utils');

function logIn() {
	describe('User at login page', () => {
		let driver;

		beforeEach(async () => {
			driver = getDriver();
			await driver.get('http://localhost:3000');
		});

		describe('with valid credentials', () => {
			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});

			it('can log in', async () => {
				await driver
					.wait(until.elementLocated(By.id('username')))
					.sendKeys(process.env.TMDB_USERNAME);

				await driver
					.wait(until.elementLocated(By.id('password')))
					.sendKeys(process.env.TMDB_PASSWORD);

				await driver
					.wait(until.elementLocated(By.id('apiKey')))
					.sendKeys(process.env.TMDB_API_KEY);

				await driver.wait(until.elementLocated(By.id('logIn'))).click();
			});
		});

		describe('with invalid credentials', () => {
			it("can't log in", async () => {
				await driver
					.wait(until.elementLocated(By.id('username')))
					.sendKeys('username');

				await driver
					.wait(until.elementLocated(By.id('password')))
					.sendKeys('password');

				await driver
					.wait(until.elementLocated(By.id('apiKey')))
					.sendKeys('apiKey');

				await driver.wait(until.elementLocated(By.id('logIn'))).click();

				await driver.wait(until.alertIsPresent());
				await driver.switchTo().alert().accept();
			});
		});
	});
}

module.exports = logIn;
