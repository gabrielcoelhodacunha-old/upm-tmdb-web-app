const { until, By } = require('selenium-webdriver');
const {
	getDriver,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
	getPage,
} = require('../utils');

function listsPage() {
	describe('User at lists page', () => {
		let driver;

		beforeEach(async () => {
			driver = getDriver();
			await getPage();
			await logInWithCredentials();
			await driver
				.wait(until.elementLocated(By.xpath("//button[text()='Lists']")))
				.click();
		});

		it('can create a list', async () => {});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = listsPage;
