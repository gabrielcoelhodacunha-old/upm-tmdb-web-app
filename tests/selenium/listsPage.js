const { until, By } = require('selenium-webdriver');
const {
	getPage,
	waitUntilLogOutIsComplete,
	getDriver,
	generateRandomString,
	acceptAlert,
} = require('../utils');
const { logInWithCredentials } = require('./logInPage');

const LISTS_CONTAINER_XPATH = "//div[@id='lists_container']";

function listsPage() {
	describe('User at lists page', () => {
		beforeEach(async () => {
			await getPage();
			await logInWithCredentials();
			await getDriver()
				.wait(until.elementLocated(By.xpath("//button[text()='Lists']")))
				.click();
		});

		describe('can create a list', () => {
			it('with name and description', async () => {
				const name = generateRandomString();
				const description = generateRandomString();
				await createList(name, description);
				await waitUntilNewListAppears(name, description);
			});

			it('with only name', async () => {
				const name = generateRandomString();
				await createList(name);
				await waitUntilNewListAppears(name);
			});
		});

		describe("can't create a list", () => {
			it('without a name', async () => {
				await createList('');
				await acceptAlert();
			});

			it('with same name as other list', async () => {
				const name = generateRandomString();
				await createList(name);
				await waitUntilNewListAppears(name);
				await createList(name);
				await acceptAlert();
			});
		});

		afterEach(async () => {
			await waitUntilDeletedAllLists();
			await waitUntilLogOutIsComplete();
		});
	});
}

async function createList(name, description = '') {
	const nameInput = await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//label[text()='Name']/input`)
		)
	);
	const descriptionTextArea = await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//label[text()='Description']/textarea`)
		)
	);
	await getDriver().executeScript(
		`
		arguments[0].value='${name}'
		arguments[1].value='${description}'
		`,
		nameInput,
		descriptionTextArea
	);
	await getDriver()
		.wait(
			until.elementLocated(
				By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Create List']`)
			)
		)
		.click();
}

async function waitUntilNewListAppears(name, description = null) {
	await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//p[text()='${name}']`)
		)
	);
	if (description) {
		await getDriver().wait(
			until.elementLocated(
				By.xpath(`${LISTS_CONTAINER_XPATH}//p[text()='${description}']`)
			)
		);
	}
}

async function waitUntilDeletedAllLists() {
	const deleteButtons = await getDriver().findElements(
		By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Delete list']`)
	);
	deleteButtons.forEach(async (button) => await button.click());
	while (
		(await getDriver().findElements(
			By.xpath(`${LISTS_CONTAINER_XPATH}/table`)
		)) > 0
	);
}

module.exports = { listsPage, createList, waitUntilDeletedAllLists };
