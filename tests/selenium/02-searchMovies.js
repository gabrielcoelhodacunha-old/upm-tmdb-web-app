const { until, By } = require('selenium-webdriver');
const {
	getDriver,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
	getPage,
} = require('../utils');

function searchMovies() {
	describe('User at search page', () => {
		let driver;

		beforeEach(async () => {
			driver = getDriver();
			await getPage();
			await logInWithCredentials();
		});

		it('can search a movie', async () => {
			await driver
				.wait(until.elementLocated(By.id('movie-to-search')))
				.sendKeys('Interstellar');

			await driver
				.wait(
					until.elementLocated(
						By.xpath("//*[@id='search_container']/*/button[text()='Search']")
					)
				)
				.click();

			await driver.wait(
				until.elementLocated(By.xpath("//p[text()='Interstellar']"))
			);
		});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = searchMovies;
