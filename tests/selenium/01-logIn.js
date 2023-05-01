const { until } = require('selenium-webdriver');
const {
	getDriver,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
	getPage,
} = require('../utils');

function logIn() {
	describe('User at login page', () => {
		let driver;

		beforeEach(async () => {
			driver = getDriver();
			await getPage();
		});

		describe('with valid credentials', () => {
			it('can log in', async () => {
				await logInWithCredentials();
			});

			afterEach(async () => {
				await waitUntilLogOutIsComplete();
			});
		});

		describe('without valid credentials', () => {
			it("can't log in", async () => {
				await logInWithCredentials('username', 'password', 'apiKey');
				await driver.wait(until.alertIsPresent());
				await driver.switchTo().alert().accept();
			});
		});
	});
}

module.exports = logIn;
