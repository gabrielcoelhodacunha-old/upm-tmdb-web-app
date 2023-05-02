const { until, By } = require('selenium-webdriver');
const {
	getDriver,
	logInWithCredentials,
	waitUntilLogOutIsComplete,
	getPage,
	searchMovie,
} = require('../utils');

function searchPage() {
	describe('User at search page', () => {
		let driver;

		beforeEach(async () => {
			driver = getDriver();
			await getPage();
			await logInWithCredentials();
		});

		it('searchs a movie in the database', async () => {
			const MOVIE_TO_SEARCH = 'Interstellar';
			await searchMovie(MOVIE_TO_SEARCH);
			await driver.wait(
				until.elementLocated(By.xpath(`//p[text()='${MOVIE_TO_SEARCH}']`))
			);
		});

		it('searchs a movie not in the database', async () => {
			const MOVIE_TO_SEARCH = '55c3a0bbxxxxxxxx 2023-05-01 14:47:29';
			await searchMovie(MOVIE_TO_SEARCH);
			const tableElements = await driver.findElements(
				By.xpath("//*[@id='search_container']/table")
			);
			expect(tableElements.length).toBe(0);
		});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = searchPage;
