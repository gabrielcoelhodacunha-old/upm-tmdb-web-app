const { By, until } = require('selenium-webdriver');
const { getDriver } = require('./configureSetupAndTearDown');

function logIn() {
	describe('User at login page', () => {
		describe('with valid credentials', () => {
			it('can log in', async () => {
				// Load the login page.
				const driver = getDriver();

				await driver.get('http://localhost:3000');

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
	});
}

module.exports = logIn;
