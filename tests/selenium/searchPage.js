// const { By } = require('selenium-webdriver');
const { generateRandomString } = require('../utils');
const {
	// getDriver,
	waitUntilLogOutIsComplete,
	goToPageByClickingButton,
} = require('./utils');
const {
	// SEARCH_CONTAINER_XPATH,
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
	describe('Usuário na página Search', () => {
		beforeEach(async () => {
			await logInWithCredentials();
		});

		describe('busca por um filme', () => {
			it('presente na base de dados', async () => {
				const movie = 'Interstellar';
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
			});

			// it('não existente na base de dados', async () => {
			// 	const movie = '55c3a0bbxxxxxxxx 2023-05-01 14:47:29';
			// 	await searchMovie(movie);
			// 	const tableElements = await getDriver().findElements(
			// 		By.xpath(`${SEARCH_CONTAINER_XPATH}/table`)
			// 	);
			// 	expect(tableElements.length).toBe(0);
			// });
		});

		describe('completa a ação', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				const list = generateRandomString();
				await goToPageByClickingButton('Lists');
				await createList(list);
				await waitUntilNewListAppears(list);
				await goToPageByClickingButton('Search');
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
			});

			describe('adicionar filme numa lista', () => {
				it('com sucesso', async () => {
					await addMovieToList(movie);
				});
			});

			describe('remover filme de uma lista', () => {
				beforeEach(async () => {
					await addMovieToList(movie);
				});

				it('com sucesso', async () => {
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
