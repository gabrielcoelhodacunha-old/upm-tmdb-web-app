const { generateRandomString } = require('../utils');
const {
	waitUntilLogOutIsComplete,
	// acceptAlert,
	goToPageByClickingButton,
} = require('./utils');
const {
	createList,
	waitUntilNewListAppears,
	removeMovieFromList,
	waitUntilDeletedAllLists,
} = require('./listsPageUtils');
const { logInWithCredentials } = require('./loginPageUtils');
const {
	searchMovie,
	waitUntilMovieAppears,
	addMovieToList,
} = require('./searchPageUtils');

function listsPage() {
	describe('Uuário na página Lists', () => {
		let listName;

		beforeEach(async () => {
			await logInWithCredentials();
			await goToPageByClickingButton('Lists');
			listName = generateRandomString();
		});

		describe('consegue criar uma lista', () => {
			it('com nome e descrição', async () => {
				const listDescription = generateRandomString();
				await createList(listName, listDescription);
				await waitUntilNewListAppears(listName, listDescription);
			});

			// it('somente com nome', async () => {
			// 	await createList(listName);
			// 	await waitUntilNewListAppears(listName);
			// });
		});

		// describe('não consegue criar uma lista', () => {
		// 	it('sem nome', async () => {
		// 		await createList('');
		// 		await acceptAlert();
		// 	});

		// 	it('com mesmo nome de lista existente', async () => {
		// 		await createList(listName);
		// 		await waitUntilNewListAppears(listName);
		// 		await createList(listName);
		// 		await acceptAlert();
		// 	});
		// });

		describe('remove um filme de uma lista', () => {
			const movie = 'Interstellar';

			beforeEach(async () => {
				await createList(listName);
				await waitUntilNewListAppears(listName);
				await goToPageByClickingButton('Search');
				await searchMovie(movie);
				await waitUntilMovieAppears(movie);
				await addMovieToList(movie);
				await goToPageByClickingButton('Lists');
			});

			it('com sucesso', async () => {
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
