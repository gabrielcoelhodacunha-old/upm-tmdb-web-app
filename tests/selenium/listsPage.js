const {
	waitUntilLogOutIsComplete,
	generateRandomString,
	acceptAlert,
	goToPageByClickingButton,
} = require('../utils');
const {
	createList,
	waitUntilNewListAppears,
	removeMovieFromList,
	waitUntilDeletedAllLists,
} = require('./listsPageUtils');
const { logInWithCredentials } = require('./loginPageUtils');
const { addMovieToList } = require('./searchPageUtils');

function listsPage() {
	describe('User at lists page', () => {
		let listName;

		beforeEach(async () => {
			await logInWithCredentials();
			await goToPageByClickingButton('Lists');
			listName = generateRandomString();
		});

		describe('can create a list', () => {
			it('with name and description', async () => {
				const listDescription = generateRandomString();
				await createList(listName, listDescription);
				await waitUntilNewListAppears(listName, listDescription);
			});

			it('with only name', async () => {
				await createList(listName);
				await waitUntilNewListAppears(listName);
			});
		});

		describe("can't create a list", () => {
			it('without a name', async () => {
				await createList('');
				await acceptAlert();
			});

			it('with same name as other list', async () => {
				await createList(listName);
				await waitUntilNewListAppears(listName);
				await createList(listName);
				await acceptAlert();
			});
		});

		describe('removes movie from list', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				await createList(listName);
				await waitUntilNewListAppears(listName);
				await goToPageByClickingButton('Search');
				await addMovieToList(movie);
				await goToPageByClickingButton('Lists');
			});

			it('with sucess', async () => {
				await removeMovieFromList(listName);
			});
		});

		afterEach(async () => {
			await waitUntilDeletedAllLists();
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = listsPage;
