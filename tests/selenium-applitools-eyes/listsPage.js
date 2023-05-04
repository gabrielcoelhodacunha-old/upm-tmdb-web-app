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
				// eyes
				const listDescription = generateRandomString();
				await createList(listName, listDescription);
				await waitUntilNewListAppears(listName, listDescription);
				// eyes
			});

			it('with only name', async () => {
				// eyes
				await createList(listName);
				await waitUntilNewListAppears(listName);
				// eyes
			});
		});

		describe("can't create a list", () => {
			it('without a name', async () => {
				// eyes
				await createList('');
				await acceptAlert();
				// eyes
			});

			it('with same name as other list', async () => {
				// eyes
				await createList(listName);
				await waitUntilNewListAppears(listName);
				await createList(listName);
				await acceptAlert();
				// eyes
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
				// eyes
				await removeMovieFromList(listName);
				// eyes
			});
		});

		afterEach(async () => {
			await waitUntilDeletedAllLists();
			await waitUntilLogOutIsComplete();
		});
	});
}

module.exports = listsPage;
