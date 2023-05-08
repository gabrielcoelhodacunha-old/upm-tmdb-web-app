const { generateRandomString } = require('../utils');
const {
	PAGES,
	waitUntilLogOutIsComplete,
	goToPageByClickingButton,
} = require('../selenium/utils');
const { setBatchInfoForPage, checkPage } = require('./utils');
const {
	searchMovie,
	waitUntilMovieAppears,
	addMovieToList,
	removeMovieFromList,
} = require('../selenium/searchPageUtils');
const { logInWithCredentials } = require('../selenium/loginPageUtils');
const {
	waitUntilDeletedAllLists,
	createList,
	waitUntilNewListAppears,
} = require('../selenium/listsPageUtils');
const { checkSearchPageResultsWithList } = require('./searchPageUtils');

function searchPage() {
	describe(`Usuário na página ${PAGES.SEARCH}`, () => {
		beforeAll(async () => {
			await setBatchInfoForPage(PAGES.SEARCH);
		});

		beforeEach(async () => {
			await logInWithCredentials();
		});

		describe('busca por um filme', () => {
			it('presente na base de dados', async () => {
				await checkPage(PAGES.SEARCH);
				const movie = 'Interstellar';
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
				await checkPage(PAGES.SEARCH, 'resultados da pesquisa');
			});
		});

		describe('completa a ação', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				const list = generateRandomString();
				await goToPageByClickingButton(PAGES.LISTS);
				await createList(list);
				await waitUntilNewListAppears(list);
				await goToPageByClickingButton(PAGES.SEARCH);
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
			});

			describe('adicionar filme numa lista', () => {
				it('com sucesso', async () => {
					await checkSearchPageResultsWithList(movie, 'resultados da pesquisa');
					await addMovieToList(movie);
					await checkSearchPageResultsWithList(
						movie,
						'filme adicionado na lista'
					);
				});
			});

			describe('remover filme de uma lista', () => {
				beforeEach(async () => {
					await addMovieToList(movie);
				});

				it('com sucesso', async () => {
					await checkSearchPageResultsWithList(movie, 'lista com filme');
					await removeMovieFromList(movie);
					await checkSearchPageResultsWithList(
						movie,
						'filme removido da lista'
					);
				});
			});

			afterEach(async () => {
				await goToPageByClickingButton(PAGES.LISTS);
				await waitUntilDeletedAllLists();
			});
		});

		afterEach(async () => {
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = searchPage;
