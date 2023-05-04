const { By } = require('selenium-webdriver');
const {
	getDriver,
	waitUntilLogOutIsComplete,
	goToPageByClickingButton,
	generateRandomString,
} = require('../utils');
const {
	SEARCH_CONTAINER_XPATH,
	searchMovie,
	waitUntilMovieAppears,
	addMovieToList,
	removeMovieFromList,
} = require('./searchPageUtils');
const { logInWithCredentials } = require('./loginPageUtils');
const {
	waitUntilDeletedAllLists,
	createList,
	waitUntilNewListAppears,
} = require('./listsPageUtils');

function searchPage() {
	describe('User at search page', () => {
		beforeEach(async () => {
			await logInWithCredentials();
		});

		describe('searchs a movie', () => {
			it('in the database', async () => {
				const movie = 'Interstellar';
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
			});

			it('not in the database', async () => {
				const movie = '55c3a0bbxxxxxxxx 2023-05-01 14:47:29';
				await searchMovie(movie);
				const tableElements = await getDriver().findElements(
					By.xpath(`${SEARCH_CONTAINER_XPATH}/table`)
				);
				expect(tableElements.length).toBe(0);
			});
		});

		describe('completes action', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				const list = generateRandomString();
				await goToPageByClickingButton('Lists');
				await createList(list);
				await waitUntilNewListAppears(list);
				await goToPageByClickingButton('Search');
			});

			describe('add movie to list', () => {
				it('with sucess', async () => {
					await addMovieToList(movie);
				});
			});

			describe('remove movie from list', () => {
				beforeEach(async () => {
					await addMovieToList(movie);
				});

				it('with sucess', async () => {
					await removeMovieFromList(movie);
				});
			});

			afterEach(async () => {
				await goToPageByClickingButton('Lists');
				await waitUntilDeletedAllLists();
			});
		});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = searchPage;
