const { until, By } = require('selenium-webdriver');
const { getDriver, getPage, waitUntilLogOutIsComplete } = require('../utils');
const { logInWithCredentials } = require('./01-logInPage');

function searchPage() {
	describe('User at search page', () => {
		beforeEach(async () => {
			await getPage();
			await logInWithCredentials();
		});

		it('searchs a movie in the database', async () => {
			const MOVIE_TO_SEARCH = 'Interstellar';
			await searchMovie(MOVIE_TO_SEARCH);
			await getDriver().wait(
				until.elementLocated(By.xpath(`//p[text()='${MOVIE_TO_SEARCH}']`))
			);
		});

		it('searchs a movie not in the database', async () => {
			const MOVIE_TO_SEARCH = '55c3a0bbxxxxxxxx 2023-05-01 14:47:29';
			await searchMovie(MOVIE_TO_SEARCH);
			const tableElements = await getDriver().findElements(
				By.xpath("//div[@id='search_container']/table")
			);
			expect(tableElements.length).toBe(0);
		});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

async function searchMovie(movie) {
	const input = await getDriver().wait(
		until.elementLocated(By.id('movie-to-search'))
	);
	await getDriver().executeScript(`arguments[0].value='${movie}'`, input);

	await getDriver()
		.wait(
			until.elementLocated(
				By.xpath("//div[@id='search_container']//button[text()='Search']")
			)
		)
		.click();
}

module.exports = { searchPage, searchMovie };
