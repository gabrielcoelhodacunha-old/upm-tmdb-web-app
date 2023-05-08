const { generateRandomString } = require('../utils');
const {
	PAGES,
	waitUntilLogOutIsComplete,
	goToPageByClickingButton,
} = require('../selenium/utils');
const { setBatchInfoForPage, checkPage } = require('./utils');
const {
	createList,
	waitUntilNewListAppears,
	removeMovieFromList,
	waitUntilDeletedAllLists,
} = require('../selenium/listsPageUtils');
const { logInWithCredentials } = require('../selenium/loginPageUtils');
const {
	searchMovie,
	waitUntilMovieAppears,
	addMovieToList,
} = require('../selenium/searchPageUtils');
const { checkListsPageWithList } = require('./listsPageUtils');

function listsPage() {
	describe(`Usuário na página ${PAGES.LISTS}`, () => {
		let listName;

		beforeAll(async () => {
			await setBatchInfoForPage(PAGES.LISTS);
		});

		beforeEach(async () => {
			await logInWithCredentials();
			await goToPageByClickingButton(PAGES.LISTS);
			listName = generateRandomString();
		});

		describe('consegue criar uma lista', () => {
			it('com nome e descrição', async () => {
				await checkPage(PAGES.LISTS);
				const listDescription = generateRandomString();
				await createList(listName, listDescription);
				await waitUntilNewListAppears(listName, listDescription);
				await checkListsPageWithList('lista criada', listName, listDescription);
			});
		});

		describe('remove um filme de uma lista', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				await createList(listName);
				await waitUntilNewListAppears(listName);
				await goToPageByClickingButton(PAGES.SEARCH);
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
				await addMovieToList(movie);
				await goToPageByClickingButton(PAGES.LISTS);
			});

			it('com sucesso', async () => {
				await checkListsPageWithList('lista com filme', listName);
				await removeMovieFromList(listName);
				await checkListsPageWithList('filme removido da lista', listName);
			});
		});

		afterEach(async () => {
			await waitUntilDeletedAllLists();
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = listsPage;
