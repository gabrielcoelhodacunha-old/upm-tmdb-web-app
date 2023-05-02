const { until, By } = require('selenium-webdriver');
const { getDriver, getPage, waitUntilLogOutIsComplete } = require('../utils');
const { logInWithCredentials } = require('./logInPage');

const SEARCH_CONTAINER_XPATH = "//div[@id='search_container']";

function searchPage() {
	describe('User at search page', () => {
		beforeEach(async () => {
			await getPage();
			await logInWithCredentials();
		});

		it('searchs a movie in the database', async () => {
			const movie = 'Interstellar';
			await searchMovie(movie);
			await getDriver().wait(
				until.elementLocated(By.xpath(`//p[text()='${movie}']`))
			);
		});

		it('searchs a movie not in the database', async () => {
			const movie = '55c3a0bbxxxxxxxx 2023-05-01 14:47:29';
			await searchMovie(movie);
			const tableElements = await getDriver().findElements(
				By.xpath(`${SEARCH_CONTAINER_XPATH}/table`)
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
				By.xpath(`${SEARCH_CONTAINER_XPATH}//button[text()='Search']`)
			)
		)
		.click();
}

module.exports = { searchPage, searchMovie };
