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

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = searchMovies;
